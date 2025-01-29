# Electron Notes (WIP)

A simple **note-taking** desktop application built with **Electron.js**, **React (Vite)**, and **TypeScript**, using JSON files for persistence.

📌 **Repository**: [GitHub - NahuelUliassiPirchio/electron-notes](https://github.com/NahuelUliassiPirchio/electron-notes)

---

## 🚀 Motivation
This project serves as a **practical demonstration** of my ability to integrate **Electron.js with TypeScript and React**, exploring **local persistence and inter-process communication (IPC)**.

---

## 🛠 Features
✔ **Create, edit, and delete notes**  
✔ **Persistent storage using JSON files**  
✔ **Electron + React (Vite) integration**  
✔ **Secure IPC communication via contextBridge**  

### 📌 Planned Features (Not Implemented Yet)
⏳ **Self-destructing notes** – Notes will automatically delete themselves after a set time.

---

## 📂 Project Structure

```
src/
├── main-process
│   ├── main.ts              # Electron main process
│   ├── notesController.ts   # Handles JSON-based note persistence
│   ├── preload.cts          # Secure IPC bridge between Electron and React
│   └── tsconfig.json
└── render
    ├── App.tsx              # Main React component
    ├── assets
    │   └── delete-icon.svg  # UI assets
    ├── components
    │   ├── Note.tsx         # Note component
    │   ├── NoteInput.tsx    # Input field for new notes
    │   └── NotesContainer.tsx  # Container for all notes
    ├── index.css
    ├── main.tsx             # React entry point
    ├── styles
    │   ├── App.css
    │   ├── NoteItem.css
    │   └── NotesContainer.css
    └── vite-env.d.ts
```

---

## 💻 Installation & Running the App (Development Mode)

### 1️⃣ Clone the repository
```sh
git clone https://github.com/NahuelUliassiPirchio/electron-notes.git
cd electron-notes
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Transpile Electron main process
```sh
npm run transpile:main
```

### 4️⃣ Run the app
```sh
npm run dev
```

---

## 🔗 Electron Preload (IPC Bridge Example)

This project exposes IPC handlers via **contextBridge** to securely communicate between the **renderer** (React) and the **main process** (Electron):

```typescript
import { Note } from "../../types"

const electron = require('electron')

electron.contextBridge.exposeInMainWorld('notes', {
    getAll: () => electron.ipcRenderer.invoke('note:getAll'),
    add: (note: Note) => electron.ipcRenderer.invoke('note:add', note),
    update: (id: string, note: Note) => electron.ipcRenderer.invoke('note:update', id, note),
    delete: (id: string) => electron.ipcRenderer.invoke('note:delete', id),
})
```

---

## 🛠 Technologies Used
- **Electron.js** – Desktop application framework  
- **React (Vite)** – UI framework with fast development environment  
- **TypeScript** – Statically typed JavaScript  
- **JSON File Storage** – Simple persistent storage solution 
- **uuid** – Simple unique ids generator 

---

## 📌 Status
🔨 **Work in Progress**: The app is functional for basic note-taking, but **self-destructing notes are not yet implemented**.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 📬 Contact
If you have any feedback or suggestions, feel free to reach out:  
📧 **[uliassipirchio@gmail.com](mailto:uliassipirchio@gmail.com)**
