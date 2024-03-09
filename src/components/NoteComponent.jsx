import React, { useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';

const NoteComponent = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const addNote = () => {
    if (note.trim() !== '') {
      setNotes([...notes, { content: note, completed: false }]);
      setNote('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addNote();
    }
  };

  const toggleNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="note-section">
      <h3>Notlar</h3>
      <input
        className="note-input"
        type="text"
        value={note}
        onChange={handleNoteChange}
        onKeyDown={handleKeyDown}
      />
      <button className="note-button" onClick={addNote}>
        Ekle
      </button>
      <ul className="note-list">
        {notes.map((note, index) => (
          <li key={index} className={note.completed ? 'completed' : ''}>
            {note.content}
            <button className="note-toggle" onClick={() => toggleNote(index)}>
              {note.completed ? (
                <FaCheck />
              ) : (
                <FaCheck style={{ color: 'green' }} />
              )}
            </button>
            <button className="note-delete" onClick={() => deleteNote(index)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteComponent;
