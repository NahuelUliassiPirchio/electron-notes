import {BaseSyntheticEvent, useState} from 'react'

export default function NoteInput(){
    const [noteText, setNoteText] = useState<string>('')

    const handleSubmit = (e: BaseSyntheticEvent) =>{
        e.preventDefault()
        if(noteText.length == 0) return
        // save text
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