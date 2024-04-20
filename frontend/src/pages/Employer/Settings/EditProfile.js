import React from 'react'
import SettingCss from './Setting.module.css';

export default function Setting() {
    return (
        <div className={SettingCss.main_container}>
            <div>
                <p>Profile picture</p>
                <img src='https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png' alt='#' className={SettingCss.Clogo}></img>
            </div>
            <div>
                <label for='name' >First Name</label>
                <input type='text' id='name'></input>


            </div>
        </div>
    )
}
