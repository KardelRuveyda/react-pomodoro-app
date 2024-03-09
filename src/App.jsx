import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import './App.css'; // App.css dosyasını import ediyoruz

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0); // Örnek olarak 5 saniye
  const [isActive, setIsActive] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            setIsActive(false);
            playDefaultNotificationSound();
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(5); // Örnek olarak 5 saniye
  };

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

  const playDefaultNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Varsayılan ses çalınırken bir hata oluştu:', error);
    }
  };

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <h2>{`${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`}</h2>
      <button className="timer-button" onClick={startTimer}>
        Başlat
      </button>
      <button className="timer-button" onClick={resetTimer}>
        Sıfırla
      </button>

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
    </div>
  );
};

export default App;
