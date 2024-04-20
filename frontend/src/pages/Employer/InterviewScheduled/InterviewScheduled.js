import React, { useState } from "react";
import Interviews from "./Interviews";
import PreAssesment from "./PreAssesment";
import InterviewScheduledStyle from "./InterviewScheduled.module.css";

export default function InterviewScheduled() {
  const [showInterviews, setShowInterviews] = useState(true);

  return (
    <>
      <div className={InterviewScheduledStyle.toggle_btn_container}>
        <button
          onClick={() => setShowInterviews(true)}
          className={`${InterviewScheduledStyle.toggle_btn} ${
            showInterviews ? InterviewScheduledStyle.active : ""
          }`}
        >
          Pre-Assessment
        </button>
        <button
          onClick={() => setShowInterviews(false)}
          className={`${InterviewScheduledStyle.toggle_btn} ${
            !showInterviews ? InterviewScheduledStyle.active : ""
          }`}
        >
          Interviews
        </button>
      </div>
      {showInterviews ? <PreAssesment /> : <Interviews />}
    </>
  );
}
