import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import loginImage from "../../../../Assets/Login form Image.PNG";
import google from "../../../../Assets/Google Logo.jpg";
import linkedin from "../../../../Assets/linkedin logo.jpg";
import apple from "../../../../Assets/Apple logo.jpg";
import axios from "axios";
import LoginStyle from "../Login.module.css";
import { useDispatch } from "react-redux";
import { handleUserLogin } from "../../../../Redux/ReduxSlice";

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function UserLogin({ toggleLoginType, isHRLogin }) {
  const dispatchTO = useDispatch();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    step: 1,
  });

  const [name, setName] = useState("");

  const passwordRef = useRef(null);

  useEffect(() => {
    // Set focus to the password input field when step changes to 2
    if (formData.step === 2) {
      passwordRef.current.focus();
    }
  }, [formData.step]);
  
  useEffect(() => {
    // Fetch user's name based on their email
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/user?email=${formData.email}`
        );
        const userData = response.data;
        setName(userData.userDetails.name);
      } catch (error) {
        toast.error(`${error.message}`);
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

  const handleEnterKey = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (formData.step === 1) {
        await nextStep();
      } else {
        await handleSubmit(e);
      }
    }
  };

  const nextStep = async () => {
    if (formData.email) {
      try {
        const response = await axios.get(
          `${baseUrl}/user?email=${formData.email}`
        );
        const userData = response.data;
        setName(userData.name);
        setFormData({ ...formData, step: formData.step + 1 });
      } catch (error) {
        toast.error("Email not registered.");
      }
    } else {
      toast.error("Please fill in the email field.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { name, email, token, userType, savedJob, appliedJob, profileImage } =
        response.data;

      dispatchTO(
        handleUserLogin({ name, email, token, userType, savedJob, appliedJob, profileImage })
      );
      toast.success(`Welcome back, ${name}!`);
      nav("/");
    } catch (error) {
      toast.error("Invalid Credential");
    }
  };

  const handleSignup = () => {
    nav("/user-signup");
  };

  const handlePassword = () => {
    nav("/forgot-password");
  };

  return (
      <div onKeyDown={handleEnterKey}>
        {formData.step === 1 ? (
          <div className={LoginStyle.sub_container1}>
            <div className={LoginStyle.sub_container2}>
              <div className={LoginStyle.main_whole_container}>
                <div className={LoginStyle.part_first}>
                  <div>
                    <h1
                      className={`${LoginStyle.kumar_one_regular} ${LoginStyle.step_1_banner_heading_login}`}
                    >
                      <span style={{ color: "#0050D1" }}>HR</span> Connect
                      <div style={{ color: "#00296B" }}>Pro</div>
                    </h1>
                    <div>
                      <img
                        src={loginImage}
                        alt="network error"
                        className={LoginStyle.login_image}
                      />
                    </div>
                  </div>
                </div>

                <div className={LoginStyle.part_second}>
                  <div className={LoginStyle.sub_container3}>
                    <div>
                      <img
                        className={LoginStyle.sub_container3_imgstyl}
                        src="https://mackinlay.in/img/title_logo.png"
                        alt="not_loaded"
                      />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <span
                        style={{
                          borderBottom: isHRLogin
                            ? "none"
                            : "2px solid #FF0000",
                          cursor: "pointer",
                        }}
                      >
                        Job Seeker
                      </span>
                      <span
                        onClick={toggleLoginType}
                        style={{
                          color: isHRLogin ? "#FF0000" : "#00296B",
                          marginLeft: "10px",
                          borderBottom: isHRLogin
                            ? "2px solid #FF0000"
                            : "none",
                          cursor: "pointer",
                        }}
                      >
                        Employer
                      </span>
                    </div>

                    {/* <div className={LoginStyle.sub_container3_styl1}>LOGIN</div> */}
                  </div>
                  <div className={LoginStyle.sub_container_style}>
                    <div className="email_form">
                      <Form onSubmit={handleSubmit}>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email or phone"
                          className={LoginStyle.input_style}
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoFocus
                        />
                      </Form>
                    </div>
                    <div className={LoginStyle.forgot_style1}>
                      <Button
                        className={LoginStyle.next_style}
                        type="submit"
                        onClick={nextStep}
                      >
                        Next
                      </Button>
                    </div>
                    <div className={LoginStyle.forgot_style1}>
                      <span
                        onClick={handleSignup}
                        style={{ cursor: "pointer", fontSize: "14px" }}
                      >
                        Don't have an account?
                        <span style={{ color: "rgba(35, 88, 251, 1)" }}>
                          Create Account
                        </span>
                      </span>
                    </div>
                    <div style={{ textAlign: "center" }}>OR</div>
                    <ul className={LoginStyle.login_social_list}>
                      <li className={LoginStyle.social_list_item}>
                        <img
                          src={google}
                          alt="network-error"
                          className={LoginStyle.social_image_google}
                        />
                      </li>

                      <li className={LoginStyle.social_list_item}>
                        <img
                          src={linkedin}
                          alt="network-error"
                          className={LoginStyle.social_image_linkedin}
                        />
                      </li>

                      <li className={LoginStyle.socia_llist_item}>
                        <img
                          src={apple}
                          alt="network-error"
                          className={LoginStyle.social_image}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className={LoginStyle.sub_container5}>
              <div>
                <select className={LoginStyle.select_style}>
                  <option>English(United States)</option>
                  <option>English(United States2)</option>
                  <option>English(United States3)</option>
                </select>
              </div>
              <div className={LoginStyle.sub_container6}>
                <div className={LoginStyle.sub_container6_items}>Help</div>
                <div className={LoginStyle.sub_container6_items}>privacy</div>
                <div className={LoginStyle.sub_container6_items}>Terms</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={LoginStyle.sub_container1_style}>
            <div className={LoginStyle.sub_container2_pass}>
              <div className={LoginStyle.pass_main_container}>
                <div className={LoginStyle.pass_part_1}>
                  <h1
                    className={`${LoginStyle.kumar_one_regular} ${LoginStyle.step_1_banner_heading_login}`}
                  >
                    <span style={{ color: "#0050D1" }}>HR</span> Connect
                    <div style={{ color: "#00296B" }}>Pro</div>
                  </h1>
                  <div className={LoginStyle.user_login_detail}>
                    <div className={LoginStyle.user_name}>Hi {name}</div>
                    <div>
                      <select className={LoginStyle.manage_account}>
                        <option>{formData.email}</option>
                        <option>Manage Account</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={LoginStyle.pass_part_2}>
                  <div className="">
                    <div>
                      <img
                        className={LoginStyle.pass_company_logo}
                        src="https://mackinlay.in/img/title_logo.png"
                        alt="not_loaded"
                      />
                    </div>
                    <div className="">
                      <Form>
                        <div style={{ position: "relative" }}>
                          <input
                            type={formData.showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className={LoginStyle.password_input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            ref={passwordRef}
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
                        <span onClick={handlePassword} className="forgot_pass">
                          Forgot Password?
                        </span>
                      </div>
                      <div style={{ cursor: "pointer" }}>
                        <button
                          className={LoginStyle.login_button}
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
      </div>
  );
}

export default UserLogin;
