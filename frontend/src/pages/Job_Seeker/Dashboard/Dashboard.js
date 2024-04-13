import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashBoardStyle from "./Dashboard.module.css";
import JobSeekerSwiper from "./Job_Swiper";
import fav_icon from "./images/favoutite.png";
import money from "./images/money-stack.png";
import location from "./images/ep_location.png";
import fresherImage from "./images/mdi_book-education-outline.png";
import drop from "./images/Vector.png";
import Data from "./MatchedJob";

function Dashboard() {
  return (
    <section>
      <div className={DashBoardStyle.inner_dashboard}>
        <div className={DashBoardStyle.title_sort}>
          <Container>
            <Row className="justify-content-evenly">
              <Col xxl={12}>
                <div className={DashBoardStyle.title_total}>
                  <div className={DashBoardStyle.title_dashboard}>
                    <h1 className={DashBoardStyle.title_name}>Dashboard</h1>
                  </div>
                  <div className={DashBoardStyle.sort_by}>
                    <h5 className={DashBoardStyle.sort_order}>
                      Sort By:
                      <select id={DashBoardStyle.sort_dropdown}>
                        <option value={DashBoardStyle.latest}>Latest</option>
                        <option value={DashBoardStyle.oldest}>Oldest</option>
                      </select>
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-evenly">
              <Col xxl={12}>
                <div className={DashBoardStyle.jobList_total}>
                  <div className={DashBoardStyle.matches_seeAll}>
                    <div className={DashBoardStyle.match_title}>
                      Best Matches for you
                    </div>

                    <div className={DashBoardStyle.seeAll}>See all</div>
                  </div>

                  <div className={DashBoardStyle.matched_job}>
                    <JobSeekerSwiper />
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-evenly">
              <Col xxl={12}>
                <div className={DashBoardStyle.rec_seeAll}>
                  <div className={DashBoardStyle.rec_title}>
                    Recommended Jobs
                  </div>

                  <div className={DashBoardStyle.rec_seeAll}>See all</div>
                </div>
                {Data.map((item, index) => (
                  <div
                    className={DashBoardStyle.rec_list_view_full}
                    key={index}
                  >
                    <div className={DashBoardStyle.rec_list_view}>
                      <div className={DashBoardStyle.rec_company_detail}>
                        <img
                          src={item.image}
                          alt={"amazon_image"}
                          className={DashBoardStyle.rec_company_logo}
                        />
                        <div className={DashBoardStyle.rec_company_job_desc}>
                          <h6 className={DashBoardStyle.rec_company_job_title}>
                            {item.title}
                          </h6>
                          <h6 className={DashBoardStyle.rec_company_job_time}>
                            {item.time} <span>hour ago</span>
                          </h6>
                        </div>
                      </div>
                      <div className={DashBoardStyle.rec_company_offer}>
                        <img
                          src={money}
                          alt={"money_icon"}
                          className={DashBoardStyle.rec_company_logo_money}
                        />
                        {item.salary}
                        <span
                          className={
                            DashBoardStyle.rec_company_logo_money_month
                          }
                        >
                          /Month
                        </span>
                      </div>
                      <div className={DashBoardStyle.rec_company_offer_apply}>
                        <div className={DashBoardStyle.rec_company_offer_fav}>
                          <img
                            src={fav_icon}
                            alt="Favorite Icon"
                            className={
                              DashBoardStyle.rec_company_offer_fav_image
                            }
                          />
                        </div>
                        <div
                          className={
                            DashBoardStyle.rec_company_offer_apply_button
                          }
                        >
                          <button
                            className={
                              DashBoardStyle.rec_company_offer_apply_button_style
                            }
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={DashBoardStyle.rec_company_location_details}
                    >
                      <div
                        className={
                          DashBoardStyle.rec_company_location_details_job
                        }
                      >
                        <img
                          src={location}
                          alt={"location"}
                          className={DashBoardStyle.rec_company_location_logo}
                        />
                        <h6
                          className={DashBoardStyle.rec_company_location_name}
                        >
                          {item.location}

                          <span
                            className={DashBoardStyle.company_preference_exp}
                          >
                            ({item.preference})
                          </span>
                        </h6>
                      </div>

                      <div className={DashBoardStyle.rec_company_exp}>
                        <img
                          src={fresherImage}
                          alt={"fresherImage"}
                          className={DashBoardStyle.rec_exp_logo}
                        />
                        <h6 className={DashBoardStyle.rec_exp_name}>
                          {item.exp}
                        </h6>
                      </div>

                      <div className={DashBoardStyle.rec_company_exp_time}>
                        <img
                          src={drop}
                          alt={"drop"}
                          className={DashBoardStyle.rec_exp_logo_time}
                        />
                        <h6 className={DashBoardStyle.rec_exp_name_time}>
                          {item.work}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
