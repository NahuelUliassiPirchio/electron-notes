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

    ipcMain.handle('get-screenshot-base64', async (_event, imagePath) => {
        try {
            const imageBuffer = fs.readFileSync(imagePath);
            return `data:image/png;base64,${imageBuffer.toString('base64')}`;
        } catch (error) {
            console.error('Error loading screenshot:', error);
            return null;
        }
    });


    globalShortcut.register('CommandOrControl+Alt+S', async () => {
        await captureScreenshot();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
})

async function captureScreenshot() {
    const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: { width: 3840, height: 2160 }
    });

    const screen = sources[0];

    if (!screen) {
        console.error('No se pudo capturar la pantalla.');
        return;
    }

    const image = Buffer.from(screen.thumbnail.toPNG());
    const screenshotPath = path.join(NOTES_FOLDER, `screenshot-${Date.now()}.png`);
    fs.writeFileSync(screenshotPath, image);

    console.log(`Captura guardada en: ${screenshotPath}`);

    mainWindow.webContents.send('screenshot-captured', screenshotPath);
    mainWindow.focus()
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
