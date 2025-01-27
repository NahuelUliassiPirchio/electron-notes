const electron = require('electron')

electron.contextBridge.exposeInMainWorld('notes', {
    suscribe: ()=> {console.log('hola')}
})