import { BaseSyntheticEvent, useState } from 'react';
import deleteIcon from '../assets/delete-icon.svg'
import '../styles/NoteItem.css';
import { Note } from '../../../types';

export default function NoteItem(noteContent: Note) {
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState(noteContent.body);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e: BaseSyntheticEvent) => {
        setBody(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
        window.notes.update(noteContent.id, { ...noteContent, body });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
    };

    const handleDelete = (_e: BaseSyntheticEvent) => {
        window.notes.delete(noteContent.id);
    };

    return (
        <li className='note-item-container'>
            <h2 className='title'>{noteContent.title}</h2>
            {isEditing ? (
                <textarea
                    className='note-body-edit'
                    value={body}
                    onChange={handleChange}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <p className='note-body' onClick={handleEdit}>
                    {body}
                </p>
            )}
            <button className='button delete-button' onClick={handleDelete} title='delete note'>
                <img src={deleteIcon} alt="" />
            </button>
        </li>
    );
}
