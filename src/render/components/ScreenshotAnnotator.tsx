import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../styles/ScreenshotAnnotator.css'

interface ScreenshotAnnotatorProps {
    screenshot: string;
    onClose: () => void;
}

function ScreenshotAnnotator({ screenshot, onClose }: ScreenshotAnnotatorProps) {
    const [imageData, setImageData] = useState('');
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        async function fetchImage() {
            try {
                const base64Image = await window.screenshot.getScreenshotBase64(screenshot);
                setImageData(base64Image);
            } catch (error) {
                console.error('Error loading screenshot:', error);
            }
        }
        fetchImage();
    }, [screenshot]);

    const handleSave = () => {
        if (!noteText.trim()) return;

        window.notes.add({
            title: 'Screenshot Note',
            id: uuidv4(),
            body: noteText,
            imagePath: screenshot
        });

        setNoteText('');
        onClose();
    };

    return (
        <div className='screenshot-annotator-container'>
            <h2>Annotate Screenshot</h2>
            {imageData ? (
                <>
                    <img className='screenshot-image' src={imageData} alt="Screenshot" />
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Write your note here..."
                    />
                    <br />
                    <button onClick={handleSave} disabled={!noteText.trim()}>Save Annotation</button>
                    <button className='on-close-button' onClick={onClose}>Close</button>
                </>
            ) : (
                <p>Loading screenshot...</p>
            )}
        </div>
    );
}

export default ScreenshotAnnotator;
