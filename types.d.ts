export interface Note {
    id: string;
    title: string;
    body: string;
}

declare global {
    interface Window {
        notes: {
            getAll: ()=> Promise<Array<Note>>
            add: (note: Note) => Promise
            update: (id: string, note: Note) => Promise
            delete: (id: string) => Promise
        },
        updatedNotes: {
            onUpdateNotes: (callback: (notes: boolean)=>void) => {}
        }   
    }
}