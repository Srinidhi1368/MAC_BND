import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import DashBoardStyle from "./DashboardMain.module.css";
import Data from "./MatchedJob";
import { Link } from "react-router-dom";


export default function JobSeekerSwiper() {
  const colors = [
    "rgba(203, 240, 251, 1)",
    "rgba(249, 187, 187, 1)",
    "rgba(225, 176, 255, 1)",
  ];

  return (
    <Swiper
      className={DashBoardStyle.job_swiper}
      slidesPerView={4}
      spaceBetween={20}
    >
      {Data.map((item, index) => (
        <SwiperSlide key={index}>
          <Link to={`/job/${item.id}`}>
            <div
              className={DashBoardStyle.matched_job_full}
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <img
                src={item.image}
                alt={item.title}
                className={DashBoardStyle.company_logo}
              />
              <h6 className={DashBoardStyle.company_title}>{item.title}</h6>
              <h6 className={DashBoardStyle.company_location}>
                {item.location}
              </h6>
              <h6 className={DashBoardStyle.company_preference}>
                ({item.preference})
              </h6>
              <h6 className={DashBoardStyle.company_apply}>
                {item.days} day ago
                <span className={DashBoardStyle.apply}> Apply </span>
              </h6>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
