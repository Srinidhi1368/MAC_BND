import React, { useEffect, useState } from "react";
import Profile_style from "./Profile_style.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CancelPopup from "./CancelPopup/CancelPopup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleAppliedJob, handleRemoveSavedJob } from "../../../Redux/ReduxSlice";
import Loader from "../../Common-Components/Loaders/Loader";

const Profile_details = () => {
  const [start_popup, setstart_popup] = useState(false);
  const [cancelpopup, setcancelpopup] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const navigateTO =useNavigate()
const dispatch =useDispatch()
  const Job =useLocation().state

  const email = localStorage.getItem("email");
  // const username = localStorage.getItem("name");
  const [userData, setuserData] = useState([]);
  console.log(userData);
const[name,setname]=useState([])


  // const resumes=userData.resume[0].filename
  // console.log(resumes);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/user?email=${email}`
      );
      setuserData(response.data.userDetails);
      setname(response.data.userDetails.name.split(" "))
      

    };
    fetchData();
  }, [email]);


  const getFirstResumeFilename = () => {
    if (userData.resume && userData.resume.length > 0) {
      return userData.resume[0].filename;
    }
    return null; // Return null if no resume data is available
  };

  const firstResumeFilename = getFirstResumeFilename();
 
  const formatISODateForInput = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // Extract and format YYYY-MM-DD
  };
  
  const [PreAssesment] =useState(false) //if there will be any skill test questions for user then it will be true

  const handleApply = (e,item) => {
    e.preventDefault();
 if(PreAssesment){
  if(!cancelpopup&&!start_popup){
    setstart_popup(!start_popup);
   }
 }
 else{
  e.preventDefault();
   setIsLoading(true);
    axios
      .post(`http://localhost:8080/api/user/My-jobs/create/apply-job`, {
        ...item,
        email,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(`${response.data.msg}`);
          dispatch(handleAppliedJob(item._id));
          dispatch(handleRemoveSavedJob(item._id));
          setIsLoading(false);
          navigateTO(-1)
        } else {
          toast.error(`${response.data.msg}`);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(`server failed! Try again ${error.message}`);
        setIsLoading(false);
      });
 }
  };
 
  const handleCancel=()=>{
    // setstart_popup(!start_popup)
    setcancelpopup(!cancelpopup);

  }
  return (
<>
{IsLoading?<Loader/>:    <>
      {userData && (
        <>
          <div
            className={
              start_popup
                ? `${Profile_style.start_assesment_popup}`
                : `${Profile_style.start_assesment_popup_hide}`
            }
          >
                        <div className={Profile_style.fa_xmark_2} onClick={handleCancel}>
              <i className="fa-solid fa-xmark"></i>
            </div>

            <div className={Profile_style.start_quiz_des}>

              <div className={Profile_style.check_logo}><i className="fa-solid fa-check"></i></div>
              <h3>Success</h3>
              <p>
                Congratulations, you are one step closer to complete your
                application
              </p>
              <Link
                to={cancelpopup?"":"/assessment-Instructions"}
                  state={Job}
                  className={Profile_style.start_assesment_btn}
              >
                Start Assesment
              </Link>
            </div>
          </div>
          {cancelpopup && <CancelPopup/>}
          <div
            className={
              start_popup
                ? `${Profile_style.profile_blur_container}`
                : `${Profile_style.profile_main_container}`
            }
          >
            <form className={Profile_style.form_container}>
          <div className={Profile_style.fa_xmark}>
          <i className="fa-solid fa-xmark" onClick={()=>navigateTO(-1)}></i>
          </div>

              {/* <h2>Basic Details</h2> */}
              <div className={Profile_style.name_section}>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" id="firstname" value={name[0]||""} readOnly />
                </div>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" id="lastname" value={name[1]||""} readOnly />
                </div>
              </div>
              <div className={Profile_style.email_box}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={userData.email||""} readOnly />
                <div className={Profile_style.input_container}>
                    <label htmlFor="resume">Upload Resume *</label>
                    <input
                      type="text"
                      id="resume"
                      value={firstResumeFilename||""}
                      readOnly
                    />
                  </div>
                  <div className={Profile_style.input_container}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      value={userData.website||""}
                      readOnly
                    />
                  </div>
              </div>
              <div className={Profile_style.basic_details_box}>
                <div className={Profile_style.left_basic_details}>
                  <div className={Profile_style.input_container}>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input
                      type="number"
                      id="phonenumber"
                      value={userData.phone_number||""}
                      readOnly
                    />
                  </div>
          
                  <div className={Profile_style.input_container}>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" value={userData.country||""} readOnly />
                  </div>
                  <div className={Profile_style.input_container}>
                    <label htmlFor="gender">Gender</label>
                    <input type="text" id="gender" value={userData.gender||""} readOnly />
                  </div>
                </div>
                <div className={Profile_style.right_basic_details}>
                  <div className={Profile_style.input_container}>
                    <label htmlFor="DOB">Date of Birth</label>
                    <input
                      type="date"
                      id="DOB"
                      value={formatISODateForInput(userData.dob)||""}                      
                      readOnly
                    />
                  </div>
                  <div className={Profile_style.input_container}>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={userData.state||""} readOnly/>
                  </div>
                  <div className={Profile_style.input_container}>
                    <label htmlFor="marital">Marital Status</label>
                    <input type="text" id="marital" value={userData.marital_status||""} readOnly />
                  </div>
                
                </div>
              </div>
              <h2>Education Details</h2><br/>
              <div className={Profile_style.name_section}>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="course">Course</label>
                  <input type="text" id="course" value={userData.course||""} readOnly/>
                </div>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="specialization">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    value={userData.course||""}
                    readOnly
                  />
                </div>
              </div>
              <div className={Profile_style.name_section}>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="university">University</label>
                  <input type="text" id="university" value={userData.college||""} readOnly />
                </div>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="percentage">Percentage</label>
                  <input
                    type="text"
                    id="percentage"
                    value={`${userData.percentage}%`||""}
                    readOnly
                  />
                </div>
              </div>
              <h2>Work Experience (Optional)</h2><br/>
              {userData.experience==="Experience"?<div className={Profile_style.name_section}>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="company">Title</label>
                  <input type="text" id="company" value={userData.job_title||""} readOnly />
                  <label htmlFor="start">Start Date</label>
                  <input
                    type="date"
                    id="start"
                    value={formatISODateForInput(userData.company_start_date)}                      
                    readOnly
                  />
                </div>
                <div className={Profile_style.input_name_container}>
                  <label htmlFor="experience">Company Name</label>
                  <input
                    type="text"
                    id="experience"
                    value={userData.company||""}
                    readOnly
                  />
                  <label htmlFor="end">End Date</label>
                  <input
                    type="date"
                    id="end"
                    value={formatISODateForInput(userData.company_end_date)||""}                      
                    readOnly
                  />
                </div>
              </div>:
               <div className={Profile_style.input_name_container}>
               <label htmlFor="percentage">Experience</label>
               <input
                 type="text"
                 id="percentage"
                 value={userData.experience||""}
                 readOnly
               />
             </div>}
              <div className={Profile_style.biography_section}>
          <div className={Profile_style.input_biography_container}>
          <label htmlFor="biography">Biography</label>
                  <input
                    type="text"
                    id="biography"
                    value={userData.biography||""}
                    readOnly
                  />
          </div>

              </div>

              <button type="submit" className={Profile_style.save_apply_btn} onClick={(e)=>handleApply(e,Job)}>
                APPLY
              </button>
            </form>
          </div>
        </>
      )}
    </>
}
</>
  );
};

export default Profile_details;
