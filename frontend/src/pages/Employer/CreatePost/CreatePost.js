import React, { useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import pages from '../Pages.module.css';

export default function CreatePost() {
  const imgRef = useRef()
  // const [post setPost] = useState({
  //   post ='',
  //   postBio: ''
  // })

  return (
    <>
      <div className={pages.__create_Post_Page}>
        <header className={pages.__create_Post_Header}>
          <h1 style={{ fontSize: '40px' }}>Create Post</h1>
          <div className={pages.__dropdown}>
            <button className={pages.__dropBtn}>Choose Visibility :</button>
            <div className={pages.__dropdown_content}>
              <li>Latest</li>
              <li>Name</li>
              <li>City</li>
            </div>
          </div>
        </header>

        <div className={pages.__postDetails}>
          <div className={pages.__imgContainer}>
            <FontAwesomeIcon className={pages.__postImg} icon={faImage} />
            <label htmlFor="">drop your image here or browse</label>
            <input type="file" ref={imgRef} accept='image/*' name='' />
          </div>

          <form className={pages.__createPost_Form} action="">
            <div className={pages.__input_Grps}>
              <label htmlFor="">Job Title</label> <br />
              <input className={pages.__inputs} type="text" />
            </div>
            <div className={pages.__input_Grps}>
              <label htmlFor="">Job Description</label> <br />
              <input className={pages.__inputs} type="text" />
            </div>
            <div className={pages.__input_Grps}>
              <label htmlFor="">Employment Type</label> <br />
              <input className={pages.__inputs} type="text" />
            </div>
            <div className={pages.__input_Grps}>
              <label htmlFor="">Location</label> <br />
              <input className={pages.__inputs} type="text" />
            </div>
            <div className={pages.__input_Grps}>
              <label htmlFor="">Salary Range</label> <br />
              <input className={pages.__inputs} type="text" />
            </div>
            <div className={pages.__input_Grps}>
              <label htmlFor="">Skill Required</label> <br />
              <input className={pages.__inputs} type="text" />
            </div>
          </form>
        </div>

        <div className={pages.__buttons}>
          <button className={pages.__btn_Cancel}>Cancel</button>
          <button className={pages.__btn_Save}>Save & Preview</button>
        </div>

      </div>
    </>
  )
}
