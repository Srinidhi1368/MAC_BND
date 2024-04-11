import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import loginImage from "../../../../Assets/Login form Image.PNG";
import google from "../../../../Assets/Google Logo.jpg";
import linkedin from "../../../../Assets/linkedin logo.jpg";
import apple from "../../../../Assets/Apple logo.jpg";
import axios from "axios";
import hrLoginStyle from "../Login.module.css";
// import UserLogin from "../UserLogin/UserLogin";

import { useDispatch } from "react-redux";
import { handleUserLogin } from "../../../../Redux/ReduxSlice";
function HrLogin({ toggleLoginType, isHRLogin }) {
  const dispatchTO = useDispatch();
  // const [isHRLogin, setIsHRLogin] = useState(true);

  // const toggleLoginType = () => {
  //   setIsHRLogin(!isHRLogin);
  // };

  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    step: 1,
  });

  const [name, setName] = useState("");

  useEffect(() => {
    // Fetch user's name based on their email
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user?email=${formData.email}`
        );
        const userData = response.data;
        setName(userData.name);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    };

    if (formData.step === 2) {
      fetchUserData();
    }
  }, [formData.step, formData.email]);

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      localStorage.setItem("email", value);
    }
  };

  const nextStep = async () => {
    if (formData.email) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/hr/get-hr?email=${formData.email}`
        );
        const userData = response.data;
        setName(userData.name);
        setFormData({ ...formData, step: formData.step + 1 });
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        toast.warning("Email not registered.");
      }
    } else {
      toast.warning("Please fill in the email field.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/hr/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { name, email, token } = response.data;

      // Store user details in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      dispatchTO(
        handleUserLogin({
          token: token,
          email: email,
          name: name,
          userType: "employee",
        })
      );
      toast.success(`Welcome Back Recruiter, ${name}`);
      setTimeout(() => {
        nav("/");
      }, 1500);
    } catch (error) {
      console.error("Error:", error.response.data);
      toast.warning("Invalid Credential");
    }
  };

  const handlePassword = () => {
    nav("/hr/forgot-password");
  };

  return (
    <>
      {/* {isHRLogin ? (
        <UserLogin />
      ) : ( */}
      <>
        {formData.step === 1 ? (
          <div className={hrLoginStyle.sub_container1}>
            <div className={hrLoginStyle.sub_container2}>
              <div className={hrLoginStyle.main_whole_container}>
                <div className={hrLoginStyle.part_first}>
                  <div>
                    <h1
                      className={`${hrLoginStyle.kumar_one_regular} ${hrLoginStyle.step_1_banner_heading_login}`}
                    >
                      <span style={{ color: "#0050D1" }}>HR</span> Connect{" "}
                      <div style={{ color: "#00296B" }}>Pro</div>
                    </h1>
                    <div>
                      <img
                        src={loginImage}
                        alt="network error"
                        className={hrLoginStyle.login_image}
                      />
                    </div>
                  </div>
                </div>

                <div className={hrLoginStyle.part_second}>
                  <div className={hrLoginStyle.sub_container3}>
                    <div>
                      <img
                        className={hrLoginStyle.sub_container3_imgstyl}
                        src="https://mackinlay.in/img/title_logo.png"
                        alt="not_loaded"
                      />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <span
                        style={{
                          borderBottom: isHRLogin
                            ? "2px solid #FF0000"
                            : "none",
                          cursor: "pointer",
                        }}
                        onClick={toggleLoginType}
                      >
                        Job Seeker
                      </span>
                      <span
                        style={{
                          borderBottom: isHRLogin
                            ? "none"
                            : "2px solid #FF0000",
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                      >
                        Recruiter
                      </span>
                    </div>
                    <div className={hrLoginStyle.sub_container3_styl1}>
                      {" "}
                      HR LOGIN
                    </div>
                  </div>
                  <div className={hrLoginStyle.sub_container_style}>
                    <div className="email_form">
                      <Form onSubmit={handleSubmit}>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email or phone"
                          className={hrLoginStyle.input_style}
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form>
                    </div>
                    <div className={hrLoginStyle.forgot_style1}>
                      <Button
                        className={hrLoginStyle.next_style}
                        type="submit"
                        onClick={nextStep}
                      >
                        Next
                      </Button>
                    </div>
                    <div style={{ textAlign: "center", margin: "10px 0px" }}>
                      OR
                    </div>
                    <ul className={hrLoginStyle.login_social_list}>
                      <li className={hrLoginStyle.social_list_item}>
                        <img
                          src={google}
                          alt="network-error"
                          className={hrLoginStyle.social_image_google}
                        />
                      </li>

                      <li className={hrLoginStyle.social_list_item}>
                        <img
                          src={linkedin}
                          alt="network-error"
                          className={hrLoginStyle.social_image_linkedin}
                        />
                      </li>

                      <li className={hrLoginStyle.social_list_item}>
                        <img
                          src={apple}
                          alt="network-error"
                          className={hrLoginStyle.social_image}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className={hrLoginStyle.sub_container5}>
              <div>
                <select className={hrLoginStyle.select_style}>
                  <option>English(United States)</option>
                  <option>English(United States2)</option>
                  <option>English(United States3)</option>
                </select>
              </div>
              <div className={hrLoginStyle.sub_container6}>
                <div className={hrLoginStyle.sub_container6_items}>Help</div>
                <div className={hrLoginStyle.sub_container6_items}>privacy</div>
                <div className={hrLoginStyle.sub_container6_items}>Terms</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={hrLoginStyle.sub_container1_style}>
            <div className={hrLoginStyle.sub_container2_pass}>
              <div className={hrLoginStyle.pass_main_container}>
                <div className={hrLoginStyle.pass_part_1}>
                  <h1
                    className={`${hrLoginStyle.kumar_one_regular} ${hrLoginStyle.step_1_banner_heading_login}`}
                  >
                    <span style={{ color: "#0050D1" }}>HR</span> Connect{" "}
                    <div style={{ color: "#00296B" }}>Pro</div>
                  </h1>
                  <div className={hrLoginStyle.user_login_detail}>
                    <div className={hrLoginStyle.user_name}>Hi {name}</div>
                    <div>
                      <select className={hrLoginStyle.manage_account}>
                        <option>{formData.email}</option>
                        <option>Manage Account</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={hrLoginStyle.pass_part_2}>
                  <div className="">
                    <div>
                      <img
                        className={hrLoginStyle.pass_company_logo}
                        src="https://mackinlay.in/img/title_logo.png"
                        alt="not_loaded"
                      />
                    </div>
                    <div>
                      <Form>
                        <div style={{ position: "relative" }}>
                          <input
                            type={formData.showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className={hrLoginStyle.password_input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "58%",
                              right: "80px",
                              transform: "translateY(-20%)",
                              cursor: "pointer",
                            }}
                            onClick={handleShowPassword}
                          >
                            <FontAwesomeIcon
                              icon={formData.showPassword ? faEyeSlash : faEye}
                            />
                          </span>
                        </div>
                      </Form>
                    </div>

                    <div className="">
                      <div style={{ cursor: "pointer" }}>
                        <span
                          onClick={handlePassword}
                          className={hrLoginStyle.forgot_pass}
                        >
                          Forgot Password?
                        </span>
                      </div>
                      <div style={{ cursor: "pointer" }}>
                        <button
                          className={hrLoginStyle.login_button}
                          onClick={handleSubmit}
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      <ToastContainer />
    </>
  );
}

export default HrLogin;
