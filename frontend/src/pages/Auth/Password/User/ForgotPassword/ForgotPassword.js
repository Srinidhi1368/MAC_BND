import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../../Assets/logo.png";
import "./ForgotPassword.css";
import toast from 'react-hot-toast';
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const nav = useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/forgot-password", {
        email,
      });
  
      if (response.data.status) {
        toast.success("Check your email to reset your password");
  
        setTimeout(() => {
          nav('/login');
        }, 1500); 
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to initiate password reset. Please try again later.");
    }
  };
  

  return (
    <>
      <div className="forgot-password-container">
        <div className="form-wrapper">
          <div className="logo-container">
            <img src={logo} alt="network-error" className="logo" />
          </div>
          <h2>Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleChange}
                className="forgot_pass_input"
                placeholder="Enter your email"
                required
              />
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
    </>
  );
}

export default ForgotPassword;
