import { useEffect, useState } from 'react'
import { Note } from '../../types'
import NoteItem from './components/NoteItem'
import NoteInput from './components/NoteInput'
import NoteContainer from './components/NotesContainer'
import './styles/App.css'
import ScreenshotAnnotator from './components/ScreenshotAnnotator'

async function getNotes() {
  return window.notes.getAll()
}

function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
      window.screenshot.onScreenshotCaptured((imagePath: string) => {
          setScreenshot(imagePath);
      });
  }, []);


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
      {
        screenshot? 
        <ScreenshotAnnotator screenshot={screenshot} onClose={() => setScreenshot(null)}/>:
        <NoteContainer>
          {
            notes.map(note => 
              <NoteItem key={note.id} id={note.id} title={note.title} body={note.body} imagePath={note.imagePath}/>
            )
          }
        </NoteContainer>
      }
    </>
  )
}

export default App
