import { Note } from '../types'
import NoteItem from './components/Note'
import NoteInput from './components/NoteInput'
import NoteContainer from './components/NotesContainer'
import './styles/App.css'

const MOCKED_NOTES: Array<Note> = [{
  id: '1',
  title: 'Electron js',
  body: 'contextIsolation sirve para separar procesos'
}]

function App() {

  return (
    <>
      <h1><u>Notes</u></h1>
      <NoteInput/>
      <NoteContainer>
        {
          MOCKED_NOTES.map(note => 
            <NoteItem key={note.id} id={note.id} title={note.title} body={note.body}/>
          )
        }
      </NoteContainer>
    </>
  )
}

export default App
