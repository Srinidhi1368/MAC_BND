import React from "react";
import Interviewcss from "./Interview.module.css";
import maleImage from '../../../Assets/Male-Image.png'
import { IoStar } from "react-icons/io5";
import { BsPersonVideo } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { BsFileImage } from "react-icons/bs";
import { useState } from "react";

function Interview() {
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore... et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
  );

  const handleDescriptionChange = (event) => {
    const content = event.target.value;
    setDescription(content);
  };

  const sliceDescription = () => {
    const words = description.split(" ");
    const slicedContent = words.slice(0, 15).join(" ");
    return slicedContent;
  };

  return (
    <div className={Interviewcss.main_containers}>
      {/* upper container of Candidate profile */}
      <div className={Interviewcss.uppercontainer}>
        <div className={Interviewcss.uppercontainer_left}>
          <img
            className={Interviewcss.upper_cont_img}
            src={maleImage}
            alt="network-error"
          />


          <div className={Interviewcss.uppercontainer_left1}>
            <p>Charle Kristen</p>
            <p>
              <IoStar className={Interviewcss.star} />
              4.0
            </p>
          </div>
        </div>
        <div className={Interviewcss.uppercontainer_right}>
          <p>Candidate ID:</p>
          <p>12345678</p>
        </div>
      </div>
      <hr className={Interviewcss.horizontal_line}></hr>

      {/* Form fill up for Candidate */}
      <div className={Interviewcss.formMain_cont}>
        <div className={Interviewcss.formMain_cont1}>
          <div className={Interviewcss.formSub_con1}>
            <label for="interview-type" className={Interviewcss.box}>
              <BsPersonVideo />
              Interview type{" "}
            </label>
            <br></br>
            <select id="interview-type" className={Interviewcss.boxes}>
              <option value=""></option>
              <option value="walk">Walk-in-drive</option>
              <option value="virtual">Virtual</option>
              <option value="face">Face to face</option>
            </select>
          </div>
          {/* <div className={`${Interviewcss.formSub_con} ${Interviewcss.formSub_contain}`}>
            <label for='description' className={Interviewcss.box}><GrTextAlignFull />Description</label>
            <textarea id='description' className={`${Interviewcss.description_input} ${Interviewcss.des}`}>
              At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies
            </textarea>
          </div> */}

          <div
            className={`${Interviewcss.formSub_con} ${Interviewcss.formSub_contain}`}
          >
            <label htmlFor="description" className={Interviewcss.box}>
              <GrTextAlignFull />
              Description
            </label>
            <textarea
              id="description"
              className={`${Interviewcss.description_input} ${Interviewcss.des}`}
              value={sliceDescription()} // Set the value of textarea to sliced content
              onChange={handleDescriptionChange} // Handle changes in the textarea
            >
              more
            </textarea>
          </div>
        </div>

        <div className={Interviewcss.formMain_cont2}>
          <div className={Interviewcss.formSub_con}>
            <label for="interview-date" className={Interviewcss.box}>
              <FaRegCalendarAlt />
              Interview date
            </label>
            <input
              type="date"
              id="interview-date"
              className={Interviewcss.description_input}
            ></input>
          </div>
          <div className={Interviewcss.formSub_con}>
            <label for="interview-time" className={Interviewcss.box}>
              <MdAccessTime />
              Interview time
            </label>
            <input
              type="time"
              id="interview-time"
              className={Interviewcss.description_input}
            ></input>
          </div>
        </div>

        <div className={Interviewcss.formMain_cont3}>
          <div className={Interviewcss.formSub_con}>
            <label for="interview-name" className={Interviewcss.box}>
              <FaUser />
              Interviewer name
            </label>
            <input
              type="text"
              id="interview-name"
              className={Interviewcss.description_input}
            ></input>
          </div>
          <div className={Interviewcss.formSub_con}>
            <label for="interview-loaction" className={Interviewcss.box}>
              <IoLocationOutline />
              Location
            </label>
            <input
              type="location"
              id="interview-location"
              className={Interviewcss.description_input}
            ></input>
          </div>
        </div>
      </div>

      {/* uplad file container */}
      <div>
        <p className={Interviewcss.fileupload}>
          <IoMdAttach />
          Attachments
        </p>
        <div className={Interviewcss.filebox}>
          <BsFileImage className={Interviewcss.imgs} />
          <span> Drop you image here or</span>
          <label for="file">
            <span className={Interviewcss.f}>browse</span>
          </label>

          <input type="file" id="file"></input>
        </div>
      </div>
      <div className={Interviewcss.last_container}>
        <button className={Interviewcss.cancel_btn}>Cancel</button>
        <button className={Interviewcss.Interview_btn}>
          Schedule Interview
        </button>
      </div>
    </div>
  );
}

export default Interview;
