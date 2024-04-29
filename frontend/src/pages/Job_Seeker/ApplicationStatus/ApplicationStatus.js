import React, { useState } from 'react'
import ApplicationCss from './Application.module.css';
import { GiNetworkBars } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineLocationOn } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { BiSolidDropletHalf } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import YourApplicationStatus from './YourApplicationStatus';


function ApplicationStatus() {
    const [popUp, setPopUp] = useState(false)

    function handleCLick() {
        setPopUp(true)
    }

    function handleClick2() {
        setPopUp(false)
    }

    console.log(popUp)
    return (
        <div className={ApplicationCss.main_container}>
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

            {
                popUp ? <div className={ApplicationCss.secondaryDiv}><YourApplicationStatus status={popUp} toggleFunc={handleClick2} /></div> : null
            }
        </div>
    )
}

export default ApplicationStatus
