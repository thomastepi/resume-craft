import React from "react";
import logo from "../assets/images/logo-landing.png";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrapper/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <img src={logo} alt="logo" />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>AI-Powered Resume Builder</h1>
            <p>
              A Resume Builder powered by AI which helps you create a
              professional resume in minutes.
            </p>
            <Link to="/login" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img className="img main-img" alt="job junt" src={main} />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
