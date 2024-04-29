import React, { useState, useEffect } from "react";
import axios from "axios";
import pages from "../Pages.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import userImage from "../../../Assets/userimage1.png";
import favourite from "../../../Assets/favourite.png";
import option from "../../../Assets/optiondot.png";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const HrJobDetail = ({ jobId, dataId }) => {
  const [job, setJob] = useState(null);
  const [userData, setUserData] = useState([]);
  const [showSwiperContent, setShowSwiperContent] = useState(true);
  const [userEmail, setUserEmail] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/jobs/job/${jobId}`);
        const selectedJob = response.data.jobs;
        setJob(selectedJob);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchData();
  }, [jobId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Example array of user emails

        const userPromises = userEmail.map((email) =>
          axios.get(`http://localhost:8080/api/user?email=${email}`)
        );

        try {
          const userData = await Promise.all(userPromises);
          const usersData = userData.map((response) => response.data);
          setUserData(usersData);
          console.log(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userEmail]);

  useEffect(() => {
    let email = localStorage.getItem("email");
    const getEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/jobs/get-job/${email}`
        );
        const selectedJob = response.data.jobs;
        selectedJob.forEach((job) => {
          if (job._id === dataId) {
            const userEmails = [];
            job.appliedBy.forEach((applied) => {
              userEmails.push(applied.userEmail);
            });
            setUserEmail(userEmails);
          }
        });
        // Print the objects
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    getEmail();
  }, [jobId]);

  return (
    <>
      {showSwiperContent && (
        <div key={job && job._id}>
          <h2>{job && job.jobTitle} needed.</h2>
          <p style={{ width: "66vw" }}>{job && job.jobDescription}</p>
          <p style={{ paddingTop: "20px" }}>
            <strong>Requirements</strong>
          </p>
          <p style={{ width: "66vw",textAlign:'justify'}}>{job && job.responsibility}</p>
          <p style={{ width: "66vw",textAlign:'justify'}}>{job && job.responsibility}</p>

          <div className={pages.hr_job_detail_skill_container_main}>
            <div>
              <div
                style={{ color: "rgba(255, 184, 0, 1)", paddingTop: "20px", fontWeight:'500' }}
              >
                Skills
              </div>
            </div>
            <div>
              <ul className={pages.hr_job_detail_skill_container}>
                {job &&
                  job.skilRequired.map((skill) => (
                    <li key={skill.index} className={pages.hr_job_detail_skill}>
                      {skill.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={pages.hr_job_detail_location}>
            <p className={pages.hr_job_detail_location_childrens}>
              Location -{" "}
              <span>
                <strong>{job && job.location}</strong>
              </span>
            </p>
            <p className={pages.hr_job_detail_location_childrens}>
              Type -{" "}
              <span>
                <strong>{job && job.employmentType}</strong>
              </span>
            </p>
            <p className={pages.hr_job_detail_location_childrens}>
              Salary -{" "}
              <span>
                <strong>{job && job.salaryRange}</strong>
              </span>
            </p>
          </div>
          <hr />
        </div>
      )}

      {showSwiperContent && (
        <div className={pages.job_applied_user}>
          <Container>
            <Row>
              <Col xxl={12}>
                <>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    className="AppliedUser"
                  >
                    {userData.map((user, index) => (
                      <SwiperSlide
                        className={pages.applied_user_info_full}
                        onClick={() => setShowSwiperContent(false)}
                        key={index}
                      >
                        <div className={pages.applied_user_info}>
                          <div className={pages.applied_user_image_cnt}>
                            <div className={pages.applied_user_img}>
                              <img
                                src={userImage}
                                alt="userImage"
                                className={pages.applied_user_image}
                              />

                              <div className={pages.applied_user_detail}>
                                <div className={pages.applied_user_name}>
                                  {user.userDetails && user.userDetails.name}
                                  <span>
                                    <img
                                      src={favourite}
                                      alt="favourite"
                                      className={pages.applied_user_fav}
                                    />
                                  </span>
                                </div>
                                <div className={pages.applied_user_exp}>
                                  {user.userDetails &&
                                    user.userDetails.biography}
                                </div>
                              </div>
                            </div>
                            <div className={pages.applied_user_location_type}>
                              <div className={pages.applied_user_location}>
                                Location -{" "}
                                <span className={pages.applied_user_blue}>
                                  {user.userDetails.country}
                                </span>
                              </div>
                              <div className={pages.applied_user_type}>
                                Type -{" "}
                                <span className={pages.applied_user_blue}>
                                  Remote
                                </span>
                              </div>
                            </div>

                            <div className={pages.applied_user_skills}>
                              <div className={pages.applied_user_skills_title}>
                                Skills
                              </div>
                              {user.userDetails.skills.map((skill, index) => (
                                <div className={pages.skill_set} key={index}>
                                  <div
                                    className={pages.applied_user_skill_type}
                                  >
                                    {skill.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {!showSwiperContent && (
        <div className={pages.applied_user_detailed_view}>
          <div className={pages.applied_user_detailed_bookmarked}>
            Profile Bookmarked
          </div>
          <Container>
            <Row>
              <Col xxl={4}>
                {userData.map((user, index) => (
                  <div className={pages.applied_user_info} key={index}>
                    <div className={pages.applied_user_image_cnt}>
                      <div className={pages.applied_user_img}>
                        <img
                          src={userImage}
                          alt="userImage"
                          className={pages.applied_user_image}
                        />

                        <div className={pages.applied_user_detail}>
                          <div className={pages.applied_user_name}>
                            {user.userDetails && user.userDetails.name}
                            <span>
                              <img
                                src={favourite}
                                alt="favourite"
                                className={pages.applied_user_fav}
                              />
                            </span>
                          </div>
                          <div className={pages.applied_user_exp}>
                            {user.userDetails && user.userDetails.biography}
                          </div>
                        </div>
                      </div>
                      <div className={pages.applied_user_location_type}>
                        <div className={pages.applied_user_location}>
                          Location -{" "}
                          <span className={pages.applied_user_blue}>
                            {" "}
                            {user.userDetails.country}
                          </span>
                        </div>
                        <div className={pages.applied_user_type}>
                          Type -{" "}
                          <span className={pages.applied_user_blue}>
                            Remote
                          </span>
                        </div>
                      </div>

                      <div className={pages.applied_user_skills}>
                        <div className={pages.applied_user_skills_title}>
                          Skills
                        </div>
                        {user.userDetails.skills.map((skill, index) => (
                          <div className={pages.skill_set} key={index}>
                            <div className={pages.applied_user_skill_type}>
                              {skill.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </Col>

              <Col xxl={8}>
                {" "}
                {userData.map((user, index) => (
                  <div className={pages.applied_user_details_brief} key={index}>
                    <div className={pages.applied_user_img_flex_duplicate}>
                      <div className={pages.applied_user_img_duplicate}>
                        <img
                          src={userImage}
                          alt="userImage"
                          className={pages.applied_user_image_duplicate}
                        />

                        <div className={pages.applied_user_detail_duplicate}>
                          <div className={pages.applied_user_name_duplicate}>
                            {user.userDetails && user.userDetails.name}
                          </div>
                        </div>
                      </div>
                      <span className={pages.two_icons}>
                        <img
                          src={favourite}
                          alt="favourite"
                          className={pages.applied_user_fav_duplicate}
                        />
                        <img
                          src={option}
                          alt="option"
                          className={pages.applied_user_option}
                        />
                      </span>
                    </div>
                    <div className={pages.applied_user_exp_duplicate}>
                      {user.userDetails && user.userDetails.biography}
                    </div>
                    <div className={pages.applied_user_location_duplicate}>
                      <div className={pages.applied_user_city_duplicate}>
                        City
                        <div className={pages.applied_user_city_name_duplicate}>
                          {user.userDetails.country}
                        </div>
                      </div>
                      <div className={pages.applied_user_city_duplicate}>
                        State
                        <div className={pages.applied_user_city_name_duplicate}>
                          {user.userDetails.state}
                        </div>
                      </div>
                      <div className={pages.applied_user_city_duplicate}>
                        Country
                        <div className={pages.applied_user_city_name_duplicate}>
                          {user.userDetails.country}
                        </div>
                      </div>
                    </div>
                    <div className={pages.applied_user_skill_duplicate}>
                      <div className={pages.applied_user_skill_title_duplicate}>
                        Skills
                      </div>
                      {user.userDetails.skills.map((skill, index) => (
                        <div
                          className={pages.applied_user_skill_type_duplicate}
                          key={index}
                        >
                          <div
                            className={
                              pages.applied_user_skill_type_skill_duplicate
                            }
                          >
                            {skill.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={pages.applied_user_notes_duplicate}>
                      <div className={pages.applied_user_notes_title_duplicate}>
                        Applicant Note:
                      </div>
                      <div>
                        Just saw your job application. I think i am perfect fit
                        for all your requirements and can start from your
                        desired time. Lets talk in details in a interview.
                      </div>
                    </div>
                    <div className={pages.applied_user_button_duplicate}>
                      <button className={pages.applied_user_btn_one_duplicate}>
                        See Resume
                      </button>
                      <button className={pages.applied_user_btn_two_duplicate}>
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default HrJobDetail;
