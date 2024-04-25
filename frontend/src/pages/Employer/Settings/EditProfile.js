import SettingCss from './EditProfile.module.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

function EditProfile() {
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("name");
    const [firstname, lastname] = username.split(" ");

    const [userData, setuserData] = useState({
        profileImage:{},
        phone_number: " ",
        dob: "",
        country: " ",
        course: " ",
        website:" ",
        gender:" ",
        marital_status:" ",
        biography:" ",
        experience:" "
    });
   
 useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(
            `http://localhost:8080/api/hr/get-hr?email=${email}`
          );
          setuserData(response.data.userDetails);
        };
        fetchData();
      }, [email]);

      
const updateUserDetails = async (e,userDataToUpdate) => {
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:8080/api/hr/update-hr', userDataToUpdate);
      toast.success(response.data.message); // Handle response from the server
    } catch (error) {
      console.error('Error updating user:', error);
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
        <form onSubmit={(e)=>updateUserDetails(e,userData)}>
                    <div className={SettingCss.main_container}>
            <div className={SettingCss.cir_container}>
                <p>Profile picture</p>
                <div className={SettingCss.Upload_btn}>
            <label htmlFor="profileImage" className={SettingCss.customFileInput}>
              {userData ? (
                <img src='https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png' alt='#' className={SettingCss.Clogo}></img>
            ) : (
                <div className={SettingCss.input_label}>
                  <div>
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  </div>
                  <p>Upload Profile Image</p>
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

            <div className={SettingCss.container1}>
                <div className={SettingCss.c1}>
                    <label htmlFor='name' >First Name</label>
                    <input type='text' id='name' className={SettingCss.input} value={firstname} readOnly ></input>
                </div>
                <div className={SettingCss.c1}>
                    <label htmlFor='name' >Last Name</label>
                    <input type='text' id='name' className={SettingCss.input} value={lastname} readOnly ></input>
                </div>

            </div>
            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' placeholder='enter email' className={SettingCss.input_mail} readOnly value={email} ></input>
            </div>

            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label htmlFor='number'>Phone</label>
                <input type='number' id='number' name='phone_number' placeholder='+91 | Phone Number' className={SettingCss.input} value={userData.phone_number} onChange={HandleChange}></input>
            </div>

            <div className={SettingCss.container1}>

                <div className={SettingCss.c1}>
                    <label htmlFor='experience' >Experience</label>

                    <select id='experience' name='experience' className={SettingCss.input} onChange={HandleChange}>
                        <option defaultValue="" disabled >Select Experience</option>
                        <option value="Fresher" >Fresher</option>
                        <option value="Less than 6 month">Less than 6 Months</option>
                        <option value="6-12 months">6-12 Months</option>
                        <option value="greater than 1 year">Greater than 1 year</option>
                    </select>

                </div>
                <div className={SettingCss.c1}>
                    <label htmlFor='education' >Education</label>
                    <input type='text' id='education' name="course" className={SettingCss.input} placeholder='Education'value={userData.course} onChange={HandleChange}></input>
                    <label htmlFor="specialization">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    value={userData.course}
                    onChange={HandleChange}
                  />
                </div>
                

            </div>

            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label htmlFor='web'>Website</label>
                <input
                      type="text"
                      id="website"
                      name='website'
                      value={userData.website}
                      className={SettingCss.input_mail}
                      onChange={HandleChange}
                    />
            </div>
            <div className={SettingCss.container1}>
                <div className={SettingCss.c1}>
                    <label htmlFor='marital_status' >Marital Status</label>
                    <select id='marital_status' name='marital_status' className={SettingCss.input} onChange={HandleChange}>
                        <option defaultValue={userData.marital_status} disabled >{userData.marital_status}</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Married">Married</option>

                    </select>
                </div>

                <div className={SettingCss.c1}>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            className={SettingCss.input}
            name="dob"
            value={formatISODateForInput(userData.dob)}
            onChange={HandleChange}
          />
        </div>
            </div>

            <div className={SettingCss.container1}>
                <div className={SettingCss.c1}>
                    <label htmlFor='gender' >Gender</label>
                    <select id='gender' name='gender' className={SettingCss.input} onChange={HandleChange}>
                        <option defaultValue={userData.gender} disabled >{userData.gender}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={SettingCss.c1}>
                    <label htmlFor='Nationality' >Nationality</label>
                    <select id='Nationality' className={SettingCss.input} name="country"onChange={HandleChange}>
                        <option defaultValue={userData.country} disabled>{userData.country}</option>
                        <option value="Indian">Indian</option>
                        <option value="Non-indian">non-indian</option>

                    </select>
                </div>
            </div>

            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label htmlFor='biography'>Biography</label>
                <textarea id='biography'name='biography' className={SettingCss.bio} placeholder='write down your biography here. Let recuiter know about you...' value={userData.biography} onChange={HandleChange}></textarea>
            </div>

            <button type='submit'  className={SettingCss.save_change}>Save Changes</button>
        </div>

        </form>
    )
}

export default EditProfile
