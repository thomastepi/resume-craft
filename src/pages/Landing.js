import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo-landing.png";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrapper/LandingPage";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { message, Spin } from "antd";
import { loginWithGoogle, isUserSessionValid } from "../services/authService";

const Landing = () => {
  const [buttonWidth, setButtonWidth] = useState(200);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserSessionValid()) {
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [navigate]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const newWidth = Math.min(Math.max(parentWidth, 200), 400);
        setButtonWidth(newWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Wrapper>
      {loading && <Spin size="large" />}
      <div className="logo-mobile">
        <img src={logo} alt="logo" />
      </div>
      <div className="container page">
        <div className="info">
          <h1 className="title">AI-Powered Resume Builder</h1>
          <p className="sub-title">
            Create a professional, job-winning resume in minutes—powered by AI.
          </p>
          <div className="auth-child">
            <div ref={containerRef} style={{ width: "100%" }}>
              <GoogleLogin
                onSuccess={(response) =>
                  loginWithGoogle(response.credential, navigate, setLoading)
                }
                onError={() => message.error("Google Login Failed")}
                useOneTap
                text="signup_with"
                theme="outline"
                size="large"
                width={buttonWidth.toString()}
              />
            </div>
            <div className="or-divider">
              <span>
                <strong>OR</strong>
              </span>
            </div>
            <Link
              to="/register"
              className="btn btn-hero"
              style={{ width: "100%" }}
            >
              Create an Account
            </Link>
            <div style={{ width: "100%", marginTop: "5rem" }}>
              <span>Already have an account? </span>
              <Link to="/login" className="btn btn-login">
                Login
              </Link>
            </div>
          </div>
        </div>
        <img className="img main-img" alt="job junt" src={main} />
      </div>
    </Wrapper>
  );
};

export default Landing;
