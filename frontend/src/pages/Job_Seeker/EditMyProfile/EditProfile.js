import React, { useEffect, useRef, useState } from 'react'
import Editprofile from './Editprofile.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import noImg from '../../../Assets/noImage.jpg';
import Loader from "../../Common-Components/Loaders/Loader";

function EditProfile() {
  const email = localStorage.getItem("email");
  const [Skils, setSkils] = useState("");
  const [SkilsTags, SetSkilsTags] = useState([]);
  const imgRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLoading, setLoading] = useState(false)
  const [userData, setuserData] = useState({
    profileImage: "",
    name: "",
    email: "",
    phone_number: "",
    dob: "",
    country: "",
    course: "",
    website: "",
    gender: "",
    marital_status: "",
    biography: "",
    experience: "",
    job_title: "",
    company: "",
    company_end_date: "",
    company_start_date: "",
  });

  const handleOnChange = (e) => {
    if (e.target.name === "profileImage") {
      if (e.target?.files[0]?.type.split("/")[0] === "image") {
        setuserData({
          ...userData,
          [e.target.name]: URL.createObjectURL(e.target.files[0]),
        });
        setSelectedImg(e.target.files[0]);
      } else {
        toast.error("Invalid image");
      }
    } else {
      setuserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const loadUserData = () => {
    setLoading(true)
    axios.get(
      `http://localhost:8080/api/user?email=${email}`
    ).then((response) => {
      let tempskilsArr = response.data.userDetails.skills.map((data) => data.name)
      setuserData(response.data.userDetails);
      SetSkilsTags(tempskilsArr)
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
      toast.error(`Server failed to load! Reload your page: ${err.msg}`);
    })
  }
  useEffect(loadUserData, [email]);

  const updateUserDetails = async (e, userDataToUpdate) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("profileImage", selectedImg);
    formData.append("phone_number", userDataToUpdate.phone_number);
    formData.append("dob", userDataToUpdate.dob);
    formData.append("country", userDataToUpdate.country);
    formData.append("course", userDataToUpdate.course);
    formData.append("website", userDataToUpdate.website);
    formData.append("gender", userDataToUpdate.gender);
    formData.append("marital_status", userDataToUpdate.marital_status);
    formData.append("biography", userDataToUpdate.biography);
    formData.append("experience", userDataToUpdate.experience);
    formData.append("skills", SkilsTags)
    try {
      const response = await axios.put(`http://localhost:8080/api/update-user/${email}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success(response.data.message);
      loadUserData() // Handle response from the server
    } catch (error) {
      toast.error("Try again");
      console.error('Error updating user:', error)
      loadUserData();
    }
  };

  const formatISODateForInput = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // Extract and format YYYY-MM-DD
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setuserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // SKils 
  const handleSkilsOnchange = (e) => {
    setSkils(e.target.value);
  };

  const handleSkilsKeyDown = (e) => {
    if (e.key === "Enter") {
      if (SkilsTags.every((data) => data.toUpperCase() !== Skils.toUpperCase())) {
        SkilsTags.push(Skils.toUpperCase())
        SetSkilsTags(SkilsTags);
      }
      setSkils("");
    } else if (e.key === 'Backspace' && e.target.value === '') {
      SetSkilsTags(SkilsTags.slice(0, -1));
    }
  }

  const handleRemoveSkils = (e, tagToRemove) => {
    SetSkilsTags(SkilsTags.filter(tag => tag !== tagToRemove));
  }


  return (
    <div className={Editprofile.Details_container}>
      <form>
        <div className={Editprofile.main_container}>
          {
            isLoading ? <Loader /> : <>
              <div className={Editprofile.cir_container}>
                <h4>Profile picture</h4>
                <div className={Editprofile.__imgContainer}>
                  <img className={Editprofile.__previewImg} src={userData.profileImage} alt="" onError={(e) => { e.target.src = `${noImg}`; e.onError = null }} onClick={(e) => imgRef.current.click()} />
                  <input type="file" accept='image/*' ref={imgRef} hidden name='profileImage' onChange={handleOnChange} />
                </div>
              </div>

              <div className={Editprofile.container1}>
                <div className={Editprofile.c1}>
                  <label htmlFor='name' >Full Name</label>
                  <input type='text' id='name' name='name' className={Editprofile.input} value={userData.name || ""} onChange={HandleChange} ></input>
                </div>
              </div>
              <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' placeholder='enter email' className={Editprofile.input_mail} onChange={HandleChange} value={userData.email || ""} ></input>
              </div>
              <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='number'>Phone Number (must have 10 digits*)</label>
                <input type='tel' id='number' pattern="[0-9]{10}" name='phone_number' placeholder='+91 | Phone Number' className={Editprofile.input} value={userData.phone_number || ""} onChange={HandleChange}></input>
              </div>

              {/* input tags box */}
              <div className={`${Editprofile.c1} ${Editprofile.cc} ${Editprofile.userSkils__container}`}>
                <label htmlFor='skils'>Skils</label>
                {
                  SkilsTags?.length > 0 && <ul className={Editprofile.userSkils__SkilsList}>
                    {
                      SkilsTags?.map((item, index) => {
                        return <li className={Editprofile.userSkils_item} key={index}> <span>{item}</span> <RxCross2 className={Editprofile.userSkils_item_DeleteButton} onClick={(e) => handleRemoveSkils(e, item)} /></li>
                      })
                    }
                  </ul>
                }
                <input type='text' id='skils' placeholder='Enter your skils' className={Editprofile.input_mail} onChange={handleSkilsOnchange} value={Skils} onKeyDown={handleSkilsKeyDown} ></input>
              </div>

              <div className={Editprofile.container1}>
                <div className={Editprofile.c1}>
                  <label htmlFor='experience' >Experience</label>
                  <select id='experience' name='experience' className={Editprofile.input} onChange={HandleChange}>
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
                <div className={Editprofile.c1}>
                  <label htmlFor='education' >Education</label>
                  <input type='text' id='education' name="course" className={Editprofile.input} placeholder='Education' value={userData.course} onChange={HandleChange}></input>
                </div>
              </div>
              {/* ------------------ */}


              <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='web'>Website</label>
                <input type="text" id="website" name='website' value={userData.website || ""} className={Editprofile.input_mail} onChange={HandleChange} />
              </div>
              <div className={Editprofile.container1}>
                <div className={Editprofile.c1}>
                  <label htmlFor='marital_status' >Marital Status</label>
                  <select id='marital_status' name='marital_status' className={Editprofile.input} onChange={HandleChange}>
                    <option defaultValue={userData.marital_status || ""} disabled >{userData.marital_status || ""}</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
                <div className={Editprofile.c1}>
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" id="dob" className={Editprofile.input} name="dob" value={formatISODateForInput(userData.dob) || ""} onChange={HandleChange} />
                </div>
              </div>
              <div className={Editprofile.container1}>
                <div className={Editprofile.c1}>
                  <label htmlFor='gender' >Gender</label>
                  <select id='gender' name='gender' className={Editprofile.input} onChange={HandleChange}>
                    <option defaultValue={userData.gender || ""} disabled >{userData.gender || ""}</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={Editprofile.c1}>
                  <label htmlFor='Nationality' >Nationality</label>
                  <select id='Nationality' className={Editprofile.input} name="country" onChange={HandleChange}>
                    <option defaultValue={userData.country || ""} disabled>{userData.country}</option>
                    <option value="Indian">Indian</option>
                    <option value="Non-indian">non-indian</option>

                  </select>
                </div>
              </div>

              <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='biography'>Biography</label>
                <textarea id='biography' name='biography' className={Editprofile.bio} placeholder='write down your biography here. Let recuiter know about you...' value={userData.biography || ""} onChange={HandleChange}></textarea>
              </div>


              <div className={Editprofile.container1}>
                <div className={Editprofile.c1}>
                  <label htmlFor='education' >University/College</label>
                  <input type='text' id='education' name="course" className={Editprofile.input} placeholder='Education' value={userData.college || ""} onChange={HandleChange} />
                  <label htmlFor="specialization">Specialization</label>
                  <input type="text" id="specialization" name='specialization' value={userData.course || ""} className={Editprofile.input} onChange={HandleChange} />
                </div>
                <div className={Editprofile.c1}>
                  <label htmlFor="course">Course</label>
                  <input type="text" id="course" name='course' className={Editprofile.input} value={userData.course || ""} onChange={HandleChange} />
                  <label htmlFor="percentage">Percentage</label>
                  <input
                    type="text"
                    id="percentage"
                    value={`${userData.percentage}%` || ""}
                    className={Editprofile.input}
                    onChange={HandleChange}
                  />
                </div>
              </div>
              <div className={Editprofile.container1}>
                {/* <h2>Work Experience</h2> */}
                <div className={Editprofile.c1}>
                  <label htmlFor='Nationality' >Experience</label>
                  <select id='Nationality' className={Editprofile.input} name="experience" onChange={HandleChange}>
                    <option defaultValue={userData.country || ""} disabled>{userData.experience}</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Experience">Experience</option>

                  </select>

                </div>
              </div>

              <div className={Editprofile.container1}>

                <div className={Editprofile.c1}>

                  <label htmlFor="company">Title</label>
                  <input type="text" id="company" value={userData.experience === "Experience" ? userData.job_title || "" : " "} className={Editprofile.input}
                    readOnly={userData.experience === "Fresher" ? true : false}
                    onChange={HandleChange}
                  />
                  <label htmlFor="start">Start Date</label>
                  <input
                    type="date"
                    id="start"
                    name='company_start_date'
                    value={userData.experience === "Experience" ? formatISODateForInput(userData.company_start_date) || "" : " "}
                    className={Editprofile.input}
                    onChange={HandleChange}
                    readOnly={userData.experience === "Fresher" ? true : false}
                  />
                </div>
                <div className={Editprofile.c1}>
                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" name='company'
                    value={userData.experience === "Experience" ? userData.company || "" : " "}
                    className={Editprofile.input} onChange={HandleChange} readOnly={userData.experience === "Fresher" ? true : false} />
                  <label htmlFor="end">End Date</label>
                  <input type="date" id="end" name='company_end_date'
                    value={userData.experience === "Experience" ? formatISODateForInput(userData.company_end_date) || "" : " "}
                    className={Editprofile.input} onChange={HandleChange} readOnly={userData.experience === "Fresher" ? true : false} />
                </div>
              </div>
              <button type='button' className={Editprofile.save_change} onClick={(e) => updateUserDetails(e, userData)}>Save Changes</button>
            </>
          }
        </div>
      </form>
    </div>
  )
}

export default EditProfile
