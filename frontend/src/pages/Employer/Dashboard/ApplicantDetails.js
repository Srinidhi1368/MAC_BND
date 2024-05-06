import React, { useState, useEffect } from 'react'
import axios from "axios";
import pages from "../Pages.module.css";
import { FaRegBookmark } from "react-icons/fa"; //not-bookmark
// import { FaBookmark } from "react-icons/fa"; //bookmarked
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const ApplicantDetails = ({ jobId }) => {
  const [job, setJob] = useState(null);
  const [showUserID, setShowUserID] = useState(null);
  // console.log(jobId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/jobs/job/${jobId}`);
        const selectedJob = response.data.jobs;
        setJob(selectedJob);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchData();
  }, [jobId]);

  const handleShowApplicant = () => {
    setShowUserID(!showUserID)
  }

  return (
    <div>
      {/* Users Applied-------- */}
      <div className={pages.__appliedUserList}>
        {
          job?.appliedBy?.map((user) => {
            return (
              <div className={pages.__appliedUsersSpace} key={user._id}>
                <div className={`${pages.__appliedUsers} ${showUserID === user._id && pages.__activeAppliedUsers}`} key={user._id} onClick={handleShowApplicant}>
                  <header className={pages.__appliedHeader}>
                    <img className={pages.__userPF} src={user.profileImage} alt="" />
                    <section>
                      <span style={{ fontSize: '20px' }}><strong>{user.name}</strong></span>
                      <p style={{ fontSize: '15px' }}>{user.biography}</p>
                    </section>
                    {/* bookmark here */}
                    <FaRegBookmark style={{ fontSize: '20px' }} />
                  </header>
                  <section className={pages.__appliedBody}>
                    <span>Location - <strong>{user.location}</strong></span>
                    <span>Type - <strong>{user.employmentType}</strong></span>
                  </section>
                  <footer>
                    <h6>Skills</h6>
                    <div className={pages.__appliedSkills}>
                      {
                        user.skills?.map(skill => {
                          return (
                            <span key={skill._id}>{skill.name}</span>
                          )
                        })
                      }
                    </div>
                  </footer>
                </div>


                {/* <p>{user.email}</p> */}

                {/* Applicant Details--------- */}
                {
                  showUserID &&
                  <div className={pages.__applicantDetails}>
                    <header className={pages.__appliedHeader}>
                      <img className={pages.__userPF} src={user.profileImage} alt="" />
                      <span style={{ fontSize: '20px' }}><strong>{user.name}</strong></span>
                      {/* <FaRegBookmark/> */}
                    </header>
                    <p style={{ textAlign: 'justify' }}>{user.biography}</p>
                    <div className="__applicantPlace">
                      <span>State - <strong>{user.state}</strong></span>
                      <span>Country - <strong>{user.country}</strong></span>
                    </div>
                    <footer>
                      <h6>Skills</h6>
                      <div className={pages.__appliedSkills}>
                        {
                          user.skills?.map(skill => {
                            return (
                              <span key={skill._id}>{skill.name}</span>
                            )
                          })
                        }
                      </div>
                    </footer>
                    <section>
                      <h6>Appicant Note:</h6>
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                      {user.biography}
                    </section>
                    <div className={pages.__applicantButtons}>
                      <button className={pages.__applicantBtn}>See Resume</button>
                      <button className={pages.__applicantBtn} style={{ background: 'blue', padding: '0 4em' }}>Schedule Interview</button>
                    </div>
                  </div>
                }

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ApplicantDetails