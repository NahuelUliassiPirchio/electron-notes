import { BaseSyntheticEvent } from 'react';
import '../styles/NoteItem.css'
import { Note } from '../../types';

export default function NoteItem(noteContent: Note){

    const handleEdit = (e: BaseSyntheticEvent ) => {
        console.log(noteContent.id, e)
    }

    const handleDelete = (e: BaseSyntheticEvent ) => {
        console.log(noteContent.id, e)
    }

    return (
        <li className='note-item-container'>
            <h2 className='title'>{noteContent.title}</h2>
            <p className='note-body' onClick={handleEdit}>{noteContent.body}</p>
            <button className='button delete-button' onClick={handleDelete}>🗑</button>
        </li>
    )
}