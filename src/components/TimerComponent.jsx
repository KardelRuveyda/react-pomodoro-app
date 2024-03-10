import React, { useState, useEffect } from 'react';
import moment from 'moment';

const TimerComponent = () => {
  const [time, setTime] = useState(25 * 60); // Saniye cinsinden süre
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (time <= 0) {
          clearInterval(intervalId);
          setIsActive(false);
          // playDefaultNotificationSound(); 
        } else {
          setTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60); // Saniye cinsinden 25 dakika
  };

  const formattedTime = moment.utc(time * 1000).format('mm:ss');

  return (
    <div>
      <h2>{formattedTime}</h2>
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
