import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron"
import { Note } from "../../types"

contextBridge.exposeInMainWorld('notes', {
    getAll: ()=> ipcRenderer.invoke('note:getAll'),
    add: (note: Note)=> ipcRenderer.invoke('note:add', note),
    update: (id: string, note: Note)=> ipcRenderer.invoke('note:update',id, note),
    delete: (id: string)=> ipcRenderer.invoke('note:delete',id),
})

contextBridge.exposeInMainWorld('updatedNotes', {
    onUpdateNotes: (callback: (notes: boolean)=>void) => ipcRenderer.on('update-notes', (_event: IpcRendererEvent, value: boolean) => callback(value))
})

contextBridge.exposeInMainWorld('toPdf', {
    exportNoteToPDF: (note:Note, imgPath: string, outputPath: string) => ipcRenderer.invoke('note-pdf', note, imgPath, outputPath)
})

contextBridge.exposeInMainWorld('screenshot', {
    captureScreenshot: () => ipcRenderer.send('capture-screenshot'),
    onScreenshotCaptured: (callback: (imagePath:string)=>void) => ipcRenderer.on('screenshot-captured', (_event: IpcRendererEvent, imagePath: string) => callback(imagePath)),
    getScreenshotBase64: async (imagePath:string) => {
        return await ipcRenderer.invoke('get-screenshot-base64', imagePath);
    }
})