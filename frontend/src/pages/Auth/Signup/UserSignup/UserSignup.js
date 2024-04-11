import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import google from "../../../../Assets/Google Logo.jpg";
import linkedin from "../../../../Assets/linkedin logo.jpg";
import apple from "../../../../Assets/Apple logo.jpg";
import axios from "axios";
import signupStyle from "../Signup.module.css";
import { useDispatch } from "react-redux";
import { handleUserLogin } from "../../../../Redux/ReduxSlice";
const Signup = () => {
  const dispatchTO = useDispatch();
  const [formData, setFormData] = useState({
    resume: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    phone_number: "",
    dob: "",
    country: "",
    state: "",
    showPassword1: false,
    showPassword2: false,
    college: "",
    course: "",
    course_start_date: "",
    course_end_date: "",
    percentage: "",
    job_title: "",
    company: "",
    company_start_date: "",
    company_end_date: "",
    userType: "user",
    step: 1, // Initial step
  });

  const nav = useNavigate();

  const currentYear = new Date().getFullYear();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle special fields separately
    if (name === "dob") {
      setFormData({ ...formData, dob: value });
    } else if (name === "course_start_date") {
      setFormData({ ...formData, course_start_date: value });
    } else if (name === "course_end_date") {
      setFormData({ ...formData, course_end_date: value });
    } else if (name === "company_start_date") {
      setFormData({ ...formData, company_start_date: value });
    } else if (name === "company_end_date") {
      setFormData({ ...formData, company_end_date: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log("Form details", formData);
  };

  const toggleShowPassword = (fieldName) => {
    setFormData({ ...formData, [fieldName]: !formData[fieldName] });
  };

  const handleResumeChange = (e) => {
    // Update the 'resume' state with the selected file
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const nextStep = (e) => {
    e.preventDefault();

    // Check if the current step requires the resume
    if (formData.step === 1) {
      if (!formData.resume) {
        toast.warning("Please upload your resume");
        return;
      } else {
        toast.success("Resume Uploaded Sucessfully");
        setFormData({ ...formData, step: formData.step + 1 });
      }
    }

    if (formData.step === 2) {
      // Check if all required fields are filled
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.conf_password
      ) {
        toast.warning("Please fill in all required fields");
        return;
      }
      // Check if passwords match
      if (formData.password !== formData.conf_password) {
        toast.warning("Passwords do not match");
        return;
      } else {
        toast.success("Personal Details Successfully filled");
        setFormData({ ...formData, step: formData.step + 1 });
      }
    }

    if (formData.step === 3) {
      // Check if all required fields are filled
      if (
        !formData.phone_number ||
        !formData.dob ||
        !formData.country ||
        !formData.state
      ) {
        toast.warning("Please fill in all required fields");
        return;
      } else if (!/^\d{10}$/.test(formData.phone_number)) {
        toast.warning("Phone number must contain exactly 10 digits");
        return;
      } else {
        // Calculate age from date of birth
        const dobDate = new Date(formData.dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dobDate.getDate())
        ) {
          age--;
        }

        // Check if age is at least 18
        if (age < 18) {
          toast.warning("You must be at least 18 years old to sign up");
          return;
        }

        toast.success("Basic Details Successfully filled");
        setFormData({ ...formData, step: formData.step + 1 });
      }
    }

    if (formData.step === 4) {
      // Check if all required fields are filled
      if (
        !formData.college ||
        !formData.course ||
        !formData.course_start_date ||
        !formData.course_end_date
      ) {
        toast.warning("Please fill in all required fields");
        return;
      }

      // Parse start and end dates
      const startDate = new Date(formData.course_start_date);
      const endDate = new Date(formData.course_end_date);

      // Check if start date is greater than end date
      if (startDate >= endDate) {
        toast.warning("Start date must be greater than end date");
        return;
      }

      // Check if difference between start and end date is at least one year
      const oneYear = 1000 * 60 * 60 * 24 * 365; // milliseconds in one year
      if (endDate - startDate < oneYear) {
        toast.warning(
          "Difference between start and end date must be at least one year"
        );
        return;
      }

      toast.success("Education Details Successfully filled");
      setFormData({ ...formData, step: formData.step + 1 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("dlsklslcl",formdata)
      const { name, email, password, resume, userType } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("resume", resume);
      formDataToSend.append("userType", userType);

      const response = await axios.post(
        "http://localhost:8080/api/signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success response
      const { token } = response.data;

      dispatchTO(handleUserLogin({ token, email, name, userType }));
      toast.success(`Welcome ${name}`);
      setTimeout(() => {
        nav("/");
      }, 1500);
    } catch (error) {
      // Handle error response
      if (error.response) {
        console.error("Error:", error.response.data);
        toast.warning("Internal Server Error");
      } else {
        console.error("Error:", error.message);
        toast.warning("Network Error");
      }
    }
  };

  const handleLogin = () => {
    nav("/user-login");
  };

  return (
    <>
      {/* first card */}

      <div className={signupStyle.signup_container}>
        {formData.step === 1 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>

              <div className={signupStyle.step_1_part_2}>
                <h3 className={signupStyle.upload_resume_heading}>
                  Upload Resume
                </h3>
                <Form onSubmit={nextStep}>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm="9">
                      <Form.Control
                        type="file"
                        name="resume"
                        onChange={handleResumeChange}
                      />
                    </Col>
                  </Form.Group>
                  <div className={signupStyle.step_button_container}>
                    <Button className={signupStyle.step_button} type="submit">
                      Save and Continue
                    </Button>
                  </div>
                </Form>
                <div className={signupStyle.forgot_style1}>
                  <span
                    onClick={handleLogin}
                    style={{ cursor: "pointer", fontSize: "14px" }}
                  >
                    Already have an account?
                    <span style={{ color: "rgba(35, 88, 251, 1)" }}>
                      Login here
                    </span>
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>OR</div>
                <ul className={signupStyle.login_social_list}>
                  <li className={signupStyle.social_list_item}>
                    <img
                      src={google}
                      alt="network-error"
                      className={signupStyle.social_image_google}
                    />
                  </li>

                  <li className={signupStyle.social_list_item}>
                    <img
                      src={linkedin}
                      alt="network-error"
                      className={signupStyle.social_image_linkedin}
                    />
                  </li>

                  <li className={signupStyle.social_list_item}>
                    <img
                      src={apple}
                      alt="network-error"
                      className={signupStyle.social_image}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {formData.step === 2 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_2_part_2}>
                <h4 style={{ paddingBottom: "10px" }}>Personal Information</h4>
                <div>
                  <Form>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />

                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email Id"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />

                    <div className={signupStyle.password_container}>
                      <div>
                        <Form.Control
                          type={formData.showPassword1 ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          className={signupStyle.personal_input_field}
                          required
                        />
                      </div>

                      <div>
                        <FontAwesomeIcon
                          icon={formData.showPassword1 ? faEyeSlash : faEye} // Use imported icon variables
                          onClick={() => toggleShowPassword("showPassword1")}
                          style={{ cursor: "pointer" }}
                          className={signupStyle.eye_icon}
                        />
                      </div>
                    </div>

                    <div className={signupStyle.password_container}>
                      <div>
                        <Form.Control
                          type={formData.showPassword2 ? "text" : "password"}
                          name="conf_password"
                          placeholder="Confirm Password"
                          onChange={handleChange}
                          className={signupStyle.personal_input_field}
                          required
                        />
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={formData.showPassword2 ? faEyeSlash : faEye} // Use imported icon variables
                          onClick={() => toggleShowPassword("showPassword2")}
                          style={{ cursor: "pointer" }}
                          className={signupStyle.eye_icon}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
                <div className={signupStyle.terms_container}>
                  <Form.Check type="checkbox" className="check_box" />
                  <div>
                    <div>
                      I have read and agree to the Puck recruiter{" "}
                      <span style={{ fontWeight: "500" }}>
                        Terms <br />
                        and Condition
                      </span>{" "}
                      and
                      <span style={{ fontWeight: "500" }}> Privacy Policy</span>
                    </div>
                  </div>
                </div>
                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={nextStep}
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.step === 3 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_2_part_2}>
                <h4 style={{ paddingBottom: "10px" }}>Basic Details</h4>
                <div>
                  <Form>
                    <Form.Control
                      type="number"
                      name="phone_number"
                      placeholder="Enter Mobile Number"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />

                    <DatePicker
                      name="dob"
                      selected={formData.dob}
                      onChange={(date) =>
                        setFormData({ ...formData, dob: date })
                      }
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      className="form-control"
                      placeholderText="DD/MM/YYYY"
                      required
                    />

                    <Form.Control
                      type="text"
                      name="country"
                      placeholder="Select Country"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />

                    <Form.Control
                      type="text"
                      name="state"
                      placeholder="Select State"
                      onChange={handleChange}
                      className={signupStyle.personal_input_field}
                      required
                    />
                  </Form>
                </div>
                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={nextStep}
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.step === 4 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_4_part_2}>
                <h4>Education Details</h4>
                <div>
                  <Form.Control
                    type="text"
                    placeholder="College/Universities"
                    name="college"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />

                  <Form.Control
                    type="text"
                    placeholder="Course"
                    name="course"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />
                </div>
                <div className={signupStyle.education_date_container}>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      Start Date
                    </button>
                    <DatePicker
                      name="course_start_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.course_start_date}
                      onChange={(date) =>
                        setFormData({ ...formData, course_start_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      required
                    />
                  </div>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      End Date
                    </button>
                    <DatePicker
                      name="course_end_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.course_end_date}
                      onChange={(date) =>
                        setFormData({ ...formData, course_end_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      required
                    />
                  </div>
                </div>
                <Form.Control
                  type="number"
                  placeholder="Percentage/CGPA"
                  name="percentage"
                  onChange={handleChange}
                  className={signupStyle.personal_input_field}
                  required
                />

                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={nextStep}
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.step === 5 && (
          <div className={signupStyle.step_container}>
            <div className={signupStyle.step_flex_container}>
              <div className={signupStyle.step_1_part_1}>
                <h1
                  className={` ${signupStyle.kumar_one_regular} ${signupStyle.step_1_banner_heading_signup}`}
                >
                  WELCOME <br />
                  BACK
                </h1>
                <div className={signupStyle.create_account_name_container}>
                  <h3>Create an Account</h3>
                  <div>
                    To keep connected with us please signup <br /> with your
                    personal info
                  </div>
                </div>
              </div>
              <div className={signupStyle.step_4_part_2}>
                <h4>Experience (Optional)</h4>
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Enter Job Title"
                    name="job_title"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />

                  <Form.Control
                    type="text"
                    placeholder="Enter Company"
                    name="company"
                    onChange={handleChange}
                    className={signupStyle.personal_input_field}
                    required
                  />
                </div>
                <div className={signupStyle.education_date_container}>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      Start Date
                    </button>
                    <DatePicker
                      name="company_start_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.company_start_date}
                      onChange={(date) =>
                        setFormData({ ...formData, company_start_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      required
                    />
                  </div>
                  <div className={signupStyle.date_container}>
                    <button className={signupStyle.date_buttons}>
                      End Date
                    </button>
                    <DatePicker
                      name="company_end_date"
                      dateFormat="dd/MM/yy"
                      selected={formData.company_end_date}
                      onChange={(date) =>
                        setFormData({ ...formData, company_end_date: date })
                      }
                      className={signupStyle.education_detail_start_date}
                      placeholderText="DD/MM/YY"
                      minDate={new Date("1970-01-01")} // Set minimum date to 1970-01-01
                      maxDate={new Date(currentYear, 11, 31)} // Set maximum date to the last day of the current year
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={44}
                      required
                    />
                  </div>
                </div>
                <div className={signupStyle.step_button_container}>
                  <Button
                    className={signupStyle.step_button}
                    onClick={handleSubmit}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
