import { Note } from "../../types"

const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('notes', {
    getAll: ()=> ipcRenderer.invoke('note:getAll'),
    add: (note: Note)=> ipcRenderer.invoke('note:add', note),
    update: (id: string, note: Note)=> ipcRenderer.invoke('note:update',id, note),
    delete: (id: string)=> ipcRenderer.invoke('note:delete',id),
})

contextBridge.exposeInMainWorld('updatedNotes', {
    onUpdateNotes: (callback: (notes: boolean)=>void) => ipcRenderer.on('update-notes', (_event, value: boolean) => callback(value))
})