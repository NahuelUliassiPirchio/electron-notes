import { ReactNode } from "react"
import '../styles/NotesContainer.css'

interface NoteContainerProps {
    children: ReactNode
}

export default function NoteContainer({children}: NoteContainerProps){
    return (
    <ul className="note-container">
        {children}
    </ul>
    )
}