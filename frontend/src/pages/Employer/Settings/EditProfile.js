import React from 'react'
import SettingCss from './EditProfile.module.css';



export default function Setting() {
    return (
        <div className={SettingCss.main_container}>
            <div className={SettingCss.cir_container}>
                <p>Profile picture</p>
                <img src='https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png' alt='#' className={SettingCss.Clogo}></img>
            </div>

            <div className={SettingCss.container1}>
                <div className={SettingCss.c1}>
                    <label for='name' >First Name</label>
                    <input type='text' id='name' className={SettingCss.input}></input>
                </div>
                <div className={SettingCss.c1}>
                    <label for='name' >Last Name</label>
                    <input type='text' id='name' className={SettingCss.input}></input>
                </div>

            </div>
            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label for='email'>Email</label>
                <input type='text' id='email' placeholder='enter email' className={SettingCss.input_mail}></input>
            </div>

            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label for='number'>Phone</label>
                <input type='number' id='number' placeholder='+91 | Phone Number' className={SettingCss.input_mail}></input>
            </div>

            <div className={SettingCss.container1}>

                <div className={SettingCss.c1}>
                    <label for='exp' >Experience</label>

                    <select id='exp' className={SettingCss.input}>
                        <option value="" disabled selected >Select Experience</option>
                        <option value="less than 6 month">less than 6 month</option>
                        <option value="more than 6 month">more than 6 month</option>
                        <option value="greater than 1 year">greater than 1 year</option>
                    </select>

                </div>
                <div className={SettingCss.c1}>
                    <label for='education' >Education</label>
                    <input type='text' id='education' className={SettingCss.input} placeholder='Education'></input>
                </div>

            </div>

            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label for='web'>Website</label>
                <select id='web' className={SettingCss.input_mail}>
                    <option value="" disabled selected ></option>
                    <option value="ecom">ecomerce</option>
                    <option value="other">other</option>
                </select>
            </div>
            <div className={SettingCss.container1}>
                <div className={SettingCss.c1}>
                    <label for='Nationality' >Nationality</label>
                    <select id='Nationality' className={SettingCss.input}>
                        <option value="" disabled selected >Select...</option>
                        <option value="indian">Indian</option>
                        <option value="non-indian">non-indian</option>

                    </select>
                </div>

                <div className={SettingCss.c1}>
                    <label for='dob' >Date of Birth</label>
                    <input type='date' id='dob' className={SettingCss.input}></input>
                </div>

            </div>

            <div className={SettingCss.container1}>
                <div className={SettingCss.c1}>
                    <label for='gender' >Gender</label>
                    <select id='gender' className={SettingCss.input}>
                        <option value="" disabled selected >Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className={SettingCss.c1}>
                    <label for='Nationality' >Nationality</label>
                    <select id='Nationality' className={SettingCss.input}>
                        <option value="" disabled selected >Select...</option>
                        <option value="indian">Indian</option>
                        <option value="non-indian">non-indian</option>

                    </select>
                </div>
            </div>

            <div className={`${SettingCss.c1} ${SettingCss.cc}`}>
                <label for='bio'>Biography</label>
                <textarea id='bio' className={SettingCss.bio} placeholder='write down your biography here. Let recuiter know about you...'></textarea>
            </div>

            <button className={SettingCss.save_change}>Save Changes</button>
        </div>
    )
}

