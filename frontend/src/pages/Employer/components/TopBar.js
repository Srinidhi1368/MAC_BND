import React from 'react'
// import axios from 'axios'
import layout from './RecruiterLayout.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMicrophone, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import Loader from '../../Common-Components/Loaders/Loader';
import { VscSettings } from "react-icons/vsc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  // const [loading, setLoading] = useState(false)
  // const [jobs, setJobs] = useState([]);
  // const [filteredJobs, setFilteredJobs] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const navigateTo = useNavigate()

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await axios.get('http://localhost:8080/api/jobs/All-jobs');
  //       setJobs(response.data.jobs);
  //       setFilteredJobs(response.data.jobs);
  //       setLoading(false)
  //     } catch (error) {
  //       console.error("Error: ", error);
  //     }
  //   };
  //   fetchJobs();
  // }, []);

  // Filter jobs based on search term
  // const handleSearch = (e) => {
  //   const searchTerm = e.target.value.toLowerCase();
  //   setSearchTerm(searchTerm);

  //   const filteredJobs = jobs.filter((job) => {
  //     return (
  //       job.title.toLowerCase().includes(searchTerm) ||
  //       job.description.toLowerCase().includes(searchTerm)
  //     );
  //   });
  //   setFilteredJobs(filteredJobs);
  // };

  return (
    <div className={layout.__topbar}>
      <div className={layout.__searchbar}>
        <FontAwesomeIcon className={layout.__topbar_Icon} icon={faMagnifyingGlass} />
        <input className={layout.__input} type="text" placeholder='search by keyword......' 
        // value={searchTerm} 
        // onChange={handleSearch} 
        />
        <FontAwesomeIcon className={layout.__topbar_Icon} icon={faMicrophone} />
      </div>
      <button onClick={()=>navigateTo('/addemployee')} className={layout.__btn_Add_Employee}> <FontAwesomeIcon icon={faUserPlus} /> Add Employee</button>
      <VscSettings className={layout.__btn_filter} style={{ color: 'white', fontSize: '25' }} />
      <IoIosNotificationsOutline className={layout.__btn_notfication} style={{ color: 'white', fontSize: '25' }} />

      {/* Search Results ------------ */}

    </div>
  )
}
