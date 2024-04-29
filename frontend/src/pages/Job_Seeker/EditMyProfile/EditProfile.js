import React, { useEffect, useState } from "react";
import styleSheet from "./Editprofile.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../Common-Components/Loaders/Loader";
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

function EditProfile() {
  const { email, name } = useSelector((state) => state.Assessment.currentUser);
  const [IsLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone_number: "",
    dob: "",
    country: "",
    state: "",
    college: "",
    course: "",
    course_start_date: "",
    course_end_date: "",
    percentage: "",
    job_title: "",
    company: "",
    company_start_date: "",
    company_end_date: "",
    profileImage: "",
    biography: "",
    skills: "",
    note: "",
    resume: "",
    userAppliedJob: "",
    userSavedJob: "",
    experience: "",
    website: "",
    gender: "",
    marital_status: "",
  });

  //! Load user data by using his email address
  const loadUserData = () => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/user?email=${email}`)
      .then((response) => {
        if (response.data.success) {
          setUserDetails(response.data.userDetails);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(`Something went wrong ${error.msg}`);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadUserData, [email]);

  console.log(userDetails);
  return (
    <main className={styleSheet.mainContainer}>
      {IsLoading ? (
        <Loader />
      ) : (
        <form className={styleSheet.editProfile__form}>

          <div className={styleSheet.Form__profileContainer}>
            <label htmlFor="profilePicture" className={styleSheet.form__userLabel}>Profile Picture</label>
            <div className={styleSheet.Form__profileBox}>
              <img src={userDetails?.profileImage} alt={`${name}-Profile`} className={styleSheet.Form__userProfile}/>
            </div>
          </div>

          <div className={`${styleSheet.Form__inputRows_Primary}`}>
            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="firstName" className={styleSheet.Form__inputBox_Label}> First Name</label>
              <input type="text" id="firstName" placeholder="Enter your first name" className={styleSheet.Form__input} />
            </div>

            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="lastName" className={styleSheet.Form__inputBox_Label}>Last Name</label>
              <input type="text" id="lastName" placeholder="Enter your last name" className={styleSheet.Form__input} />
            </div>
          </div>

          <div className={`${styleSheet.Form__inputRows_Secondry}`}>
            <label htmlFor="email" className={styleSheet.Form__inputBox_Label}> Email Address</label>
            <input type="email" name="email" id="email" placeholder="Enter your email address" className={styleSheet.Form__input} />
          </div>

          <div className={`${styleSheet.Form__inputRows_Secondry}`}>
            <label htmlFor="phone" className={styleSheet.Form__inputBox_Label}>Phone</label>
            <input type="phone" name="phone" id="phone" placeholder="Enter your phone number" className={styleSheet.Form__input} />
          </div>

          
          <div className={`${styleSheet.Form__inputRows_Secondry}`}>
            <label htmlFor="website" className={styleSheet.Form__inputBox_Label}>Website</label>
            <input type="text" name="website" id="website" placeholder="Enter your website link" className={styleSheet.Form__input} />
          </div>

          <div className={`${styleSheet.Form__inputRows_Primary}`}>

            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="maritalStatus" className={styleSheet.Form__inputBox_Label}> Marital Status</label>
              <select className={`${styleSheet.Form__input} ${styleSheet.Form__Select_input}`}>
                <option value="">Select your marital status</option>
                <option value="single" className={styleSheet.Form_SelectInput_options}>single</option>
                <option value="married" className={styleSheet.Form_SelectInput_options}>married</option>
                <option value="widowed" className={styleSheet.Form_SelectInput_options}>widowed</option>
                <option value="divorced" className={styleSheet.Form_SelectInput_options}>divorced</option>
                <option value="separated" className={styleSheet.Form_SelectInput_options}>separated</option>
              </select>
            </div>

            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="dob" className={styleSheet.Form__inputBox_Label}>Date of birth</label>
              <input type="date" name="dob" id="dob" className={styleSheet.Form__input} />
            </div>
          </div>

          <div className={`${styleSheet.Form__inputRows_Primary}`}>
            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="gender" className={styleSheet.Form__inputBox_Label}> Gender</label>
              <select className={`${styleSheet.Form__input} ${styleSheet.Form__Select_input}`}>
                <option value="">Select your gender</option>
                <option value="male" className={styleSheet.Form_SelectInput_options}>male</option>
                <option value="female" className={styleSheet.Form_SelectInput_options}>female</option>
                <option value="other" className={styleSheet.Form_SelectInput_options}>other</option>
              </select>
            </div>

            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="nationality" className={styleSheet.Form__inputBox_Label}> nationality</label>
              <select className={`${styleSheet.Form__input} ${styleSheet.Form__Select_input}`}>
                <option value="">Select your nationality</option>
                <option value="indian" className={styleSheet.Form_SelectInput_options}>indian</option>
                <option value="non-indian" className={styleSheet.Form_SelectInput_options}>non-indian</option>
              </select>
            </div>
          </div>
          
          <div className={`${styleSheet.Form__inputRows_Primary}`}>
            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="college" className={styleSheet.Form__inputBox_Label}> university/College</label>
              <input type="text" id="college" placeholder="Enter College or university name" className={styleSheet.Form__input} />
            </div>

            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="course" className={styleSheet.Form__inputBox_Label}>course</label>
              <input type="text" id="course" placeholder="Enter course name" className={styleSheet.Form__input} />
            </div>
          </div>

          <div className={`${styleSheet.Form__inputRows_Secondry}`}>
            <label htmlFor="percentage" className={styleSheet.Form__inputBox_Label}> percentage</label>
            <input type="number" inputmode="numeric" name="percentage" id="percentage" placeholder="Enter your percentage" className={styleSheet.Form__input} />
          </div>

          <div className={`${styleSheet.Form__inputRows_Secondry}`}>
            <label htmlFor="skills" className={styleSheet.Form__inputBox_Label}> Skills</label>
            <input type="text" name="skills" id="skills" placeholder="Enter your skils" className={styleSheet.Form__input} />
          </div>

          {/*Work Exp optional part  */}
          <h2 className={styleSheet.Form_WorkEXP_heading}>Work experience (Optional)</h2>

          <div className={`${styleSheet.Form__inputRows_Primary}`}>
            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="jobTitle" className={styleSheet.Form__inputBox_Label}> Job Title</label>
              <input type="text" id="jobTitle" placeholder="Enter job title" className={styleSheet.Form__input} />
            </div>

            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="companyName" className={styleSheet.Form__inputBox_Label}>Company Name</label>
              <input type="text" id="companyName" placeholder="Enter company name" className={styleSheet.Form__input} />
            </div>
          </div>

          <div className={`${styleSheet.Form__inputRows_Primary}`}>
            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="college" className={styleSheet.Form__inputBox_Label}> university/College</label>
              <input type="text" id="college" placeholder="Enter College or university name" className={styleSheet.Form__input} />
            </div>

            <div className={styleSheet.Form__inputBox}>
              <label htmlFor="course" className={styleSheet.Form__inputBox_Label}>course</label>
              <input type="text" id="course" placeholder="Enter course name" className={styleSheet.Form__input} />
            </div>
          </div>

          <div className={`${styleSheet.Form__inputRows_Secondry}`} style={{"width": "100%"}}>
            <label htmlFor="about" className={styleSheet.Form__inputBox_Label}> About</label>
            <textarea className={styleSheet.Form_About_textArea} placeholder="Write about yourself" id="about" ></textarea>
          </div>

          <div className={styleSheet.Form__buttonContainer}>
            <button type="button" className={styleSheet.Form__saveChangesButton}>Save Changes</button>
          </div>

        </form>
      )}
    </main>
  );
}

export default EditProfile;
