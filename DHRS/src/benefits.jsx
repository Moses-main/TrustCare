import React from "react";
import "./benefits.css";
import health from './imgs/health.jpeg';
import clinical from './imgs/clin docs.jpeg';
import medication from './imgs/med tracker.jpeg';
import alerts from './imgs/alert.png';
import appoint from './imgs/appoint.png';
import care from './imgs/ct.jpeg';

const benefits = () => {
  return (
    <div className="benefits-container">
      <div className="content1">
        <div className="content-wrtup">
          <h2 className="content-title">Health metrics.</h2>
          <p className="content-para">
            Review real-time vitals, labs, and <br /> trend charts for your
            wellbeing.
          </p>
        </div>
        <div className="content-img">
          <img src={health} alt="" id="health" />
        </div>
      </div>

      <div className="content2">
        <div className="content-img">
          <img src={clinical} alt="" id="health" />
        </div>

        <div className="content-wrtup">
          <h2 className="content-title">Clinical docs.</h2>
          <p className="content-para">
            Access reports, <br /> prescriptions, and test <br /> results in
            your doc library.
          </p>
        </div>
      </div>

      <div className="content1">
        <div className="content-wrtup">
          <h2 className="content-title">Medication tracker.</h2>
          <p className="content-para">
            Check current meds, <br /> doses, and prescription <br /> history
            all in one place.
          </p>
        </div>
        <div className="content-img">
          <img src={medication} alt="" id="health" />
        </div>
      </div>

      <div className="btm-imgs">
        <div className="img1">
          <img src={alerts} alt="" id="ggg" />
          <div className="txt">
            <h2 className="txt-head">Alerts & permissions.</h2>
            <p className="txt1">
              See allergies, set <br /> emergency info access, <br /> and manage
              permissions.
            </p>
          </div>
        </div>
        <div className="img1">
          <img src={appoint} alt="" id="ggg" />
          <div className="txt">
            <h2 className="txt-head">Appointment hub.</h2>
            <p className="txt1">
              Book or review appointments <br /> and telemed sessions.
            </p>
          </div>
        </div>
        <div className="img1">
          <img src={care} alt="" id="ggg" />
          <div className="txt">
            <h2 className="txt-head">Care team chat.</h2>
            <p className="txt1">
              Securely message providers <br /> and coordinate your care team.
            </p>
          </div>
        </div>
      </div>
      <div className="banners-writeup">
        <h3 className="banners-txt">Full Control, Anytime.</h3>

        <h3 className="banners-txt2">
          Access and own your healthcare journey, 24/7..
        </h3>
      </div>

      <div className="banners-btn">
        <button className="btn1">Enter Dashboard</button>
      </div>
    </div>
  );
};

export default benefits;
