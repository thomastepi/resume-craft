import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-form.png";
import s from "../resources/styles/pages/privacyPolicy.module.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s["privacy-parent"]}>
      <div className={s["privacy-child"]}>
        <div className={s["privacy-container"]}>
          <div className="form-logo" style={{ marginBottom: "20px" }}>
            <img src={logo} alt="ResumeCraft Logo" style={{ width: "60px" }} />
          </div>

          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "28px",
            }}
          >
            Privacy Policy
          </h1>

          <div className={s["privacy-content"]}>
            <p>
              <strong>Last Updated:</strong> 12/22/2025
            </p>

            <h3>1. Introduction</h3>
            <p>
              Welcome to ResumeCraft. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you as to how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>

            <h3>2. Information We Collect</h3>
            <p>
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li>
                <strong>Identity Data:</strong> First name, last name, username.
              </li>
              <li>
                <strong>Contact Data:</strong> Email address, telephone number,
                physical address.
              </li>
              <li>
                <strong>Professional Data:</strong> Employment history,
                education details, skills, certifications, and portfolio URLs
                included in your resume.
              </li>
              <li>
                <strong>Technical Data:</strong> Internet protocol (IP) address,
                browser type and version, time zone setting and location,
                browser plug-in types and versions, operating system and
                platform.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                website, products, and services, including generated resumes and
                job application tracking data.
              </li>
            </ul>

            <h3>3. How We Use Your Information</h3>
            <p>
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul>
              <li>To register you as a new user.</li>
              <li>
                To provide the service of generating resumes and tracking job
                applications.
              </li>
              <li>To manage your relationship with us.</li>
              <li>To improve our website.</li>
              <li>
                <strong>Interactive Onboarding:</strong> We use an internal tool
                called Guidefox (owned and operated by ResumeCraft) to provide
                interactive onboarding tours and help you navigate the platform.
                We use limited user identifiers (such as User ID and Email)
                within this tool to personalize your experience.
              </li>
            </ul>

            <h3>4. Third-Party Services</h3>
            <p>
              We use the following third-party services to facilitate our
              Service:
            </p>
            <ul>
              <li>
                <strong>Google OAuth:</strong> Used for authentication. We
                receive your basic profile information (name, email) to create
                your account.
              </li>
              <li>
                <strong>Google reCAPTCHA:</strong> Used to protect our website
                from spam and abuse. This service analyzes traffic and user
                interactions.
              </li>
            </ul>

            <h3>5. Data Retention & Deletion</h3>
            <p>
              We will only retain your personal data for as long as necessary to
              fulfill the purposes we collected it for. You have the right to
              delete your account at any time. Upon deletion, your personal
              data, saved resumes, and application tracking history will be
              permanently removed from our active databases.
            </p>

            <h3>6. Cookies and Local Storage</h3>
            <p>
              We use local storage and cookies to maintain your session and
              authentication status. These are essential for the operation of
              the application.
            </p>

            <h3>7. Contact Us</h3>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please{" "}
              <a href="mailto:contact@thomastepi.com">contact us</a>.
            </p>
          </div>

          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link
              to="/"
              className="btn-secondary"
              style={{
                textDecoration: "none",
                padding: "10px",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
