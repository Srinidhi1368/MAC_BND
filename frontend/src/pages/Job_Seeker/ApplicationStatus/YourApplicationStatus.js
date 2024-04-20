import React, { useState } from 'react'
import './YourApplicationStatus.css'
import { useEffect } from 'react';

function YourApplicationStatus() {

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
    }, [])

    useEffect(() => {
        const myDiv = document.querySelectorAll('li');
        console.log(myDiv)
        for (let i = 0; i < count; i++) {
            myDiv[i].className = "activeerere"
        }
    }, [stage, count])

    return (
        <div className="main">
            <div>
                <h1 style={{ textAlign: "center" }}>Your Application status</h1>
                <img className='img1' src={"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684003206i/127305845.jpg"} />
                <h3 className='h3h3h3'>We're reviewing your application</h3>
                <p className='h3h3h3p'>Thanks for applying. We'll review and consider your application. You can check back later to see how things are going.</p>
            </div>
            <div>
                <ul className='progressbar'>
                    <li>Applied</li>
                    <li>Appliation Sent</li>
                    <li>Application Viewed</li>
                    <li>Resume viewed</li>
                    <li>Waiting For Recruiter</li>
                </ul>
            </div>
            <div className='multi-button-status'>
                <button>OK, GOT IT</button>
                <button>Browse jobs at HRConnect</button>
                <p> HR Connect  is proud to be an equal opportunity workplace and is an affirmative action employer</p>
            </div>
        </div>
    )
}

export default YourApplicationStatus