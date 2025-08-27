import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Register.css";

const PatientSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    console.log(formData);
    navigate("/patients-login"); // Navigate to login page after signup
  };

  return (
    <div>
      <div className="container">
        <div className="img">
          <img src="Group 14.png" alt="" className="img" width="100%" />
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <h2>Welcome to DHCRS!</h2>
              <input
                type="text"
                name="firstName"
                className="input"
                placeholder="Your first Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email address"
                value={formData.email}
                className="input"
                onChange={handleChange}
              />
              <br />
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              <br />
              <button type="submit" className="login">
                Sign Up
              </button>
              <div className="pl">
                <p>
                  Already have an account?{" "}
                  <Link to="/patients-login">Login</Link>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
