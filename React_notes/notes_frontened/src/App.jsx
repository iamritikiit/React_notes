import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash'; // Import lodash
import { NavbarLeft, NavbarRight } from "./components/Navbar";
import './App.css';
import { RightLayout } from "./components/Layout";
import { nanoid } from 'nanoid';

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
    const [notes, setNotes] = useState([{ id: nanoid(21), name: 'note1', content: '' }]);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [isWriting, setIsWriting] = useState(true);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setNotes(response.data);
                    if (response.data.length > 0) {
                        setSelectedNoteId(response.data[0].id);
                    } else {
                        addNewNote();
                    }
                } else {
                    console.error('API response is not an array');
                }
            })
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    const selectedNote = notes.find(note => note.id === selectedNoteId);

    const debouncedUpdateNote = useCallback(_.debounce((noteId, updatedNote) => {
        axios.put(`${API_URL}${noteId}/`, updatedNote)
            .then(() => {
                // console.log('Note updated successfully');
            })
            .catch(error => console.error('Error updating note:', error));
    }, 300), []);

    const handleContentChange = (e) => {
        if (!selectedNote) {
            console.error('Selected note is not found');
            return;
        }

        const updatedNote = { ...selectedNote, content: e.target.value };

        const firstLine = e.target.value.split('\n')[0];
        const firstWord = firstLine.trim().split(' ')[0];
        const updatedName = firstWord || `Note ${notes.length + 1}`;
        const updatedNoteWithNewName = { ...updatedNote, name: updatedName };

        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNoteWithNewName : note));

        debouncedUpdateNote(updatedNote.id, updatedNoteWithNewName);
    };

    const addNewNote = () => {
        const newNote = { id: nanoid(21), name: `Note ${notes.length + 1}`, content: '' };
        axios.post(API_URL, newNote)
            .then(response => {
                if (response.data) {
                    setNotes(prevNotes => [response.data, ...prevNotes]);
                    setSelectedNoteId(response.data.id);
                    setIsWriting(true);
                }
            })
            .catch(error => console.error('Error adding note:', error));
    };

    const deleteNote = (noteId) => {
        axios.delete(`${API_URL}${noteId}/`)
            .then(() => {
                const remainingNotes = notes.filter(note => note.id !== noteId);
    
                if (remainingNotes.length > 0) {
                    setNotes(remainingNotes);
                    setSelectedNoteId(remainingNotes[0].id); 
                } else {
                    setNotes([]);
                    setSelectedNoteId(null);
                    addNewNote();
                }
            })
            .catch(error => console.error('Error deleting note:', error));
    };
    
    
    const selectNote = (note) => {
        setSelectedNoteId(note.id);
        setIsWriting(true);
    };

    const applyFormatting = (format) => {
        const textarea = document.querySelector('textarea');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        let formattedText;
    
        switch (format) {
            case 'bold':
                formattedText = `${text.substring(0, start)}<b>${text.substring(start, end)}</b>${text.substring(end)}`;
                break;
            case 'italic':
                formattedText = `${text.substring(0, start)}<i>${text.substring(start, end)}</i>${text.substring(end)}`;
                break;
            case 'highlight':
                formattedText = `${text.substring(0, start)}<mark>${text.substring(start, end)}</mark>${text.substring(end)}`;
                break;
            case 'link':
                const selectedText = text.substring(start, end);
                if (selectedText) {
                    const linkURL = prompt('Enter the URL for the link:');
                    if (linkURL) {
                        formattedText = `${text.substring(0, start)}<a href="${linkURL}">${selectedText}</a>${text.substring(end)}`;
                    } else {
                        formattedText = text;
                    }
                }
                break;
            case 'quote':
                const selectText = text.substring(start, end);
                formattedText = `${text.substring(0, start)}<blockquote>${selectText}</blockquote>${text.substring(end)}`;
                break;
            case 'bullet':
                formattedText = `${text.substring(0, start)}<li>${text.substring(start, end)}</li>${text.substring(end)}`;
                textarea.selectionStart = start + 4;
                textarea.selectionEnd = start + 4;
                break;
            case 'numbered':
                let count = 1;
                formattedText = text.replace(/<div class="numbered">(.*?)<\/div>/gs, (match, p1) => {
                    count++;
                    return `<div class="numbered">${count}. ${p1}</div>`;
                });
    
                if (start === end) {
                    formattedText = `${text.substring(0, start)}<div class="numbered">${count}. </div>${text.substring(end)}`;
                    textarea.selectionStart = start + `<div class="numbered">${count}. `.length;
                    textarea.selectionEnd = start + `<div class="numbered">${count}. `.length;
                }
    
                textarea.classList.add('textarea-numbered-style');
                break;
            default:
                return;
        }
    
        const updatedNote = { ...selectedNote, content: formattedText };
    
        // Immediate update for formatting changes
        setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
        axios.put(`${API_URL}${selectedNote.id}/`, updatedNote)
            .catch(error => console.error('Error updating note:', error));
    };
    

    return (
        <div className='main-body'>
            <div className='left-body'>
                <NavbarLeft notes={notes} addNewNote={addNewNote} selectNote={selectNote} deleteNote={deleteNote} />
            </div>
            <div className='right-body'>
                <NavbarRight setIsWriting={setIsWriting} applyFormatting={applyFormatting}/>
                <RightLayout handleContentChange={handleContentChange} noteContent={selectedNote?.content || ''} isWriting={isWriting} />
            </div>
        </div>
    );
}
