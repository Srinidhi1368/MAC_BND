import React, { useState } from 'react'
import ApplicationCss from './Application.module.css';
import { GiNetworkBars } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { BiSolidDropletHalf } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import YourApplicationStatus from './YourApplicationStatus';


function ApplicationStatus() {
    const [popUp, setPopUp] = useState(false)

    function handleCLick() {
        setPopUp(true)
    }

    console.log(popUp)
    return (
        <div>
            {/* ---------selection of ApplicationStatus----- */}
            <div className={ApplicationCss.selection}>

                <div className={ApplicationCss.Select}>

                    <GiNetworkBars className={ApplicationCss.network} />
                    In-progress</div>
                <div className={ApplicationCss.Select}>
                    <FaRegCheckCircle className={ApplicationCss.check} />
                    Shortlisted</div>

                <div className={ApplicationCss.Select}>
                    <RxCrossCircled className={ApplicationCss.cross} />
                    Not-Shortlisted</div>
            </div>


            {/*------------- result of the job applied ------------ */}
            <div className={ApplicationCss.company_applied}>
                <div className={ApplicationCss.Company_Details}>
                    <div className={ApplicationCss.Company_logo}>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2048px-Amazon_icon.svg.png' alt='#' className={ApplicationCss.Clogo}></img>
                    </div>
                    <div className={ApplicationCss.Product_Discription}>
                        <p className={ApplicationCss.Product_Discription1}>Product Designer</p>
                        <p className={ApplicationCss.Product_Discription2}>Applied on Thrusday</p>
                    </div>
                    <div className={ApplicationCss.money}>
                        <GiMoneyStack className={ApplicationCss.note} />
                        <p>30K<span>/Month</span></p>
                    </div>
                    <button className={ApplicationCss.view_status_button} onClick={handleCLick}>View Status</button>
                </div>

                <div className={ApplicationCss.Company_Address}>

                    <div className={ApplicationCss.Company_Address_details}>
                        <MdOutlineLocationOn /><span>Seatle,US(Remote)</span>
                    </div>

                    <div className={ApplicationCss.Company_Address_details}> <PiStudentBold />
                        <span>Fresher</span></div>
                    <div className={ApplicationCss.Company_Address_details}>
                        <BiSolidDropletHalf />
                        <span>Full-Time</span>
                    </div>

                </div>

            </div>

            {/*---------------- right side profile container------------ */}


            <div className={ApplicationCss.Profile_Main}>

                {/*-------------- first profile box -------------*/}
                <div className={`${ApplicationCss.container_right1} ${ApplicationCss.profile}`}>


                    <div className={ApplicationCss.profile_image}>
                        <FaUser className={ApplicationCss.profile_image1} />
                    </div>
                    <p>Candidate_Name </p>
                    <p className={ApplicationCss.jobTitle}>Job Title</p>
                    <button className={ApplicationCss.Edit_Profile_btn}>Edit Profile</button>
                </div>

                {/* ---------------------second experience box ------------*/}
                <div className={`${ApplicationCss.container_right1} ${ApplicationCss.experience}`}>
                    <h3>Experience</h3>
                    <p>years</p>
                    <h3>Skills And Experience</h3>
                    <p>UI Designer</p>
                    <p>UX Designer</p>
                    <button className={ApplicationCss.ViewProfile_button}>View Profile</button>
                </div>
            </div>
            {
                popUp ? <div className={ApplicationCss.secondaryDiv}><YourApplicationStatus /></div> : null
            }
        </div>
    )
}

export default ApplicationStatus
