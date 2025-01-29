export interface Note {
    id: string;
    title: string;
    body: string;
}

interface Window {
    notes: {
        getAll: ()=> Promise<Array<Note>>
        add: (note: Note) => Promise
        update: (id: string, note: Note) => Promise
        delete: (id: string) => Promise
    }
}