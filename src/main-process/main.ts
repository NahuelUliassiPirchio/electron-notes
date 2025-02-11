import { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer } from "electron"
import fs from 'fs'
import path from "path"
import { getNotes, addNote, deleteNote, updateNote } from "./notesController.js"
import { exportNoteToPDF } from './pdfController.js'

let mainWindow: BrowserWindow;
const NOTES_FOLDER = path.join(app.getPath('documents'), 'ElectronNotes');

if (!fs.existsSync(NOTES_FOLDER)) {
    fs.mkdirSync(NOTES_FOLDER, { recursive: true });
}

app.on("ready", ()=>{
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(), './dist-main/preload.cjs'), // if production ../
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    // dev mode
    const mainWindowPath = 'http://localhost:5173/'
    mainWindow.loadURL(mainWindowPath)

    // production mode
    // const mainWindowFilePath = path.join(app.getAppPath(), "/dist-render/index.html")
    // mainWindow.loadFile(mainWindowFilePath)
    
    ipcMain.handle('note:getAll', () => getNotes(mainWindow))
    ipcMain.handle('note:add', (_, note) => {
        return addNote(mainWindow, note);
    });
    ipcMain.handle('note:update', (_, id, note) => {
        return updateNote(mainWindow, id, note);
    });
    ipcMain.handle('note:delete', (_, id) => {
        return deleteNote(mainWindow, id);
    });
    ipcMain.handle('note-pdf', (_, note, imgPath, outputPath) => {
        return exportNoteToPDF(note, imgPath, outputPath);
    });

    globalShortcut.register('CommandOrControl+Shift+S', async () => {
        await captureScreenshot();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
})

async function captureScreenshot() {
    console.log('hello')
}

ipcMain.on('save-annotation', (event, data) => {
    const annotationPath = path.join(NOTES_FOLDER, `Annotated-${Date.now()}.json`);
    fs.writeFileSync(annotationPath, JSON.stringify(data, null, 2));
    console.log(`Anotación guardada en: ${annotationPath}`);
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
