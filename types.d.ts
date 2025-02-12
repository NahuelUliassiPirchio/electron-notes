export interface Note {
    id: string;
    title: string;
    body: string;
    imagePath?: string;
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
            onUpdateNotes: (callback: (notes: boolean)=>void) => void
        },
        toPdf:{
            exportNoteToPDF: (note:Note, imgPath: string, outputPath: string) => void
        },
        screenshot: {
            captureScreenshot: () => void,
            onScreenshotCaptured:(callback) => void,
            saveAnnotation: (data) => void,
            getScreenshotBase64: (imagePath:string) => Promise
        }
    }
}