import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo-landing.png";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrapper/LandingPage";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { message, Spin } from "antd";
import {
  loginWithGoogle,
  isUserSessionValid,
  loginWithCredentials,
  registerGuestLogin,
} from "../services/authService";

const Landing = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserSessionValid()) {
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginWithGoogle(tokenResponse.access_token, navigate, setLoading);
      //console.log("tokenResponse: ", tokenResponse);
    },
    onError: () => message.error("Google Login Failed"),
  });

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
            <div style={{ width: "100%" }}>
              <GoogleSignInButton
                btnText="Sign up with Google"
                loading={loading}
                onClick={() => login()}
              />
            </div>

            <div className="or-divider">
              <span>
                <strong>OR</strong>
              </span>
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/register")}
            >
              <div className="btn-secondary-state"></div>
              <span className="btn-primary-contents">Create an Account</span>
            </button>

            <div style={{ margin: "10px 0", fontSize: "0.8rem" }}>
              <span>
                No account? No problem!{" "}
                <span
                  className="guest-link"
                  onClick={async () => {
                    try {
                      await loginWithCredentials(
                        { username: "guest", password: "SecurePass123" },
                        null,
                        navigate,
                        setLoading
                      );
                      await registerGuestLogin();
                    } catch (err) {
                      console.error("Failed to log guest session:", err);
                    }
                  }}
                >
                  Explore as Guest
                </span>
              </span>
            </div>

            <div style={{ width: "100%", marginTop: "5rem" }}>
              <span>Already have an account?</span>
              <button
                style={{ marginTop: "0.5rem" }}
                className="btn-primary"
                type="button"
                disabled={loading}
                onClick={() => navigate("/login")}
              >
                <div className="btn-primary-state"></div>
                <span className="btn-primary-contents">Sign in</span>
              </button>
            </div>
          </div>
        </div>
        <img className="img main-img" alt="job junt" src={main} />
      </div>
      <div style={{ textAlign: "center", padding: "1rem", fontSize: "0.8rem" }}>
        <span>
          © 2025 ResumeCraft by{" "}
          <a
            className="guest-link"
            href="https://www.thomastepi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thomas Tepi
          </a>
          . Read my{" "}
          <a
            className="guest-link"
            href="https://www.thomastepi.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </span>
      </div>
    </Wrapper>
  );
};

export default Landing;
