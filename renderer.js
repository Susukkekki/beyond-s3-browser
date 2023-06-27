// require('bootstrap')

// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
    const buckets = await window.minioClient.listBuckets()
    console.log(buckets)
}

func()

