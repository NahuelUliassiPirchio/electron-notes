import {BaseSyntheticEvent, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

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
    }

    const handleWriteText = (e: BaseSyntheticEvent) =>{
        setNoteText(e.target.value)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Add a new note..."
                onChange={handleWriteText}
                />
            <input type="submit" value='Add'/>
        </form>
    )
}