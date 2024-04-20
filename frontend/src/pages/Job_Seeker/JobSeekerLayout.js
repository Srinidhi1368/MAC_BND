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
import Filter from "./components/FilterBox/Filter";
import {
  handleSetFilterData,
  handleRemoveFilterData,
  handleSearchData,
} from "../../Redux/ReduxFilterSlice";
import { useDispatch } from "react-redux";
function JobSeekerLayout() {
  const { pathname } = useLocation();
  const navigateTO = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (pathname === "/") {
      navigateTO("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const [ToggleFilter, setToggleFilter] = useState(false);

  const handleFilterOnchange = (e) => {
    if (e.target.checked) {
      dispatch(
        handleSetFilterData({
          name: e.target.name,
          value: e.target.value,
        })
      );
    } else {
      dispatch(
        handleRemoveFilterData({
          name: e.target.name,
          value: e.target.value,
        })
      );
    }
  };

  const handleToogleFilter = (e) => {
    setToggleFilter(!ToggleFilter);
  };

  return (
    <section className={JobSeekerStyle.JobSeeker_Layout_Container}>
      <div className={JobSeekerStyle.LayoutContainer__LeftSideContainer}>
        <SideNavbar />
      </div>

      <div className={JobSeekerStyle.LayoutContainer__RightSideContainer}>
        <header
          className={JobSeekerStyle.RightSideContainer__topHeaderContainer}
        >
          <DashboardTopComponent
            CBOnchange={handleFilterOnchange}
            CbToggle={handleToogleFilter}
          />
        </header>

        <div className={JobSeekerStyle.__OutletContainer}>
          <Outlet />
        </div>
      </div>

      {ToggleFilter && (
        <Filter
          handleOnChange={handleFilterOnchange}
          CbToggle={handleToogleFilter}
        />
      )}
    </section>
  );
}

export default JobSeekerLayout;

// Topnavbar Components

function DashboardTopComponent({ CbToggle }) {
  const [isListening, setIsListening] = useState(false);
  const [searhOption, setSearchOption] = useState({
    searchText: "",
    Location: "",
  });
  const dispatch = useDispatch();

  const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition

  recognition.continuous = false; // Enable continuous listening
  recognition.lang = "en-US"; // Set the language for speech recognition

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setSearchOption({...searhOption, "searchText" :transcript});
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  const toggleMicListening = (e) => {
    e.preventDefault();
    if (isListening) {
      recognition.stop(); // Stop speech recognition if it's currently listening
      setIsListening(false);
    } else {
      recognition.start(); // Start speech recognition
      setIsListening(true);
    }
  };

  const allCities = [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Itanagar",
    "Naharlagun",
    "Pasighat",
    "Namsai",
    "Ziro",
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
    "Tinsukia",
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Nalanda",
    "Raipur",
    "Bhilai",
    "Bilaspur",
    "Korba",
    "Durg",
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Mapusa",
    "Ponda",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Faridabad",
    "Gurgaon",
    "Panipat",
    "Ambala",
    "Hisar",
    "Shimla",
    "Manali",
    "Dharamshala",
    "Kullu",
    "Mandi",
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
    "Deoghar",
    "Bangalore",
    "Mysore",
    "Hubli",
    "Mangalore",
    "Belgaum",
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Bhopal",
    "Indore",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Imphal",
    "Thoubal",
    "Kakching",
    "Lilong",
    "Ukhrul",
    "Shillong",
    "Tura",
    "Jowai",
    "Nongpoh",
    "Baghmara",
    "Aizawl",
    "Lunglei",
    "Saiha",
    "Champhai",
    "Kolasib",
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Tuensang",
    "Wokha",
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Brahmapur",
    "Sambalpur",
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Patiala",
    "Bathinda",
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Ajmer",
    "Gangtok",
    "Namchi",
    "Gyalshing",
    "Mangan",
    "Singtam",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Ramagundam",
    "Agartala",
    "Dharmanagar",
    "Udaipur",
    "Belonia",
    "Kailashahar",
    "Lucknow",
    "Kanpur",
    "Agra",
    "Varanasi",
    "Meerut",
    "Dehradun",
    "Haridwar",
    "Rishikesh",
    "Nainital",
    "Mussoorie",
    "Kolkata",
    "Howrah",
    "Asansol",
    "Siliguri",
    "Durgapur",
    "Port Blair",
    "Car Nicobar",
    "Mayabunder",
    "Bamboo Flat",
    "Garacharma",
    "Chandigarh",
    "Daman",
    "Silvassa",
    "Kavaratti",
    "Agatti",
    "Andrott",
    "Minicoy",
    "New Delhi",
    "Gurgaon",
    "Noida",
    "Faridabad",
    "Ghaziabad",
    "Pondicherry",
    "Karaikal",
    "Mahe",
    "Yanam",
  ];

  const handleSearchInputChange = (e) => {
    setSearchOption({...searhOption, [e.target.name] : e.target.value});
  };

  useEffect(() => {
    const setTextTimeOut = setTimeout(() => {
      if (searhOption.searchText || searhOption.Location) {
        dispatch(handleSearchData(searhOption));
      }else{
        dispatch(handleSearchData(searhOption));
      }
    }, 1000);
    return () => clearTimeout(setTextTimeOut);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searhOption]);


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
              onChange={handleSearchInputChange}
              value={searhOption.searchText}
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
              onChange={handleSearchInputChange}
            >
              <option className={JobSeekerStyle.SeachSelectOPTION} value="">
                Select your location
              </option>

              {allCities.map((city, index) => {
                return (
                  <option
                    key={index}
                    className={JobSeekerStyle.SeachSelectOPTION}
                    value={city}
                  >
                    {city}
                  </option>
                );
              })}
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
        <VscSettings
          className={JobSeekerStyle.filterBox_ICON}
          onClick={CbToggle}
        />

        <IoIosNotificationsOutline className={JobSeekerStyle.filterBox_ICON} />
      </div>
    </div>
  );
}
