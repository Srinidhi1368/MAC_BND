import React, { useEffect, useRef, useState } from "react";
import pages from "../Pages.module.css";
import toast from "react-hot-toast";
import noImg from "../../../Assets/noImage.jpg";
import { useLocation, useNavigate } from "react-router-dom";


export default function CreatePost() {
  const imgRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigateTO = useNavigate();
  const { state } = useLocation();
  const [post, setPost] = useState({
    jobPoster: "",
    jobTitle: "",
    jobDescription: "",
    employmentType: "",
    location: "",
    salaryRange: "",
    skilRequired: "",
    jobExperience: "",
    education: "",
    responsibility: "",
    howToApply: "",
    employeeEmail: localStorage.getItem("email"),
    mcq:null
  });

  const location = useLocation();
  
  useEffect(() => { 
    console.log('State:', location.state);
  }, [location.state]);

  // console.log("createPost:",post);

  const handleOnChange = (e) => {
    if (e.target.name === "jobPoster") {
      if (e.target?.files[0]?.type.split("/")[0] === "image") {
        setPost({
          ...post,
          [e.target.name]: URL.createObjectURL(e.target.files[0]),
        });
        setSelectedImg(e.target.files[0]);
      } else {
        toast.error("Invalid image");
      }
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  const handleSavePreviewClick = (e) => {
    e.preventDefault();
    if (post.jobPoster === "") {
      toast((t) => (
        <span>
          Select an <b>image</b> for post
        </span>
      ));
    }
    else if (
      post.jobTitle === "" ||
      post.jobDescription === "" ||
      post.employmentType === "" ||
      post.location === "" ||
      post.salaryRange === "" ||
      post.skilRequired === "" ||
      post.jobExperience === "" ||
      post.education === "" ||
      post.responsibility === "" ||
      post.howToApply === ""
    ) {
      toast("All Fields Required !!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    else {
      navigateTO(`/create_post/${post.jobTitle}`, { state: { ...post, selectedImg } });
    }
  }

  const handleCancleClick = (e) => {
    e.preventDefault();
    setPost({
      jobPoster: "",
      jobTitle: "",
      jobDescription: "",
      employmentType: "",
      location: "",
      salaryRange: "",
      skilRequired: "",
      jobExperience: "",
      education: "",
      responsibility: "",
      howToApply: "",
      employeeEmail: localStorage.getItem("email"),
    })
    setSelectedImg(null)
  }

  const handleSetPreAssessmentButtonClick = (e) => {
    e.preventDefault();
    navigateTO(`/create_post/Set-Pre-Assessment`, { state: { ...post, selectedImg } });
  }

  useEffect(() => {
    if (state) {
      setPost({
        jobPoster: state?.jobPoster,
        jobTitle: state?.jobTitle,
        jobDescription: state?.jobDescription,
        employmentType: state?.employmentType,
        location: state?.location,
        salaryRange: state?.salaryRange,
        skilRequired: state?.skilRequired,
        jobExperience: state?.jobExperience,
        education: state?.education,
        responsibility: state?.responsibility,
        howToApply: state?.howToApply,
        employeeEmail: state?.employeeEmail,
        mcq:state?.mcq
      });
      setSelectedImg(state?.selectedImg)
    }
  }, [state]);

  return (
 <>
    <div className={pages.__create_Post_Page}>
      <header className={pages.__create_Post_Header}>
        <h1 style={{ fontSize: "30px" }}>Create Post</h1>
      </header>

      <div className={pages.__postDetails}>

        <div className={pages.__imgContainer}>
          <img className={pages.__previewImg} src={post.jobPoster} alt="preview img" onError={(e) => { e.target.src = `${noImg}`; e.onError = null; }} onClick={(e) => imgRef.current.click()} />
          {
            !post.jobPoster && <p className={pages.__previewImgText}>
              drop your image here or <span
                style={{ color: "blue", fontWeight: "700", cursor: "pointer", marginLeft: "5px" }} onClick={(e) => imgRef.current.click()}> browse </span>
            </p>
          }
          <input type="file" accept="image/*" ref={imgRef} hidden name="jobPoster" onChange={handleOnChange} />
        </div>

        <form
          className={pages.__createPost_Form}
          onSubmit={(e) => e.preventDefault()}
        >

          <div className={pages.__input_Grps}>
            <label htmlFor="jobTitle">Job Title</label> <br />
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={post.jobTitle}
              className={pages.__inputs}
              onChange={handleOnChange}
            />
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="jobDescription">Job Description</label> <br />
            <input
              type="text"
              name="jobDescription"
              id="jobDescription"
              value={post.jobDescription}
              className={pages.__inputs}
              onChange={handleOnChange}
            />
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="employmentType">Employment Type</label> <br />
            <select
              className={pages.__createPost_Select}
              name="employmentType"
              id="employmentType"
              onChange={handleOnChange}
              value={post.employmentType}
            >
              <option value="">Select your Empoyment Type</option>
              <option value="part time">Part Time</option>
              <option value="full time">Full Time</option>
              <option value="contractual">Contractual</option>
            </select>
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="location">Location</label> <br />
            <input
              type="text"
              name="location"
              id="location"
              value={post.location}
              className={pages.__inputs}
              onChange={handleOnChange}
            />
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="salaryRange">Salary Range (INR)</label> <br />
            <select
              className={pages.__createPost_Select}
              name="salaryRange"
              id="salaryRange"
              onChange={handleOnChange}
              value={post.salaryRange}
            >
              <option value="">Select your job experience</option>
              <option value="2-3">2 - 3 LPA</option>
              <option value="3-5">3 - 5 LPA</option>
              <option value="5-7">5 - 7 LPA</option>
              <option value="7-9">7 - 9 LPA</option>
              <option value="10-12">10 - 12 LPA</option>
              <option value="15+">15+ LPA</option>
            </select>
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="skilRequired">Skill Required</label> <br />
            <input
              type="text"
              name="skilRequired"
              id="skilRequired"
              value={post.skilRequired}
              className={pages.__inputs}
              onChange={handleOnChange}
            />
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="jobExperience">Job Experince</label> <br />
            <select
              className={pages.__createPost_Select}
              name="jobExperience"
              id="jobExperience"
              onChange={handleOnChange}
              value={post.jobExperience}
            >
              <option value="">Select your job experience</option>
              <option value="fresher">Fresher</option>
              <option value="0-6">0 - 6 months</option>
              <option value="1-2">1 - 2 years</option>
              <option value="2-3">2 - 3 years</option>
              <option value="3-4">3 - 4 years</option>
              <option value="4-5">4 - 5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="education">Education</label> <br />
            <input
              type="text"
              name="education"
              id="education"
              value={post.education}
              className={pages.__inputs}
              onChange={handleOnChange}
            />
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="responsibility">Responsibility</label> <br />
            <input
              type="text"
              name="responsibility"
              id="responsibility"
              value={post.responsibility}
              className={pages.__inputs}
              onChange={handleOnChange}
            />
          </div>

          <div className={pages.__input_Grps}>
            <label htmlFor="howToApply">How to Apply</label> <br />
            <input
              type="text"
              name="howToApply"
              id="howToApply"
              value={post.howToApply}
              className={pages.__inputs}
              onChange={handleOnChange}
            />
          </div>

          <div className={pages.preAssessment_buttonContainer}>
            <button type="button" className={pages.preAssessment_button} onClick={handleSetPreAssessmentButtonClick}>Set Pre-Assessment Questions</button>
          </div>

        </form>
      </div>

      <div className={pages.__buttons}>
        <button className={pages.__btn_Cancel} onClick={handleCancleClick}>Cancel</button>
        <button className={pages.__btn_Save} onClick={handleSavePreviewClick}>
          Save & Preview
        </button>
      </div>
    </div>

 </>
  );
}