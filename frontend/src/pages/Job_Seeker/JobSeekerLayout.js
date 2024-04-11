import React, { useEffect, useState } from "react";
import SideNavbar from "./components/SideNavBar/SideNavbar";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import JobSeekerStyle from "./JobSeeker.module.css";
import { CiSearch } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { IoIosNotificationsOutline } from "react-icons/io";
function JobSeekerLayout() {
  const { pathname } = useLocation();
  const navigateTO = useNavigate();

  useEffect(() => {
    if (
      pathname === "/" ||
      (pathname !== "/assessment" &&
        pathname !== "/analytics" &&
        pathname !== "/myjobs" &&
        pathname !== "/myresume" &&
        pathname !== "/application" &&
        pathname !== "/interviews" &&
        pathname !== "/settings" &&
        pathname !== "/assessment-Instructions" &&
        pathname !== "/assessment-test" &&
        pathname !== "/assessment-result")
    ) {
      navigateTO("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <section className={JobSeekerStyle.JobSeeker_Layout_Container}>
      <div className={JobSeekerStyle.LayoutContainer__LeftSideContainer}>
        <SideNavbar />
      </div>
      <div className={JobSeekerStyle.LayoutContainer__RightSideContainer}>
        <header
          className={JobSeekerStyle.RightSideContainer__topHeaderContainer}
        >
          <DashboardTopComponent />
        </header>

        <div className={JobSeekerStyle.__OutletContainer}>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default JobSeekerLayout;

// Topnavbar Components

function DashboardTopComponent() {
  const [isListening, setIsListening] = useState(false);
  const toggleMicListening = (e) => {
    e.preventDefault();
    setIsListening(!isListening);
  };

  return (
    <div className={JobSeekerStyle.Dashboard_TopHeader_Container}>
      <div className={JobSeekerStyle.searchFormContainer}>
        <form className={JobSeekerStyle.DashboardSearchBarBox}>
          <div className={JobSeekerStyle.SearchInputBox}>
            <div className={JobSeekerStyle.SearchICONBox}>
              <CiSearch className={JobSeekerStyle.SearchICON} />
            </div>
            <input
              type="text"
              name="searchText"
              id="searchText"
              autoComplete="off"
              className={JobSeekerStyle.SearchInput}
              placeholder="Job tittle, keyword, company"
            />
          </div>

          <div className={JobSeekerStyle.SearchSelectBox}>
            <div className={JobSeekerStyle.SearchICONBox}>
              <TiLocation className={JobSeekerStyle.SearchICON} />
            </div>
            <select
              name="Location"
              id="Location"
              className={JobSeekerStyle.SearchSelectInput}
            >
              <option className={JobSeekerStyle.SeachSelectOPTION} value="">
                Select your location
              </option>
              <option className={JobSeekerStyle.SeachSelectOPTION} value="">
                Bihar
              </option>
            </select>

            {isListening ? (
              <IoMicOutline
                className={JobSeekerStyle.Search_MICICON}
                onClick={toggleMicListening}
              />
            ) : (
              <IoMicOffOutline
                className={JobSeekerStyle.Search_MICICON}
                onClick={toggleMicListening}
              />
            )}
          </div>
        </form>
      </div>

      <div className={JobSeekerStyle.FilterAndNotificationBox}>
        <VscSettings className={JobSeekerStyle.filterBox_ICON} />

        <IoIosNotificationsOutline className={JobSeekerStyle.filterBox_ICON} />
      </div>
    </div>
  );
}
