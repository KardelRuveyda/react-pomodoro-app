import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            setIsActive(false);
            // playDefaultNotificationSound(); // Bu fonksiyonu eklemeyi unutmayın
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
    setMinutes(25);
    setSeconds(0);
  };

  const playDefaultNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Varsayılan ses çalınırken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h2>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h2>
      <button className="timer-button" onClick={startTimer}>
        Başlat
      </button>
      <button className="timer-button" onClick={resetTimer}>
        Sıfırla
      </button>
    </div>
  );
};

export default TimerComponent;
