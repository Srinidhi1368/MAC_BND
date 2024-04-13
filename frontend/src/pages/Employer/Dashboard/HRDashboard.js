import React from 'react'
import pages from '../Pages.module.css';
import user from '../../../Assets/user.png'
import friday from '../../../Assets/friday.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
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
const monthName = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}

export default function HRDashboard() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day} ${monthName[month]}, ${year}`;

  return (
    <div className={pages.__dashboard_Page}>
      <header className={pages.__dashboard_Header}>
        <h2>Dashboard</h2>
        <div className={pages.__dropdown}>
          <button className={pages.__dropBtn}>Sort By :</button>
          <ul className={pages.__dropdown_content}>
            <li>Latest</li>
            <li>Name</li>
            <li>City</li>
          </ul>
        </div>
      </header>

      <div className={pages.__post_Impression}>
        <header className={pages.__postImpression_Header}>
          <h3>Post Impressions</h3>
          <p className=''>see all</p>
        </header>

        <Carousel className={pages.__post_Section}
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px">

          <div className={pages.__posts}>
            <div className={pages.__postTitle}>
              <img className={pages.__postLogo} src={user} alt='' />
              <p>
                UX Designer
                <span style={{ fontSize: "13px", display:'block' }}>Posted 2 days ago</span>
              </p>
              <FontAwesomeIcon className={pages.__btn_PostOpen} icon={faArrowUpRightFromSquare} />
            </div>
            <div className={pages.__post_body}>
              <span>Bengaluru</span>
              <span>3 years exp.</span>
            </div>
            <div className={pages.__post_Footer}>
              <span>45</span> applications
            </div>
          </div>

          <div className={pages.__posts}>
            <div className={pages.__postTitle}>
              <img className={pages.__postLogo} src={user} alt='' />
              <p>
                Product Designer
                <span style={{ fontSize: "13px", display:'block' }}>Posted 2 days ago</span>
              </p>
              <FontAwesomeIcon className={pages.__btn_PostOpen} icon={faArrowUpRightFromSquare} />
            </div>
            <div className={pages.__post_body}>
              <span>Bengaluru</span>
              <span>3 years exp.</span>
            </div>
            <div className={pages.__post_Footer}>
              <span>10</span> applications
            </div>
          </div>

          <div className={pages.__posts}>
            <div className={pages.__postTitle}>
              <img className={pages.__postLogo} src={user} alt='' />
              <p>
                IOS Developer
                <span style={{ fontSize: "13px", display:'block' }}>Posted 2 days ago</span>
              </p>
              <FontAwesomeIcon className={pages.__btn_PostOpen} icon={faArrowUpRightFromSquare} />
            </div>
            <div className={pages.__post_body}>
              <span>Bengaluru</span>
              <span>3 years exp.</span>
            </div>
            <div className={pages.__post_Footer}>
              <span>102</span> applications
            </div>
          </div>

          <div className={pages.__posts}>
            <div className={pages.__postTitle}>
              <img className={pages.__postLogo} src={user} alt='' />
              <p>
                UX Designer
                <span style={{ fontSize: "13px", display:'block' }}>Posted 2 days ago</span>
              </p>
              <FontAwesomeIcon className={pages.__btn_PostOpen} icon={faArrowUpRightFromSquare} />
            </div>
            <div className={pages.__post_body}>
              <span>Bengaluru</span>
              <span>3 years exp.</span>
            </div>
            <div className={pages.__post_Footer}>
              <span>40</span> applications
            </div>
          </div>

          <div className={pages.__posts}>
            <div className={pages.__postTitle}>
              <img className={pages.__postLogo} src={user} alt='' />
              <p>
                IOS Developer
                <span style={{ fontSize: "13px", display:'block' }}>Posted 2 days ago</span>
              </p>
              <FontAwesomeIcon className={pages.__btn_PostOpen} icon={faArrowUpRightFromSquare} />
            </div>
            <div className={pages.__post_body}>
              <span>Bengaluru</span>
              <span>3 years exp.</span>
            </div>
            <div className={pages.__post_Footer}>
              <span>102</span> applications
            </div>
          </div>

          <div className={pages.__posts}>
            <div className={pages.__postTitle}>
              <img className={pages.__postLogo} src={user} alt='' />
              <p>
                Product Designer
                <span style={{ fontSize: "13px", display:'block' }}>Posted 2 days ago</span>
              </p>
              <FontAwesomeIcon className={pages.__btn_PostOpen} icon={faArrowUpRightFromSquare} />
            </div>
            <div className={pages.__post_body}>
              <span>Bengaluru</span>
              <span>3 years exp.</span>
            </div>
            <div className={pages.__post_Footer}>
              <span>10</span> applications
            </div>
          </div>
        </Carousel>
      </div>

      <div className={pages.__latest_Post}>
        <header className={pages.__latest_Post_Header}>
          <h3>Latest Post</h3>
          <p className=''>see all</p>
        </header>

        <section className={pages.__latestPosts}>

          <div className={pages.__user_Post}>
            <header className={pages.__user_Post_Header}>
              <img className={pages.__user_PostImg} src={user} alt="" />
              <div>
                <h3 style={{ fontSize: '20px' }}>Sakshita Patel</h3>
                <span className={pages.__user_Position}>HR Executive</span>
              </div>
            </header>

            <div className={pages.__user_Post_body}>
              <img className={pages.__latestPosts_Img} src={friday} alt="" />
              <p className={pages.__user_Post_info}>Hey everyone, it's that time of the week again - FRIDAY! 🚀 Let's take a breather from the code and embrace some fun vibes. Here are a few ways to celebrate the end of the week.</p>
            </div>
            <footer className={pages.__user_Post_Footer}>
              <h6 className={pages.__user_Post_Timestamp}>{formattedDate}</h6>
              <button className={pages.__btn_Repost}>Repost</button>
            </footer>
          </div>

        </section>
      </div>

    </div>
  )
}
