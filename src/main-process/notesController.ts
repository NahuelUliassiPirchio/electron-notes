import fs from 'fs/promises';
import { Note } from '../../types.js' 
import { BrowserWindow } from 'electron';

const filePath = './notes.json';

async function ensureFileExists(): Promise<void> {
    try {
        await fs.access(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
        const initialNotes: Note[] = [
            {
            id: '1',
            title: 'Electron js',
            body: 'contextIsolation sirve para separar procesos',
            },
        ];
        await fs.writeFile(filePath, JSON.stringify(initialNotes, null, 2));
        }
    }
}

export async function getNotes(mainWindow:BrowserWindow ,): Promise<Note[]> {
    await ensureFileExists();
    const notesData = await fs.readFile(filePath, 'utf8');
    mainWindow.webContents.send('update-notes',true)
    return JSON.parse(notesData) as Note[];
}
export async function addNote(mainWindow:BrowserWindow, newNote: Note): Promise<Note> {
    const notes = await getNotes(mainWindow);
    notes.push({
      ...newNote,
      title: 'Title'
    });
    await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
    mainWindow.webContents.send('update-notes',true)
    return newNote;
}

export async function updateNote(mainWindow:BrowserWindow ,id: string, updatedData: Partial<Note>): Promise<Note> {
  const notes = await getNotes(mainWindow);
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    throw new Error(`Note with id ${id} not found`);
  }

  notes[noteIndex] = { ...notes[noteIndex], ...updatedData };
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
  mainWindow.webContents.send('update-notes',true)
  return notes[noteIndex];
}

export async function deleteNote(mainWindow:BrowserWindow ,id: string): Promise<{ success: boolean }> {
  const notes = await getNotes(mainWindow);
  const filteredNotes = notes.filter((note) => note.id !== id);

  if (filteredNotes.length === notes.length) {
    throw new Error(`Note with id ${id} not found`);
  }

  await fs.writeFile(filePath, JSON.stringify(filteredNotes, null, 2));
  mainWindow.webContents.send('update-notes',true)
  return { success: true };
}
