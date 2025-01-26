import {app, BrowserWindow} from "electron"
// import path from "path"

app.on("ready", ()=>{
    const mainWindow = new BrowserWindow()

    // dev mode
    const mainWindowPath = 'http://localhost:5173/'
    mainWindow.loadURL(mainWindowPath)

    // production mode
    // const mainWindowFilePath = path.join(app.getAppPath(), "/dist-render/index.html")
    // mainWindow.loadFile(mainWindowFilePath)
    
})

