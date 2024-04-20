import React, { useRef, useState } from "react";
import pages from "../Pages.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import noImg from "../../../Assets/noImage.jpg";
import Loader from "../../Common-Components/Loaders/Loader";
 
export default function CreatePost() {
  const imgRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(false);
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
  });
 
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
 
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (post.jobPoster === "") {
      toast((t) => (
        <span>
          Select an <b>image</b> for post
        </span>
      ));
    } else if (
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
    } else {
      const formData = new FormData();
      formData.set("employeeEmail", localStorage.getItem("email"));
      formData.append("jobPoster", selectedImg);
      formData.append("jobTitle", post.jobTitle);
      formData.append("jobDescription", post.jobDescription);
      formData.append("employmentType", post.employmentType);
      formData.append("location", post.location);
      formData.append("salaryRange", post.salaryRange);
      formData.append("skilRequired", post.skilRequired);
      formData.append("jobExperience", post.jobExperience);
      formData.append("education", post.education);
      formData.append("responsibility", post.responsibility);
      formData.append("howToApply", post.howToApply);
      setLoading(true);
      axios.post("http://localhost:8080/api/jobs/create-job", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.success) {
            toast.success("Post created successfully");
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
            });
            setSelectedImg("");
          } else {
            toast.error("Try again");
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
            });
            setSelectedImg(null);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(`${err.message}`);
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
          });
          setSelectedImg(null);
        });
      // console.log(formData);
    }
  };
 
  return (
    <div className={pages.__create_Post_Page}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <header className={pages.__create_Post_Header}>
            <h1 style={{ fontSize: "30px" }}>Create Post</h1>
          </header>
 
          <div className={pages.__postDetails}>
            <div className={pages.__imgContainer}>
              <img
                className={pages.__previewImg}
                src={post.jobPoster}
                alt="preview img"
                onError={(e) => {
                  e.target.src = `${noImg}`;
                  e.onError = null;
                }}
              />
              <label htmlFor="">
                drop your image here or{" "}
                <span
                  style={{
                    color: "blue",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                  onClick={(e) => imgRef.current.click()}
                >
                  browse
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                ref={imgRef}
                hidden
                name="jobPoster"
                onChange={handleOnChange}
              />
            </div>
            <form
              className={pages.__createPost_Form}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={pages.__input_Grps}>
                <label htmlFor="">Job Title</label> <br />
                <input
                  type="text"
                  name="jobTitle"
                  value={post.jobTitle}
                  className={pages.__inputs}
                  onChange={handleOnChange}
                />
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Job Description</label> <br />
                <input
                  type="text"
                  name="jobDescription"
                  value={post.jobDescription}
                  className={pages.__inputs}
                  onChange={handleOnChange}
                />
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Employment Type</label> <br />
                <select
                  className={pages.__createPost_Select}
                  name="employmentType"
                  id="employmentType"
                  onChange={handleOnChange}
                >
                  <option value="">Select your Empoyment Type</option>
                  <option value="part time">Part Time</option>
                  <option value="full time">Full Time</option>
                  <option value="contractual">Contractual</option>
                </select>
                {/* <input type="text" name='employmentType' value={post.employmentType} className={pages.__inputs} onChange={handleOnChange} /> */}
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Location</label> <br />
                <input
                  type="text"
                  name="location"
                  value={post.location}
                  className={pages.__inputs}
                  onChange={handleOnChange}
                />
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Salary Range (INR)</label> <br />
                <select
                  className={pages.__createPost_Select}
                  name="salaryRange"
                  id="salaryRange"
                  onChange={handleOnChange}
                >
                  <option value="">Select your job experience</option>
                  <option value="2-3">2 - 3 LPA</option>
                  <option value="3-5">3 - 5 LPA</option>
                  <option value="5-7">5 - 7 LPA</option>
                  <option value="7-9">7 - 9 LPA</option>
                  <option value="10-12">10 - 12 LPA</option>
                  <option value="15+">15+ LPA</option>
                </select>
                {/* <input type="text" name='salaryRange' value={post.salaryRange} className={pages.__inputs} onChange={handleOnChange} /> */}
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Skill Required</label> <br />
                <input
                  type="text"
                  name="skilRequired"
                  value={post.skilRequired}
                  className={pages.__inputs}
                  onChange={handleOnChange}
                />
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Job Experince</label> <br />
                <select
                  className={pages.__createPost_Select}
                  name="jobExperience"
                  id="jobExperience"
                  onChange={handleOnChange}
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
                {/* <input type="text" name='jobExperience' value={post.jobExperience} className={pages.__inputs} onChange={handleOnChange} /> */}
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Education</label> <br />
                <input
                  type="text"
                  name="education"
                  value={post.education}
                  className={pages.__inputs}
                  onChange={handleOnChange}
                />
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">Responsibility</label> <br />
                <input
                  type="text"
                  name="responsibility"
                  value={post.responsibility}
                  className={pages.__inputs}
                  onChange={handleOnChange}
                />
              </div>
              <div className={pages.__input_Grps}>
                <label htmlFor="">How to Apply</label> <br />
                <input
                  type="text"
                  name="howToApply"
                  value={post.howToApply}
                  className={pages.__inputs}
                  onChange={handleOnChange}
                />
              </div>
            </form>
          </div>
          <div className={pages.__buttons}>
            <button className={pages.__btn_Cancel}>Cancel</button>
            <button className={pages.__btn_Save} onClick={handleCreatePost}>
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
}