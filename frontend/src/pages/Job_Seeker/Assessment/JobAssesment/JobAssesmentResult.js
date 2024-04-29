/* eslint-disable react-hooks/exhaustive-deps */
import assessmentStyle from "../Assessment.module.css";
import { useSelector, useDispatch } from "react-redux";
import { handleAppliedJob, handleClearResult, handleRemoveSavedJob } from "../../../../Redux/ReduxSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
function JobAssesmentResult() {
  const { result, percentageResult } = useSelector((state) => state.Assessment);
  const { jobDetails} = useSelector((state) => state.Job);
  const email = localStorage.getItem("email");
  const navigateTO = useNavigate();
  const dispatchTO = useDispatch();

  const handleDoneButtonClick = (e,item) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/user/My-jobs/create/apply-job`, {
        ...item,
        email,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(`${response.data.msg}`);
          dispatchTO(handleAppliedJob(item._id));
          dispatchTO(handleRemoveSavedJob(item._id));
          navigateTO("/");
          dispatchTO(handleClearResult());
        } else {
          toast.error(`${response.data.msg}`);
          }
      })
      .catch((error) => {
        toast.error(`server failed! Try again ${error.message}`);
      });
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      // Optionally, you can display a message to the user
      toast.error('Try Again,Your application get failed');
      navigateTO('/')
    };
// Prevent back navigation
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

 
  return (
    <div className={assessmentStyle.SelfAssessmentPage__ResultContainer}>
      <div className={assessmentStyle.SelfAssessmentPage__resultBox}>
        <h1 className={assessmentStyle.ResultBox__title}>Job Exam Result</h1>

        <div className={assessmentStyle.ResultBox__SuccessPoster}>{percentageResult}</div>
        <p className={assessmentStyle.ResultBox_SccessText}>
          You have answered
          <span className={assessmentStyle.ResultBox_QuestionAnswered_text}>
            {result}/10
          </span>{" "}
          question correctly
        </p>

        <button
          className={assessmentStyle.ResultBox__doneBUtton}
          onClick={(e)=>handleDoneButtonClick(e,jobDetails.jobs)}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default JobAssesmentResult;
