import { useEffect, useState } from 'react'
import { Note } from '../../types'
import NoteItem from './components/Note'
import NoteInput from './components/NoteInput'
import NoteContainer from './components/NotesContainer'
import './styles/App.css'

async function getNotes() {
  return window.notes.getAll()
}

function App() {
  const [notes, setNotes] = useState<Array<Note>>([])
  const [update, setUpdate] = useState<boolean>(false)

  window.updatedNotes.onUpdateNotes((value: boolean)=> {
    setUpdate(value)
  })

  useEffect(()=>{
    getNotes()
      .then(notes=> {
        setNotes(notes)
        setUpdate(false)
      })
      .catch(error => console.log(error))
  },[update])

  return (
    <>
      <h1 className='main-title'><u>Notes</u></h1>
      <NoteInput/>
      <NoteContainer>
        {
          notes.map(note => 
            <NoteItem key={note.id} id={note.id} title={note.title} body={note.body}/>
          )
        }
      </NoteContainer>
    </>
  )
}

export default App
