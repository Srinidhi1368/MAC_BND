import React from "react";
import { useParams, Link } from "react-router-dom";
import Data from "./MatchedJob";
import UserDashBoardStyle from "./Detailedview.module.css";

import { IoCloseOutline } from "react-icons/io5";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import fresherImage from "./images/mdi_book-education-outline.png";
import drop from "./images/Vector.png";
import fav_icon from "./images/favoutite.png";
import money from "./images/money-stack.png";
import location from "./images/ep_location.png";

export default function JobListDetailedView() {
  const { id } = useParams();
  const jobDetails = Data.find((job) => job.id === id);

  if (!jobDetails) {
    return <div>Job not found</div>;
  }

  return (
    <div className={UserDashBoardStyle.detailed_view_full_full}>
      <Container>
        <Row>
          <Col xxl={3}>
            {Data.map((item, index) => (
              <div className={UserDashBoardStyle.detailed_view_full_small}>
                <div className={UserDashBoardStyle.detailed_view_full}>
                  <div
                    className={`${UserDashBoardStyle.detail_list_view_full}
                     ${item.id === id ? UserDashBoardStyle.selected : ""}`}
                  >
                    <div className={UserDashBoardStyle.detail_list_view}>
                      <div className={UserDashBoardStyle.detail_company_detail}>
                        <img
                          src={jobDetails.image}
                          alt={"amazon_image"}
                          className={UserDashBoardStyle.detail_company_logo}
                        />
                        <div
                          className={UserDashBoardStyle.detail_company_job_desc}
                        >
                          <h6
                            className={
                              UserDashBoardStyle.detail_company_job_title
                            }
                          >
                            {jobDetails.title}
                          </h6>
                          <h6
                            className={
                              UserDashBoardStyle.detail_company_job_time
                            }
                          >
                            {jobDetails.time} <span>hour ago</span>
                          </h6>
                          <div
                            className={UserDashBoardStyle.detail_company_offer}
                          >
                            <img
                              src={money}
                              alt={"money_icon"}
                              className={
                                UserDashBoardStyle.detail_company_logo_money
                              }
                            />
                            {jobDetails.salary}
                            <span
                              className={
                                UserDashBoardStyle.detail_company_logo_money_month
                              }
                            >
                              /Month
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          UserDashBoardStyle.detail_company_offer_apply
                        }
                      >
                        <div
                          className={
                            UserDashBoardStyle.detail_company_offer_fav
                          }
                        >
                          <img
                            src={fav_icon}
                            alt="Favorite Icon"
                            className={
                              UserDashBoardStyle.detail_company_offer_fav_image
                            }
                          />
                        </div>
                        <div
                          className={
                            UserDashBoardStyle.detail_company_offer_apply_button
                          }
                        >
                          <button
                            className={
                              UserDashBoardStyle.detail_company_offer_apply_button_style
                            }
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        UserDashBoardStyle.detail_company_location_details
                      }
                    >
                      <div
                        className={
                          UserDashBoardStyle.detail_company_location_details_job
                        }
                      >
                        <img
                          src={location}
                          alt={"location"}
                          className={
                            UserDashBoardStyle.detail_company_location_logo
                          }
                        />
                        <h6
                          className={
                            UserDashBoardStyle.detail_company_location_name
                          }
                        >
                          {jobDetails.location}
                          <span
                            className={UserDashBoardStyle.detail_preference_exp}
                          >
                            ({jobDetails.preference})
                          </span>
                        </h6>
                      </div>

                      <div className={UserDashBoardStyle.detail_company_exp}>
                        <img
                          src={fresherImage}
                          alt={"fresherImage"}
                          className={UserDashBoardStyle.detail_exp_logo}
                        />
                        <h6 className={UserDashBoardStyle.detail_exp_name}>
                          {jobDetails.exp}
                        </h6>
                      </div>

                      <div
                        className={UserDashBoardStyle.detail_company_exp_time}
                      >
                        <img
                          src={drop}
                          alt={"drop"}
                          className={UserDashBoardStyle.detail_exp_logo_time}
                        />
                        <h6 className={UserDashBoardStyle.detail_exp_name_time}>
                          {jobDetails.work}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Col>

          <Col xxl={6}>
            <div className={UserDashBoardStyle.detail_job_view_company_full}>
              <div className={UserDashBoardStyle.detail_job_link_part}>
                <Link to="/" className={UserDashBoardStyle.close_button}>
                  <IoCloseOutline />
                </Link>
              </div>
              <div
                className={UserDashBoardStyle.company_background_image}
                style={{ backgroundImage: `url(${jobDetails.background})` }}
              >
                <img
                  src={jobDetails.logo}
                  alt={"amazon_image"}
                  className={UserDashBoardStyle.detail_company_logo_user}
                />
              </div>

              <div className={UserDashBoardStyle.company_title}>
                {jobDetails.title}
              </div>

              <div className={UserDashBoardStyle.company_location}>
                {jobDetails.location}
              </div>

              <div className={UserDashBoardStyle.border_style}></div>

              <div className={UserDashBoardStyle.company_description}>
                <div className={UserDashBoardStyle.company_description_title}>
                  Description
                </div>
                <div
                  className={UserDashBoardStyle.company_description_requirement}
                >
                  {jobDetails.description}
                </div>
              </div>
              <div className={UserDashBoardStyle.company_skill}>
                <div className={UserDashBoardStyle.company_skill_title}>
                  Skills Required
                </div>
                <div className={UserDashBoardStyle.company_skill_list}>
                  <ul className={UserDashBoardStyle.company_skill_list_display}>
                    {Object.values(jobDetails.skills[0]).map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={UserDashBoardStyle.company_salary}>
                <div className={UserDashBoardStyle.company_salary_title}>
                  Salary
                </div>

                <div className={UserDashBoardStyle.company_salary_offer}>
                  {" "}
                  {jobDetails.offer}
                </div>
              </div>

              <div className={UserDashBoardStyle.company_education}>
                <div className={UserDashBoardStyle.company_education_title}>
                  Education
                </div>

                <div className={UserDashBoardStyle.company_education_offer}>
                  {" "}
                  {jobDetails.education}
                </div>
              </div>

              <div className={UserDashBoardStyle.company_responsibilities}>
                <div
                  className={UserDashBoardStyle.company_responsibilities_title}
                >
                  Responsibilities
                </div>

                <div
                  className={UserDashBoardStyle.company_responsibilities_offer}
                >
                  {" "}
                  {jobDetails.responsibilities}
                </div>
              </div>

              <div className={UserDashBoardStyle.company_how_apply}>
                <div className={UserDashBoardStyle.company_how_apply_title}>
                  How To Apply
                </div>

                <div className={UserDashBoardStyle.company_how_apply_offer}>
                  {" "}
                  {jobDetails.apply}
                </div>
              </div>

              <div className={UserDashBoardStyle.company_apply_button}>
                <button className={UserDashBoardStyle.company_apply_button_one}>
                  APPLY
                </button>
              </div>

              <div className={UserDashBoardStyle.company_save_later_button}>
                <button className={UserDashBoardStyle.company_apply_button_two}>
                  SAVE FOR LATER
                </button>
              </div>
            </div>
          </Col>

          <Col xxl={3}>
            <div className={UserDashBoardStyle.company_location_details}>
              <div className={UserDashBoardStyle.company_location_map}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.8919182852333!2d2.0837716!3d41.3547029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a499dd66e8a9ed%3A0x77d319df67d291b!2sJumpYard%20Barcelona!5e0!3m2!1sen!2sin!4v1712922634844!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="JumpYard Barcelona Location"
                  className={UserDashBoardStyle.company_location_map_design}
                ></iframe>
              </div>

              <div className={UserDashBoardStyle.company_about}>
                <div className={UserDashBoardStyle.company_about_section}>
                  <div
                    className={UserDashBoardStyle.company_about_section_title}
                  >
                    About
                  </div>

                  <div className={UserDashBoardStyle.company_about_desc}>
                    {jobDetails.about}
                  </div>
                  <div className={UserDashBoardStyle.company_review}>
                    <div className={UserDashBoardStyle.company_review_title}>
                      Review & Reviews
                    </div>

                    <div className={UserDashBoardStyle.company_summary_title}>
                      Summary
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
