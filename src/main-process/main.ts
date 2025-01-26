import {app, BrowserWindow} from "electron"
import path from "path"

app.on("ready", ()=>{
    const mainWindow = new BrowserWindow()

    const mainWindowFilePath = path.join(app.getAppPath(), "/dist-render/index.html")
    mainWindow.loadFile(mainWindowFilePath)
})

