import { useState, useEffect } from "react";
import logo from "../assets/images/logo-landing.png";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrapper/LandingPage";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { message, Spin } from "antd";
import { loginWithGoogle, isUserSessionValid } from "../services/authService";

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
    },
    onError: () => message.error("Google Login Failed"),
  });

  return (
    <>
      <Wrapper>
        {loading && <Spin size="large" />}
        <div className="logo-mobile">
          <img src={logo} alt="ResumeCraft logo" />
        </div>

        <div className="container page">
          <div className="info">
            <h1 className="title">AI-Powered Resume Builder</h1>
            <p className="sub-title">
              Build, edit, and generate resumes with AI.
            </p>

            <div
              className="guest-cta auth-child"
              role="region"
              aria-label="Try as guest"
            >
              <div className="guest-cta-header">
                <span className="pill landing-span">No sign-up needed</span>
              </div>

              <button
                type="button"
                className="btn-primary guest-primary-btn"
                aria-label="Explore as Guest"
                onClick={() => navigate("/guest-login")}
                disabled={loading}
              >
                <div className="btn-primary-state"></div>
                <span className="btn-primary-contents">Explore as Guest</span>
              </button>
            </div>

            <div className="auth-child">
              <div>
                <span className="disclaimer landing-span">
                  To save your work, create an account.
                </span>
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ width: "100%" }}>
                  <GoogleSignInButton
                    btnText="Sign up with Google"
                    loading={loading}
                    onClick={() => login()}
                  />
                </div>

                <div className="or-divider landing-or-divider">
                  <span>
                    <strong>OR</strong>
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate("/register")}
                  disabled={loading}
                  aria-label="Create an account with email"
                >
                  <div className="btn-secondary-state"></div>
                  <span className="btn-primary-contents">
                    Create an Account
                  </span>
                </button>
              </div>

              <div style={{ width: "100%", marginTop: "4rem" }}>
                <span className="landing-span">Already have an account?</span>
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

          <img
            className="img main-img"
            alt="Illustration of job hunt"
            src={main}
          />
        </div>
      </Wrapper>

      <div
        className="footer"
        style={{ textAlign: "center", fontSize: "0.8rem", marginTop: "5rem" }}
      >
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
    </>
  );
};

export default Landing;
