import React, { useState } from 'react'
import Applicationpop from './Applicationpop.module.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function YourApplicationStatus(props) {
    const Navigate = useNavigate()
    const [stage, setStage] = useState("")

    const [count, setCount] = useState(4)

    const newObj = {
        "Applied": 1,
        "Appliation Sent": 2,
        "Application Viewed": 3,
        "Resume viewed": 4,
        "Waiting For Recruiter": 5
    }
    useEffect(() => {
        setStage("Resume viewed")
        console.log(newObj[stage] + " niufccefewcggnfgnngecgcuegegguiguigui")
        setCount(newObj[stage])
        console.log(count)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const myDiv = document.querySelectorAll('li');
        console.log(myDiv)
        for (let i = 0; i < count; i++) {
            myDiv[i].className = "activeerere"
        }
    }, [stage, count])

    return (
        <>
        <div className={Applicationpop.main}>
            <div className={Applicationpop.main_child1}>
                <h1 className={Applicationpop.applicationtext}>Your Application status</h1>
                <img className={Applicationpop.img1} src={"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684003206i/127305845.jpg"} alt='job'/>
                <h3 className={Applicationpop.reviewingtext}>We're reviewing your application</h3>
                <p className={Applicationpop.reviewingtext1}>Thanks for applying. We'll review and consider your application. You can check back later to see how things are going.</p>
            </div>
            <div>
                <ul className={Applicationpop.progressbar}>
                    <li>Applied</li>
                    <li>Appliation Sent</li>
                    <li>Application Viewed</li>
                    <li>Resume viewed</li>
                    <li>Waiting For Recruiter</li>
                </ul>
            </div>
            <div className={Applicationpop.multi_btn_status}>
                <button className={Applicationpop.multi_btn} onClick={props.toggleFunc}>OK, GOT IT</button>
                <button className={Applicationpop.multi_btn} onClick={(()=>Navigate('/dashboard'))}>Browse jobs at HRConnect</button>
                <p className={Applicationpop.reviewingtext1}> HR Connect  is proud to be an equal opportunity workplace and is an affirmative action employer</p>
            </div>
        </div>
        </>
    )
}

export default YourApplicationStatus