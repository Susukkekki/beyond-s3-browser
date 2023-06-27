const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
var Minio = require('minio')
var MinioClient = null

async function listBuckets() {
    var _buckets = []
    await MinioClient.listBuckets(function (err, buckets) {
        if (err) return console.log(err)

        console.log('buckets :', buckets)
        _buckets = buckets
    })

    return _buckets
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // win.loadFile('index.html')
    win.loadFile('object_browser.html')
}

app.whenReady().then(() => {
    MinioClient = new Minio.Client({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
    });

    ipcMain.handle('minio:listBuckets', listBuckets)

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})