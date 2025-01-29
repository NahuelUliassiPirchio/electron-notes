import { Note } from "../../types"

const electron = require('electron')

electron.contextBridge.exposeInMainWorld('notes', {
    getAll: ()=> electron.ipcRenderer.invoke('note:getAll'),
    add: (note: Note)=> electron.ipcRenderer.invoke('note:add', note),
    update: (id: string, note: Note)=> electron.ipcRenderer.invoke('note:update',id, note),
    delete: (id: string)=> electron.ipcRenderer.invoke('note:delete',id),
})