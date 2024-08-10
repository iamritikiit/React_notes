import React from 'react';
import '../index.css';


export function NavbarLeft({ notes, addNewNote, selectNote, deleteNote }) {
    return (
        <div className='left-part'>
            <div className='header'>
                <h1>Notes</h1>
                <img src="/icons8-plus-50.png"
                     alt="Add icon"
                     onClick={addNewNote}
                /> 
            </div>
            <ul className='notes-list'>
                {notes.map(note => (
                    <li key={note.id} className='note-item' onClick={() => selectNote(note)}>
                        <span>{note.name}</span>
                        <img 
                            src="/icons8-delete.gif" 
                            alt="Delete icon" 
                            className="delete-icon"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the selectNote
                                deleteNote(note.id);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}


export function NavbarRight({setIsWriting, applyFormatting}) {
    return (
        <div className='right-part'>
            <div>
                <button onClick={() => setIsWriting(true)} className='btn'>Write</button>
                <button onClick={() => setIsWriting(false)} className='btn'>Preview</button>
                <button>
                    <img onClick={() => applyFormatting('highlight')} src='/icons8-h-24.png' alt="H icon"></img>
                </button>
                <button>
                    <img onClick={() => applyFormatting('bold')} src='/icons8-b-48.png' alt="B icon"></img>
                </button>
                <button>
                    <img onClick={() => applyFormatting('italic')} src='/icons8-italic-24.png' alt="Italic icon"></img>
                </button>
            </div>
            <div>
                <button>
                    <img onClick={() => applyFormatting('link')} src='/icons8-link-50.png' alt="Link icon"></img>
                </button>
                <button>
                    <img onClick={() => applyFormatting('quote')} src='/icons8-quotes-30.png' alt="Quotes icon"></img>
                </button>
                <button>
                    <img onClick={() => applyFormatting('bullet')} src='/icons8-list-48.png' alt="List icon"></img>
                </button>
                <button>
                    <img onClick={() => applyFormatting('numbered')} src='/icons8-numeric-50.png' alt="Numeric icon"></img>
                </button>
            </div>
        </div>
    );
}
