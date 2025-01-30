import {BaseSyntheticEvent, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import '../styles/NoteInput.css'

export default function NoteInput(){
    const [noteText, setNoteText] = useState<string>('')

    const handleSubmit = (e: BaseSyntheticEvent) =>{
        e.preventDefault()
        if(noteText.length == 0) return
        window.notes.add({
            title: '',
            id: uuidv4(),
            body: noteText
        })
        setNoteText('') 
    }

    const handleWriteText = (e: BaseSyntheticEvent) =>{
        setNoteText(e.target.value)
    }

    return(
        <form className='note-input-container' onSubmit={handleSubmit}>
            <input
                className='note-input'
                type="text" 
                placeholder="Add a new note..."
                onChange={handleWriteText}
                value={noteText}
                />
            <input className='submit-button' type="submit" value='Add'/>
        </form>
    )
}