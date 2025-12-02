import { useState, useEffect } from "react";
import logo from "../assets/images/logo-landing.png";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrapper/LandingPage";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { isUserSessionValid } from "../services/authService";

const Landing = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserSessionValid()) {
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [navigate]);

  return (
    <>
      <Wrapper>
        {loading && <Spin size="large" />}
        <div className="logo-mobile">
          <img src={logo} alt="ResumeCraft logo" />
        </div>

        <div className="container page">
          <div className="info">
            <h1 className="title">The Smarter Way to Craft Your Resume</h1>
            <ul className="feature-list">
              <li>
                <span className="icon">✨</span>
                <strong style={{ marginRight: "0.5rem" }}>Generate:</strong>
                Instantly create a professional resume with AI.
              </li>
              <li>
                <span className="icon">🔍</span>
                <strong style={{ marginRight: "0.5rem" }}>Analyze:</strong> Get
                instant feedback by comparing your resume against any job
                description.
              </li>
              <li>
                <span className="icon">🎯</span>
                <strong style={{ marginRight: "0.5rem" }}>Tailor:</strong>{" "}
                Receive expert suggestions to create a resume that lands
                interviews.
              </li>
            </ul>

            <div className="auth-cta">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/login")}
                //disabled={loading}
                aria-label="Get Started for Free"
                style={{
                  marginBottom: "1rem",
                }}
              >
                <div className="btn-primary-state"></div>
                <span className="btn-primary-contents">
                  Get Started for Free
                </span>
              </button>

              <div style={{ textAlign: "center", width: "100%" }}>
                <span className="landing-span">No Account? No Problem! </span>
                <a
                  href="/login"
                  className="guest-link"
                  style={{ fontWeight: "bold", fontSize: "14px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/guest-login");
                  }}
                >
                  Explore as Guest
                </a>
              </div>
            </div>
          </div>

          <img
            className="img main-img"
            alt="Illustration of job hunt"
            src={main}
          />
        </div>

        <div className="landing-section trusted-by-section">
          <p>Trusted by professionals at top companies</p>
          <div className="logos">
            <span>Google</span>
            <span>Microsoft</span>
            <span>Amazon</span>
            <span>Netflix</span>
            <span>Meta</span>
          </div>
        </div>

        <div className="landing-section how-it-works-section">
          <h2>How It Works in 3 Easy Steps</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <h3>Provide Your Info</h3>
              <p>
                Fill out your profile manually or upload an existing resume. Add
                a job description to start the analysis.
              </p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <h3>Get AI Feedback</h3>
              <p>
                Our AI analyzes your resume, highlighting missing keywords and
                suggesting improvements for each section.
              </p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <h3>Land the Interview</h3>
              <p>
                Apply with a perfectly tailored resume designed to catch the eye
                of recruiters and get you noticed.
              </p>
            </div>
          </div>
        </div>

              <div className="landing-section stats-section">

                <div className="stat-item">

                  <h3>3x</h3>

                  <p>More Interviews</p>

                </div>

                <div className="stat-item">

                  <h3>10k+</h3>

                  <p>Resumes Created</p>

                </div>

                <div className="stat-item">

                  <h3>98%</h3>

                  <p>User Satisfaction</p>

                </div>

              </div>

        

              <div className="landing-section testimonial-section">

                <h2>Why Professionals Love ResumeCraft</h2>

                <div className="testimonials-container">

                  <div className="testimonial-card">

                    <p className="quote">

                      "The AI analyzer is a game-changer. It instantly showed me which

                      keywords were missing for my target job. I felt so much more

                      confident applying."

                    </p>

                    <div className="author">

                      <span className="author-name">Mirabel M.</span>

                      <span className="author-title">Product Manager</span>

                    </div>

                  </div>

                  <div className="testimonial-card">

                    <p className="quote">

                      "I needed a professional resume fast, and ResumeCraft delivered. I

                      went from a blank page to a stunning, downloadable PDF in under

                      15 minutes."

                    </p>

                    <div className="author">

                      <span className="author-name">Andrew K.</span>

                      <span className="author-title">Software Engineer</span>

                    </div>

                  </div>

                  <div className="testimonial-card">

                    <p className="quote">

                      "I wasn't getting any callbacks. After using ResumeCraft to

                      tailor my resume, I landed three interviews in one week. Cannot

                      recommend it enough!"

                    </p>

                    <div className="author">

                      <span className="author-name">Jason T.</span>

                      <span className="author-title">UX Designer</span>

                    </div>

                  </div>

                </div>

              </div>

        

              <div className="landing-section final-cta-section">

                <h2>Ready to Build Your Future?</h2>

                <p>

                  Join thousands of users who trust ResumeCraft to create job-winning

                  resumes.

                </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate("/login")}
            //disabled={loading}
            aria-label="Create an account"
          >
            <div className="btn-primary-state"></div>
            <span className="btn-primary-contents">Get Started for Free</span>
          </button>
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
