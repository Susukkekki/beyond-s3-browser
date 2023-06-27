const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('minioClient', {  
  listBuckets: () => ipcRenderer.invoke('minio:listBuckets')
})