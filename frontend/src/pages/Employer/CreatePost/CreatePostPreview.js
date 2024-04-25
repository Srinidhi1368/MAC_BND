import React, { useState } from 'react'
import pages from "../Pages.module.css";
import { IoImageOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from "../../Common-Components/Loaders/Loader";
function CreatePostPreview() {
  const [loading, setLoading] = useState(false);
  const navigateTO = useNavigate();
  const { title } = useParams();
  const { state } = useLocation();

  console.log("PreviewState", {state});

  const handleCancleButtonClick = (e) => {
    e.preventDefault();
    navigateTO("/create_post", { state: { ...state } })
  }

  const handleCreatePost = (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.set("employeeEmail", localStorage.getItem("email"));
    formData.append("jobPoster", state.selectedImg);
    formData.append("jobTitle", state.jobTitle);
    formData.append("jobDescription", state.jobDescription);
    formData.append("employmentType", state.employmentType);
    formData.append("location", state.location);
    formData.append("salaryRange", state.salaryRange);
    formData.append("skilRequired", state.skilRequired);
    formData.append("jobExperience", state.jobExperience);
    formData.append("education", state.education);
    formData.append("responsibility", state.responsibility);
    formData.append("howToApply", state.howToApply);
    
    state.mcq.forEach((mcq, index) => {
      formData.append(`mcq[${index}][question]`, mcq.question);
      mcq.options.forEach((option, optionIndex) => {
        formData.append(`mcq[${index}][options][${optionIndex}]`, option);
      });
      formData.append(`mcq[${index}][correctAnswer]`, mcq.correctAnswer);
    });
    setLoading(true);
    axios.post("http://localhost:8080/api/jobs/create-job", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.data.success) {
          toast.success("Post created successfully");
          sessionStorage.clear()
          setLoading(false);
          navigateTO("/create_post")
          localStorage.removeItem("mcqs")
        } else {
          toast.error("Try again");
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`);
        setLoading(false)
      });
  };

  return (
    <div className={pages.__PostPreviewPage_Container}>
      {
        loading ? <Loader /> : <>

          <h1 className={pages.__PostPreviewPage_heading}>Create Post</h1>

          <div className={pages.__PostPreviewPage_PosterContainer}>
            <img src={state?.jobPoster} alt={title} className={pages.__PostPreviewPage_Poster} />
          </div>

          <div className={pages.__PostPreviewPage_PosterName_Box}>
            <span className={pages.__PostPreviewPage__imgUploaded}>
              <IoImageOutline className={pages.__PostPreviewPage__imgICON} />
              <span className={pages.__PostPreviewPage__imgUploadedText}>Image Uploaded</span>
            </span>
            <p className={pages.__PostPreviewPage_PosterName}>
              {state?.selectedImg?.name?.slice(0, 10)}
            </p>
          </div>

          <div className={pages.__PostPreviewPage_PostDescription_Box}>
            <p className={pages.__PostPreviewPage_Description}>
              {state?.jobDescription}
            </p>

            <p className={pages.__PostPreviewPage_Description}>
              <strong>Responsibility: </strong>  {state?.responsibility}
            </p>

            <p className={`${pages.__PostPreviewPage_Description}, ${pages.__PostPreviewPage_Skils}`}>
              <strong>Skils: </strong>  <span> {state?.skilRequired}</span>
            </p>

            <p className={`${pages.__PostPreviewPage_Description}, ${pages.__PostPreviewPage_Skils}`}>
              <strong>Qualifications: </strong>  <span> {state?.education}</span>
            </p>

            <p className={`${pages.__PostPreviewPage_Description}, ${pages.__PostPreviewPage_Skils}`}>
              <strong>Experience: </strong>  <span> {state?.jobExperience} Years</span>
            </p>

            <p className={`${pages.__PostPreviewPage_Description}, ${pages.__PostPreviewPage_Skils}`}>
              <strong>Salary: </strong>  <span> {state?.salaryRange} LPA</span>
            </p>

            <p className={`${pages.__PostPreviewPage_Description}, ${pages.__PostPreviewPage_Skils}`}>
              <strong>Location: </strong>  <span> {state?.location}</span>
            </p>

          </div>

          <div className={pages.__PostPreviewPage_ButtonContainer}>
            <button type="button" className={pages.__PostPreviewPage_Buttons} onClick={handleCancleButtonClick}>Cancel</button>
            <button type="button" className={pages.__PostPreviewPage_Buttons} onClick={handleCreatePost}>Post</button>
          </div>

        </>
      }
    </div>
  )
}

export default CreatePostPreview
