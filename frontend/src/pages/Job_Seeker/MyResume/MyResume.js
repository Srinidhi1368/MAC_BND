import React, { useState } from 'react';
import { GrNotes } from "react-icons/gr";
import ResumeCss from './MyResume.module.css';
import image from './img.png';

function MyResume() {
  const [showMyresume, setShowMyresume] = useState(true);
  const [showPreviousResume, setShowPreviousResume] = useState(false);

  return (
    <div>
      <div className={ResumeCss.upperSelection}>
        <p className={ResumeCss.button1} onClick={() => { setShowMyresume(true); setShowPreviousResume(false); }}>
          <GrNotes /> My Resume
        </p>
        <p className={ResumeCss.button1} onClick={() => { setShowMyresume(false); setShowPreviousResume(true); }}>
          <GrNotes /> Previous Resume
        </p>
      </div>

      <button className={ResumeCss.Update_resumeBtn}>Update Your Resume</button>

      <div className={ResumeCss.vertical_line}></div>
      <div className={ResumeCss.right_side_container}>Upload your resume ATS friendly</div>
      <img src={image} alt='#' className={ResumeCss.right_image}></img>
      <div className={ResumeCss.right_side_container2}>Check your resume score to gauge its effectiveness and suitability for potential job opportunities</div>

      <button className={ResumeCss.resume_btn}>Check your resume score</button>

      {showMyresume && <h1>My resume data</h1>}
      {showPreviousResume && <h1>Previous resume data</h1>}
    </div>
  );
}

export default MyResume;
