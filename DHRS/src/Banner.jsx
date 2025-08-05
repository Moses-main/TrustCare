import React from "react";
import "./Banner.css"; 

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-writeup">
        <h3 className="banner-txt">Your Health Dashboard.</h3>

        <h3 className="banner-txt2">Monitor, manage, and own your care.</h3>
      </div>

      <div className="banner-btn">
        <button className="btn">Go To Records</button>
      </div>
    </div>
  );
};

export default Banner;
