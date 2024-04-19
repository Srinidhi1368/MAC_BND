import React, { useEffect, useState } from 'react'
import pages from '../Pages.module.css';
import user from '../../../Assets/user.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios"
import { format } from 'date-fns';
import Loader from '../../Common-Components/Loaders/Loader';
import { CalculateTimeAgo } from '../../Common-Components/TimeAgo';
import toast from "react-hot-toast";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function HRDashboard() {
  const [jobPost, setJobPost] = useState([])
  const [sortedJob, setSortedJob] = useState([])
  const [selectedSort, setSelectedSort] = useState('Sort By')
  const [loading, setLoading] = useState(false)

  const formattedDate = (timestamp) => {
    if (!timestamp) {
      return 'N/A';
    }
    return format(new Date(timestamp), 'do MMMM, yyyy');
  };

  const loadJobPost = () => {
    setLoading(true)
    axios.get(`http://localhost:8080/api/jobs/get-job/${localStorage.getItem("email")}`)
      .then(response => {
        setJobPost(response.data.jobs)
        setSortedJob(response.data.jobs.toSorted((a, b) => a.createdAt - b.createdAt));
        setLoading(false)
      })
  }
  useEffect(loadJobPost, [])

  const handleSortBy = (e) => {
    setSelectedSort(e.target.value)
    const sorted = [...jobPost]
    setSortedJob(sorted);
    switch (e.target.value) {
      case 'latest':
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'name':
        sorted.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
        break;
      case 'city':
        sorted.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        break;
    }
  }

  const handleDelete = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/api/jobs/delete-job/${postID}`)
        .then((response) => {
          if (response.data.success) {
            toast.success(`Job deleted successfully`)
            loadJobPost()
          }
        })
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  }

  return (
    <div className={pages.__dashboard_Page}>
      {
        loading ? <Loader /> : <>
          <header className={pages.__dashboard_Header}>
            <h2>Dashboard</h2>
            <div className={pages.__dropdown}>
              <select className={pages.selectOption} value={selectedSort} onChange={handleSortBy}>
                <option className={pages.options} value="">Sort By</option>
                <option value="latest">Latest</option>
                <option value="name">Name</option>
                <option value="city">City</option>
              </select>
            </div>
          </header>

          <div className={pages.__post_Impression}>
            <header className={pages.__postImpression_Header}>
              <h3>Post Impressions</h3>
              {/* <p className=''>see all</p> */}
            </header>
            <Carousel className={pages.__post_Section}
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px">
              {
                jobPost.length > 0 && jobPost.map((data) => {
                  return <div className={pages.__posts} key={data._id} >
                    <div className={pages.__postTitle}>
                      <img className={pages.__postLogo} src={data.jobPoster} alt='' />
                      <p>
                        {data.jobTitle.slice(0, 15)}...
                        <span style={{ fontSize: "13px", display: 'block' }}>
                          <CalculateTimeAgo time={data.createdAt} />
                        </span>
                      </p>
                      <FontAwesomeIcon className={pages.__btn_PostOpen} icon={faArrowUpRightFromSquare} />
                    </div>
                    <div className={pages.__post_body}>
                      <span>{data.location}</span>
                      <span>{data.jobExperience}</span>
                    </div>
                    <div className={pages.__post_Footer}> <span>{data.totalApplication ? data.totalApplication : 0}</span> application(s)  </div>
                  </div>
                })
              }
            </Carousel>
          </div>

          <div className={pages.__latest_Post}>
            <header className={pages.__latest_Post_Header}>
              <h3>Latest Post</h3>
              {/* <p className=''>see all</p> */}
            </header>
            <section className={pages.__latestPosts}>
              {
                sortedJob.map((jobs) => {
                  return (
                    <div className={pages.__user_Post} key={jobs._id}>
                      <header className={pages.__user_Post_Header}>
                        <img className={pages.__user_PostImg} src={user} alt="" />
                        <div>
                          <h3 style={{ fontSize: '20px' }}>{localStorage.name}</h3>
                          <span className={pages.__user_Position}>HR Executive</span>
                        </div>
                        <FontAwesomeIcon icon={faTrash} title='delete post' className={pages.createPost_BtnDelete} onClick={() => handleDelete(jobs._id)} />
                      </header>
                      <div className={pages.__user_Post_body}>
                        <img className={pages.__latestPosts_Img} src={jobs.jobPoster} alt="" />
                        <p className={pages.__user_Post_info}>{jobs.jobDescription}</p>
                      </div>
                      <footer className={pages.__user_Post_Footer}>
                        <h6 className={pages.__user_Post_Timestamp}>{formattedDate(jobs.createdAt)}</h6>
                        <button className={pages.__btn_Repost}>Repost</button>
                      </footer>
                    </div>
                  )
                })
              }
            </section>
          </div>
        </>
      }
    </div>
  )
}
