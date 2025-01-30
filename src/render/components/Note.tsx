import { BaseSyntheticEvent, useState } from 'react';
import deleteIcon from '../assets/delete-icon.svg';
import '../styles/NoteItem.css';
import { Note } from '../../../types';

export default function NoteItem(noteContent: Note) {
    const [isEditingBody, setIsEditingBody] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(noteContent.title);
    const [body, setBody] = useState(noteContent.body);

    const handleTitleClick = () => {
        setIsEditingTitle(true);
    };

    const handleTitleChange = (e: BaseSyntheticEvent) => {
        setTitle(e.target.value);
    };

    const handleTitleSave = () => {
        setIsEditingTitle(false);
        window.notes.update(noteContent.id, { ...noteContent, title });
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTitleSave();
        }
    };

    const handleBodyClick = () => {
        setIsEditingBody(true);
    };

    const handleBodyChange = (e: BaseSyntheticEvent) => {
        setBody(e.target.value);
    };

    const handleBodySave = () => {
        setIsEditingBody(false);
        window.notes.update(noteContent.id, { ...noteContent, body });
    };

    const handleBodyKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleBodySave();
        }
    };

    const handleDelete = (_e: BaseSyntheticEvent) => {
        window.notes.delete(noteContent.id);
    };

    return (
        <li className='note-item-container'>
            {isEditingTitle ? (
                <input
                    type='text'
                    className='note-title-edit'
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={handleTitleSave}
                    onKeyDown={handleTitleKeyDown}
                    autoFocus
                />
            ) : (
                <h2 className='title' onClick={handleTitleClick}>
                    {title}
                </h2>
            )}

            {isEditingBody ? (
                <textarea
                    className='note-body-edit'
                    value={body}
                    onChange={handleBodyChange}
                    onBlur={handleBodySave}
                    onKeyDown={handleBodyKeyDown}
                    autoFocus
                />
            ) : (
                <p className='note-body' onClick={handleBodyClick}>
                    {body}
                </p>
            )}

            <button className='button delete-button' onClick={handleDelete} title='Delete note'>
                <img src={deleteIcon} alt="" />
            </button>
        </li>
    );
}
