import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../../../../../Assets/logo.png";
import "./ResetPassword.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const nav = useNavigate();
  const { password } = formData;
  const { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/reset-password/${token}`,
        {
          password,
        }
      );

      if (response.status === 200) {
        // Inform the user about the password change
        toast.success("Your password has been changed successfully!");

        // Redirect after a short delay
        setTimeout(() => {
          // console.log("Redirecting to login page...");
          nav("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again later.");
    }
  };

  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  return (
    <>
      <div className="forgot-password-container">
        <div className="form-wrapper">
          <div className="logo-container">
            <img src={logo} alt="network-error" className="logo" />
          </div>
          <h2>Reset Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={formData.showPassword ? "text" : "password"}
                  value={formData.password}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="forgot_pass_input"
                />
                <Button variant="light" onClick={toggleShowPassword}>
                  {formData.showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-button">
              Submit
            </Button>

            <div className="login-link">
              Remembered your password? <Link to="/login">Login</Link>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ResetPassword;
