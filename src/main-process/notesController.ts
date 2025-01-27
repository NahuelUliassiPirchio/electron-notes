import fs from 'fs/promises';
import {Note} from '../types.js' 

const filePath = './notes.json';

async function ensureFileExists(): Promise<void> {
    try {
        await fs.access(filePath);
    } catch (error: unknown) {
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

export async function getNotes(): Promise<Note[]> {
    await ensureFileExists();
    const notesData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(notesData) as Note[];
}
export async function addNote(newNote: Note): Promise<Note> {
    const notes = await getNotes();
    notes.push(newNote);
    await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
    return newNote;
}

export async function updateNote(id: string, updatedData: Partial<Note>): Promise<Note> {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    throw new Error(`Note with id ${id} not found`);
  }

  notes[noteIndex] = { ...notes[noteIndex], ...updatedData };
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
  return notes[noteIndex];
}

export async function deleteNote(id: string): Promise<{ success: boolean }> {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  if (filteredNotes.length === notes.length) {
    throw new Error(`Note with id ${id} not found`);
  }

  await fs.writeFile(filePath, JSON.stringify(filteredNotes, null, 2));
  return { success: true };
}

(async () => {
    await ensureFileExists();
  
    // Add a new note
    await addNote({
      id: '2',
      title: 'Node.js',
      body: 'fs/promises permite manejar archivos asíncronamente',
    });
  
    // Get all notes
    console.log('All Notes:', await getNotes());
  
    // Update a note
    await updateNote('2', { body: 'Actualizamos el contenido de la nota' });
    console.log('Updated Note:', await getNotes());
  
    // Delete a note
    await deleteNote('1');
    console.log('Notes after deletion:', await getNotes());
  })();