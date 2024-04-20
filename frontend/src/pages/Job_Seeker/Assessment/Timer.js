import React, { useEffect, useState } from 'react'

function Timer({ minutes }) {
    const [seconds, setSeconds] = useState(Number(minutes) * 60);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [seconds]);
  
    const formattedTime = () => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
  
    return (
      <>
        {formattedTime()}
      </>
    );
}

export default Timer
