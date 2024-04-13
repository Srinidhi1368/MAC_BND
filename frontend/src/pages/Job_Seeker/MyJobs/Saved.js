import React, { useState } from "react";
import JobStyle from "../MyJobs/Job.module.css";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const [saved_jobs] = useState([
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
  const navi = useNavigate();

  return (
    <>
      {saved_jobs &&
        saved_jobs.map((item, index) => {
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
                    <i class="fa-solid fa-tag"></i>

                    <button className={JobStyle.btn_apply}>APPLY</button>
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
      {saved_jobs.length === 0 && (
        <>
          <p>You have not Save any jobs. Find and grab the opportunity now !</p>
          <button onClick={() => navi("/")}>Find Jobs !</button>
        </>
      )}
    </>
  );
};

export default Saved;
