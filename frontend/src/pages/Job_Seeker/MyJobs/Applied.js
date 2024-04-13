import React, { useState } from "react";
import JobStyle from "../MyJobs/Job.module.css";
import {useNavigate}from 'react-router-dom'

const Applied = () => {
    const navi=useNavigate()
    const [applied_jobs] = useState([
        {
            "_id": "6618f1305502f224a4e5b551",
            "jobTitle": "Android Developer",
            "jobPoster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5IY6HmILZ8AgoXUijtQsg3xO1BR__fPkGouHAaC05Q&s",
            "jobDescription": "Develop native Android applications. Experience with Java, Kotlin, and the Android SDK. Strong understanding of mobile development",
            "employmentType": "Contract",
            "location": "Gurgaon, India",
            "experience":"Fresher",
            "salaryRange": "₹ 8 - 12 Lakhs",
            "skilRequired": [
                "UI/UX Design",
                "Figma"
            ],
            "createdAt": 1712910640206,
            "__v": 0,
            "employeeEmail": "hr@gmail.com"
        },
        {
            "_id": "6618f0e45502f224a4e5b54f",
            "jobTitle": "Software Development Engineer",
            "jobPoster": "https://c8.alamy.com/comp/2HA87X4/san-jose-ca-usa-october-17-2021-editorial-use-only-3d-cgi-adobe-signage-logo-on-top-of-glass-building-workplace-computer-software-company-in-h-2HA87X4.jpg",
            "jobDescription": "Design, develop, and test software applications. Experience with object-oriented programming languages like Java or C++ and strong problem-solving skills.",
            "employmentType": "Full Time",
            "experience":"Fresher",
            "location": "Noida, India",
            "salaryRange": "₹ 15 - 20 Lakhs",
            "skilRequired": [
                "Backend",
                "Java"
            ],
            "createdAt": 1712910564965,
            "__v": 0,
            "employeeEmail": "hr@gmail.com"
        },
        {
            "_id": "6618ee495502f224a4e5b53e",
            "jobTitle": "Machine Learning Engineer",
            "jobPoster": "https://static2.bigstockphoto.com/6/7/4/large1500/476317187.jpg",
            "jobDescription": "Develop and implement machine learning models to solve complex business problems. Experience with building and deploying large-scale production systems. Familiarity with deep learning frameworks like TensorFlow or PyTorch a plus.",
            "employmentType": "Full Time",
            "location": "Bangalore, India",
            "salaryRange": "₹ 15 - 20 Lakhs",
            "experience":"Fresher",
            "skilRequired": [
                "ML",
                "Python"
            ],
            "createdAt": 1712909897944,
            "__v": 0,
            "employeeEmail": "hr@gmail.com"
        },
       
               
                {
                    "_id": "6618ee8a5502f224a4e5b540",
                    "jobTitle": "Front-End Developer",
                    "jobPoster": "https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/17/full/1689574606-2001.png",
                    "jobDescription": "Build and maintain user-facing web applications. Experience with HTML, CSS, JavaScript frameworks like React or Angular. Strong understanding of responsive design principles.",
                    "employmentType": "Contract",
                    "experience":"Fresher",
                    "location": "Gurgaon, India",
                    "salaryRange": "₹ 8 - 12 Lakhs",
                    "skilRequired": [
                        "Frontend",
                        "React"
                    ],
                    "createdAt": 1712909962093,
                    "__v": 0,
                    "employeeEmail": "hr@gmail.com"
                },
                {
                    "_id": "6618eef55502f224a4e5b543",
                    "jobTitle": "Full Stack Developer",
                    "jobPoster": "https://businesstak.com/uploads/124509-2550718142.jpg",
                    "jobDescription": "Develop and maintain both front-end and back-end web applications. Experience with a variety of technologies like HTML, CSS, JavaScript, Node.js, and databases like MySQL or PostgreSQL.",
                    "employmentType": "Full Time",
                    "experience":"Experience",
                    "location": "Hyderabad, India",
                    "salaryRange": "₹ 12 - 18 Lakhs",
                    "skilRequired": [
                        "Full Stack",
                        "MERN Stack"
                    ],
                    "createdAt": 1712910069413,
                    "__v": 0,
                    "employeeEmail": "hr@gmail.com"
                },
  ]);
  return (
    <>
      {applied_jobs &&
        applied_jobs.map((item, index) => {
          return (
            <>
              <div className={JobStyle.company_box} key={index}>
                <div className={JobStyle.saved_job_box}>
                  <div className={JobStyle.company_job_profile}>
                    <img src={item.jobPoster} alt="comp_logo" />
                    <div className={JobStyle.job_position}>
                      <h5>{item.jobTitle}</h5>
                      <p>12 hours ago</p>
                    </div>
                  </div>
                  <div className={JobStyle.lpa_box}>
                    <i
                      class="fa-solid fa-money-check-dollar"
                      style={{ color: "#067418" }}
                    ></i>
                    <span style={{ fontWeight: "bold" }}>{item.salaryRange}</span>
                    <span style={{ color: "#9595b4", fontSize: 12 }}>
                      /CTC
                    </span>
                  </div>
                  <div className={JobStyle.apply_box}>
                    <button className={JobStyle.btn_applied}>APPLIED</button>
                  </div>
                </div>
                <div className={JobStyle.location_box}>
                  <div className={JobStyle.req_1}>
                    <i
                      class="fa-solid fa-location-dot"
                      style={{ color: "black" }}
                    ></i>

                    {item.location}
                  </div>
                  <div className={JobStyle.req_1}>
                    <div>
                      <i
                        class="fa-solid fa-envelope-open-text"
                        style={{ color: "black" }}
                      ></i>
                    </div>
                    {item.experience}
                  </div>
                  <div className={JobStyle.req_1}>
                    <div>
                      <i
                        class="fa-solid fa-droplet"
                        style={{ color: "black" }}
                      ></i>
                    </div>
                   {item.employmentType}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      {applied_jobs.length === 0 && 
      <><p>You have not applied for any jobs. Find and grab the opportunity now !</p>
      <button onClick={()=>navi('/')}>Find Jobs !</button></>
      }
    </>
  );
};

export default Applied;
