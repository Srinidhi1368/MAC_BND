import React, { useEffect, useState } from 'react'
import Editprofile from './Editprofile.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import Loader from "../../Common-Components/Loaders/Loader";

function EditProfile() {

    const email = localStorage.getItem("email");

    const [userData, setuserData] = useState({
       profileImage:{}, 
       name:"",
        email:" ",
        phone_number: " ",
        dob: "",
        country: " ",
        course: " ",
        website:" ",
        gender:" ",
        marital_status:" ",
        biography:" ",
        experience:" ",
        job_title:" ",
        company:" ",
        company_end_date:"",
        company_start_date:"",

    });
  

 useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(
            `http://localhost:8080/api/user?email=${email}`
          );
          setuserData(response.data.userDetails);

        };
        fetchData();
      }, [email]);

      
const updateUserDetails = async (e,userDataToUpdate) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8080/api/update-user?email=${email}`, userDataToUpdate);
      toast.success(response.data.message); // Handle response from the server
      localStorage.setItem('email',userData.email)
      localStorage.setItem('name',userData.name)
     


  // User Skils info 
  const [Skils, setSkils] = useState("");
  const [SkilsTags, SetSkilsTags] = useState([]);
  // User Skils info 

  const email = localStorage.getItem("email");
  const username = localStorage.getItem("name");
  const [firstname, lastname] = username.split(" ");
  const [isLoading, setLoading] = useState(false)
  const [userData, setuserData] = useState({
    profileImage: {},
    phone_number: " ",
    dob: "",
    country: " ",
    course: " ",
    website: " ",
    gender: " ",
    marital_status: " ",
    biography: " ",
    experience: " "
  });


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
    try {
      const response = await axios.put('http://localhost:8080/api/update-user', { ...userDataToUpdate, skills: SkilsTags });
      toast.success(response.data.message);
      loadUserData() // Handle response from the server

    } catch (error) {
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
    return (
        <div className={Editprofile.Details_container}>
          <form onSubmit={(e)=>updateUserDetails(e,userData)}>
                    <div className={Editprofile.main_container}>
            <div className={Editprofile.cir_container}>
                <p>Profile picture</p>
                <div className={Editprofile.Upload_btn}>
            <label htmlFor="profileImage" className={Editprofile.customFileInput}>
              {userData ? (
                <img src='https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png' alt='#' className={Editprofile.Clogo}></img>
            ) : (
                <div className={Editprofile.input_label}>
                  <div>
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  </div>
                  <p>Upload Profile</p>
                </div>
              )}
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={HandleChange}
              />
            </label>
          </div>
            </div>

            <div className={Editprofile.container1}>
                <div className={Editprofile.c1}>
                    <label htmlFor='name' >Full Name</label>
                    <input type='text' id='name' name='name' className={Editprofile.input} value={userData.name||""} onChange={HandleChange} ></input>
                </div>
                {/* <div className={Editprofile.c1}>
                    <label htmlFor='lastname' >Last Name</label>
                    <input type='text' id='lastname' name='lastname'  className={Editprofile.input} value={lastname||""} onChange={HandleChange} ></input>
                </div> */}

            </div>
            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' placeholder='enter email' className={Editprofile.input_mail} onChange={HandleChange}  value={userData.email||""} ></input>
            </div>

            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='number'>Phone</label>
                <input type='number' id='number' name='phone_number' placeholder='+91 | Phone Number' className={Editprofile.input} value={userData.phone_number||""} onChange={HandleChange}></input>
            </div>
            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='web'>Website</label>
                <input
                      type="text"
                      id="website"
                      name='website'
                      value={userData.website||""}
                      className={Editprofile.input_mail}
                      onChange={HandleChange}
                    />

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
    <form >
      <div className={Editprofile.main_container}>
        {
          isLoading ? <Loader /> : <>

            <div className={Editprofile.cir_container}>
              <p>Profile picture</p>
              <div className={Editprofile.Upload_btn}>
                <label htmlFor="profileImage" className={Editprofile.customFileInput}>
                  {userData ? (
                    <img src='https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png' alt='#' className={Editprofile.Clogo}></img>
                  ) : (
                    <div className={Editprofile.input_label}>
                      <div>
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                      </div>
                      <p>Upload Resume</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>

            <div className={Editprofile.container1}>
              <div className={Editprofile.c1}>
                <label htmlFor='name' >First Name</label>
                <input type='text' id='name' className={Editprofile.input} value={firstname}  ></input>
              </div>
              <div className={Editprofile.c1}>
                <label htmlFor='name' >Last Name</label>
                <input type='text' id='name' className={Editprofile.input} value={lastname}  ></input>
              </div>

            </div>
            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
              <label htmlFor='email'>Email</label>
              <input type='text' id='email' placeholder='enter email' className={Editprofile.input_mail} value={email} ></input>
            </div>

            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
              <label htmlFor='number'>Phone</label>
              <input type='number' id='number' name='phone_number' placeholder='+91 | Phone Number' className={Editprofile.input} value={userData.phone_number} onChange={HandleChange}></input>
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
                  <option defaultValue="" disabled >Select Experience</option>
                  <option value="Fresher" >Fresher</option>
                  <option value="Less than 6 month">Less than 6 Months</option>
                  <option value="6-12 months">6-12 Months</option>
                  <option value="greater than 1 year">Greater than 1 year</option>
                </select>

              </div>
              <div className={Editprofile.c1}>
                <label htmlFor='education' >Education</label>
                <input type='text' id='education' name="course" className={Editprofile.input} placeholder='Education' value={userData.course} onChange={HandleChange}></input>
              </div>

            </div>

            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
              <label htmlFor='web'>Website</label>
              <input
                type="text"
                id="website"
                name='website'
                value={userData.website}
                className={Editprofile.input_mail}
                onChange={HandleChange}
              />

            </div>

            <div className={Editprofile.container1}>

                <div className={Editprofile.c1}>
                    <label htmlFor='marital_status' >Marital Status</label>
                    <select id='marital_status' name='marital_status' className={Editprofile.input} onChange={HandleChange}>
                        <option defaultValue={userData.marital_status||""} disabled >{userData.marital_status||""}</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Married">Married</option>

                    </select>
                </div>

                <div className={Editprofile.c1}>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            className={Editprofile.input}
            name="dob"
            value={formatISODateForInput(userData.dob)||""}
            onChange={HandleChange}
          />
        </div>
            </div>

            <div className={Editprofile.container1}>
                <div className={Editprofile.c1}>
                    <label htmlFor='gender' >Gender</label>
                    <select id='gender' name='gender' className={Editprofile.input} onChange={HandleChange}>
                        <option defaultValue={userData.gender||""} disabled >{userData.gender||""}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={Editprofile.c1}>
                    <label htmlFor='Nationality' >Nationality</label>
                    <select id='Nationality' className={Editprofile.input} name="country"onChange={HandleChange}>
                        <option defaultValue={userData.country||""} disabled>{userData.country}</option>
                        <option value="Indian">Indian</option>
                        <option value="Non-indian">non-indian</option>

                    </select>
                </div>
            </div>

            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
                <label htmlFor='biography'>Biography</label>
                <textarea id='biography'name='biography' className={Editprofile.bio} placeholder='write down your biography here. Let recuiter know about you...' value={userData.biography||""} onChange={HandleChange}></textarea>
            </div>

            
            <div className={Editprofile.container1}>

                <div className={Editprofile.c1}>
                <label htmlFor='education' >University/College</label>
                    <input type='text' id='education' name="course" className={Editprofile.input} placeholder='Education'value={userData.college||""} onChange={HandleChange}></input>

                <label htmlFor="specialization">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    name='specialization'
                    value={userData.course||""}
                    className={Editprofile.input}
                    onChange={HandleChange}
                  />

                </div>
                <div className={Editprofile.c1}>
                <label htmlFor="course">Course</label>
                  <input type="text" id="course" name='course' className={Editprofile.input} value={userData.course||""} onChange={HandleChange}/>
                  <label htmlFor="percentage">Percentage</label>
                  <input
                    type="text"
                    id="percentage"
                    value={`${userData.percentage}%`||""}
                    className={Editprofile.input} 
                    onChange={HandleChange}
                  />
                </div>
               

                

            </div>
            <div className={Editprofile.container1}>
{/* <h2>Work Experience</h2> */}
<div className={Editprofile.c1}>
<label htmlFor='Nationality' >Experience</label>
                    <select id='Nationality' className={Editprofile.input} name="experience"onChange={HandleChange}>
                        <option defaultValue={userData.country||""} disabled>{userData.experience}</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Experience">Experience</option>

                    </select>

</div>
            </div>
            
              <div className={Editprofile.container1}>
              
                <div className={Editprofile.c1}>
                
                  <label htmlFor="company">Title</label>
                  <input type="text" id="company" value={userData.experience==="Experience"?userData.job_title||"":" "} className={Editprofile.input}
                                     readOnly={userData.experience==="Fresher"?true:false}
                                     onChange={HandleChange}
                                     />
                  <label htmlFor="start">Start Date</label>
                  <input
                    type="date"
                    id="start"
                    name='company_start_date'
                    value={userData.experience==="Experience"?formatISODateForInput(userData.company_start_date)||"":" "}                      
                    className={Editprofile.input}
                    onChange={HandleChange}
                   readOnly={userData.experience==="Fresher"?true:false}
                  />
                </div>
                <div className={Editprofile.c1}>
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name='company'
                    value={userData.experience==="Experience"?userData.company ||"":" "}
                    className={Editprofile.input}
                    onChange={HandleChange}
                    readOnly={userData.experience==="Fresher"?true:false}

                  />
                  <label htmlFor="end">End Date</label>
                  <input
                    type="date"
                    id="end"
                    name='company_end_date'
                    value={userData.experience==="Experience"?formatISODateForInput(userData.company_end_date)||"":" "}                      
                    className={Editprofile.input}
                    onChange={HandleChange}
                    readOnly={userData.experience==="Fresher"?true:false}

                  />
                </div>
              </div>

            <button type='submit'  className={Editprofile.save_change}>Save Changes</button>
        </div>

        </form>
        </div>
    )

              <div className={Editprofile.c1}>
                <label htmlFor='marital_status' >Marital Status</label>
                <select id='marital_status' name='marital_status' className={Editprofile.input} onChange={HandleChange}>
                  <option defaultValue={userData.marital_status} disabled >{userData.marital_status}</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Married">Married</option>

                </select>
              </div>

              <div className={Editprofile.c1}>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  className={Editprofile.input}
                  name="dob"
                  value={formatISODateForInput(userData.dob)}
                  onChange={HandleChange}
                />
              </div>
            </div>

            <div className={Editprofile.container1}>
              <div className={Editprofile.c1}>
                <label htmlFor='gender' >Gender</label>
                <select id='gender' name='gender' className={Editprofile.input} onChange={HandleChange}>
                  <option defaultValue={userData.gender} disabled >{userData.gender}</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={Editprofile.c1}>
                <label htmlFor='Nationality' >Nationality</label>
                <select id='Nationality' className={Editprofile.input} name="country" onChange={HandleChange}>
                  <option defaultValue={userData.country} disabled>{userData.country}</option>
                  <option value="Indian">Indian</option>
                  <option value="Non-indian">non-indian</option>

                </select>
              </div>
            </div>

            <div className={`${Editprofile.c1} ${Editprofile.cc}`}>
              <label htmlFor='biography'>Biography</label>
              <textarea id='biography' name='biography' className={Editprofile.bio} placeholder='write down your biography here. Let recuiter know about you...' value={userData.biography} onChange={HandleChange}></textarea>
            </div>

            <button type='button' className={Editprofile.save_change} onClick={(e) => updateUserDetails(e, userData)}>Save Changes</button>
          </>
        }

      </div>

    </form>
  )

}

export default EditProfile