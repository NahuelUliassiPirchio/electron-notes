import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import { getNotes, addNote, deleteNote, updateNote } from "./notesController.js"


app.on("ready", ()=>{
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(), './dist-main/preload.cjs') // if production ../
        }
    })

    // dev mode
    const mainWindowPath = 'http://localhost:5173/'
    mainWindow.loadURL(mainWindowPath)

    // production mode
    // const mainWindowFilePath = path.join(app.getAppPath(), "/dist-render/index.html")
    // mainWindow.loadFile(mainWindowFilePath)
    
    ipcMain.handle('note:getAll', getNotes)
    ipcMain.handle('note:add', (_, note) => {
        return addNote(note);
    });
    ipcMain.handle('note:update', (_, id, note) => {
        return updateNote(id, note);
    });
    ipcMain.handle('note:delete', (_, id) => {
        return deleteNote(id);
    });
})


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
