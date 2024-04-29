import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Timer({ minutes,type }) {
    const [seconds, setSeconds] = useState(Number(minutes) * 60);
    const navigateTo=useNavigate()

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(intervalId);
          if(type==="Job_Assesment"){
            navigateTo('/job-assesment-result')
          }
          else{
            navigateTo('/assessment-result')
          }

        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [seconds,navigateTo,type]);
  
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
