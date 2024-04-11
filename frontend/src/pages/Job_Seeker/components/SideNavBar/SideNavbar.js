import React from "react";
import navStyle from "./SideNav.module.css";
import { FaHouse } from "react-icons/fa6";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { PiBriefcaseBold } from "react-icons/pi";
import { GrDocumentText } from "react-icons/gr";
import { GoSmiley } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {useSelector, useDispatch} from 'react-redux'
import { handleUserLogOut } from "../../../../Redux/ReduxSlice";
import {useNavigate} from "react-router-dom"
const menuItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHouse className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/assessment",
    name: "Assessment",
    icon: <FaEnvelopeOpenText className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/chatbot",
    name: "Chat bot",
    icon: <IoChatbubblesOutline className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <SiSimpleanalytics className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/myjobs",
    name: "My jobs",
    icon: <PiBriefcaseBold className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/myresume",
    name: "My Resume",
    icon: <GrDocumentText className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/application",
    name: "Application Status",
    icon: <GoSmiley className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/interviews",
    name: "Interview Scheduled",
    icon: <SlCalender className={navStyle.JobSeeker_navITEMICON} />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsOutline className={navStyle.JobSeeker_navITEMICON} />,
  },
];

function SideNavbar() {
const dispatch = useDispatch();
const navigateTO = useNavigate()
const {name}=   useSelector((state)=> state.Assessment.currentUser);

const handleLogoutClick = ()=>{
  dispatch(handleUserLogOut());
  navigateTO("/user-login")

}
  return (
    <div className={navStyle.SidenavBar__Container}>
      <div className={navStyle.sidenavBar__AppLOGOBOX}>
        <h1 className={navStyle.sidenavBar__appLOGO}>
          <span className={navStyle.sidenavBar_DeskLOGO}>HRConnect Pro</span>{" "}
          <span className={navStyle.sidenavBar_LOGO}>H C P</span>
        </h1>
      </div>

      <nav className={navStyle.JobSeeker_nav}>
        {menuItems.map((data, index) => {
          return (
            <NavLink
              key={index}
              to={data.path}
              className={({ isActive }) =>
                isActive ? navStyle.active : navStyle.JobSeeker_navITEM_LINK
              }
            >
              <Tooltip title={data.name} arrow placement="right-end" className={navStyle.toolTip}>
                <p className={navStyle.JobSeeker__navItem}>
                  {data.icon}
                  <span className={navStyle.navTextHIDE}>{data.name}</span>
                </p>
              </Tooltip>
            </NavLink>
          );
        })}
      </nav>

      <div className={navStyle.sidenavBar__profileBox}>
        <Tooltip title="Profile" arrow placement="right-end">
          <img
            src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"
            alt="UserProfilePicture"
            className={navStyle.sidenavBar__userProfilePicture}
          />
        </Tooltip>

        <p className={navStyle.sidenavBar__userName}>
          {name && name}
          <button className={navStyle.editProfileButton}>Edit Profile</button>
        </p>

        <DropDownMENU userName= {name} userLogOut= {handleLogoutClick}/>
      </div>

      <button className={navStyle.logOutButton}  onClick={handleLogoutClick} >
        <RiLogoutCircleRLine className={navStyle.logOutButtonICON} />
        Log Out
      </button>
    </div>
  );
}

export default SideNavbar;

function DropDownMENU({userName,userLogOut}) {
  return (
    <div className={navStyle.ProfileDropDownContainer}>
      <p className={`${navStyle.dropDownITEM} ${navStyle.dropDownITEM_Name}`}> {userName && userName}</p>
      <button className={`${navStyle.dropDownITEM} ${navStyle.dropDownITEM_Button}`}>Edit Profile</button>
      <button className={`${navStyle.dropDownITEM} ${navStyle.dropDownITEM_Button}`} onClick={userLogOut}>  <RiLogoutCircleRLine className={navStyle.logOutButtonICON} />
        Log Out </button>
    </div>
  );
}
