import React, { useState } from 'react'
import SettingStyle from '../Settings/Setting.module.css'

function Setting() {
  const [settingtype, setsettingtype] = useState("");
  const username =localStorage.getItem("name")

  return (
    <div className={SettingStyle.my_setting_container}>
    <div className={SettingStyle.setting_profile_section}>
      <div className={SettingStyle.hello_logout}>
        <h3>Hello,</h3>
        <div className={SettingStyle.logout_main}>
        </div>
      </div>
      <div className={SettingStyle.my_profile_box}>
        <img
          src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
          alt="profile_img"
        />
        <div className={SettingStyle.my_name_section}>
          <h4>{username}</h4>
          <button>Edit My Profile</button>
        </div>
      </div>
      <h2>Settings</h2>
    </div>
    <div className={SettingStyle.Setting_opt_container}>
      <div className={SettingStyle.setting_opt_left}>
        <div
          className={
            settingtype === "Setting/Profile"
              ? `${SettingStyle.setting_opt_active}`
              : `${SettingStyle.setting_opt}`
          }
          onClick={() => setsettingtype("Setting/Profile")}
        >
      
          <i className="fa-solid fa-user"></i>Profile
        </div>
        <div
          className={
            settingtype === "Setting/privacy"
            ? `${SettingStyle.setting_opt_active}`
            : `${SettingStyle.setting_opt}`
          }
          onClick={() => setsettingtype("Setting/privacy")}
        >
          <i className="fa-solid fa-lock"></i>Privacy Search & Service
        </div>
        <div
          className={
            settingtype === "Setting/appearence"
            ? `${SettingStyle.setting_opt_active}`
            : `${SettingStyle.setting_opt}`
          }
          onClick={() => setsettingtype("Setting/appearence")}
        >
          {" "}
          <i className="fa-solid fa-wand-magic-sparkles"></i>Appearence
        </div>
        <div
          className={
            settingtype === "Setting/notification"
            ? `${SettingStyle.setting_opt_active}`
            : `${SettingStyle.setting_opt}`
          }
          onClick={() => setsettingtype("Setting/notification")}
        >
          <i class="fa-solid fa-table-list"></i>
          Notification
        </div>
        <div
          className={
            settingtype === "Setting/reset"
            ? `${SettingStyle.setting_opt_active}`
            : `${SettingStyle.setting_opt}`
                    }
          onClick={() => setsettingtype("Setting/reset")}
        >
          <i className="fa-solid fa-rotate-left"></i>Switch to Candidate
        </div>
        <div
          className={
            settingtype === "Setting/call"
            ? `${SettingStyle.setting_opt_active}`
            : `${SettingStyle.setting_opt}`
          }
          onClick={() => setsettingtype("Setting/call")}
        >
          <i className="fa-solid fa-phone"></i>Call & message
        </div>
        <div
          className={
            settingtype === "Setting/help"
            ? `${SettingStyle.setting_opt_active}`
            : `${SettingStyle.setting_opt}`
          }
          onClick={() => setsettingtype("Setting/help")}
        >
          <i className="fa-solid fa-info"></i>Help
        </div>
        <div
          className={
            settingtype === "Setting/support"
            ? `${SettingStyle.setting_opt_active}`
            : `${SettingStyle.setting_opt}`
          }
          onClick={() => setsettingtype("Setting/support")}
        >
          <i className="fa-solid fa-headset"></i>Support
        </div>
      </div>
      <div className={SettingStyle.setting_opt_right}>
        <h2>{settingtype}</h2>
        {settingtype === "" &&<p>Select any option from the list</p>}
        {/* {settingtype === "Profile" && <Account />}
        {settingtype==="privacy" && <Privacy/>} */}
      </div>
    </div>
  </div>
  )
}

export default Setting

