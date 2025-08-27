import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./patientsLogin.css";

const PatientsLogin = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
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

    if (
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      alert("Login successful!");
      navigate("/book-appointment"); // Navigate to BookAppointment on successful login
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <fieldset>
                <h2>Welcome Back</h2>
              <input
                type="email"
                name="email"
                placeholder="Input your Email"
                value={formData.email}
                className="input"
                onChange={handleChange}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
              <br />
              <button type="submit" className="login">Login</button>
              <div className="pl">
                <Link to="/patients-signup">
                    <p>Create an account</p>
                </Link>
                <p href="#">Forgot Password?</p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientsLogin;
