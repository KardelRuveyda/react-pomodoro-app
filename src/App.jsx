import React from 'react';
import './App.css';
import TimerComponent from '../src/components/TimerComponent';
import NoteComponent from '../src/components/NoteComponent';

const App = () => {
  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <TimerComponent />
      <NoteComponent />
    </div>
  );
};

export default App;
