import { useEffect, useState, useRef } from "react";
import logo from "../assets/images/logo-form.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, message, Spin } from "antd";
import { Formik } from "formik";
import { loginSchema } from "../utils/validationSchema";
import "../resources/styles/pages/authentication.css";
import {
  loginWithCredentials,
  registerGuestLogin,
  isUserSessionValid,
} from "../services/authService";
import { GUEST_USER } from "../utils/constants";
import { loadGuidefoxAgent, unloadGuidefoxAgent } from "../lib/loadGuidefox";

function GuestLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      loadGuidefoxAgent();
    }, 2000);

    return () => unloadGuidefoxAgent();
  }, []);

  useEffect(() => {
    if (isUserSessionValid()) {
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [navigate]);

  return (
    <div className="auth-parent" style={{ marginTop: "-5rem" }}>
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div className="form">
          <Formik
            initialValues={GUEST_USER}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await loginWithCredentials(values, null, navigate, setLoading);
                await registerGuestLogin();
              } catch (err) {
                console.error("Login Error:", err);
                message.error(
                  err.response?.data?.message ||
                    "An error occurred. Please try again."
                );
              } finally {
                recaptchaRef.current?.reset();
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form layout="vertical" onFinish={handleSubmit}>
                <div className="form-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h1 style={{ textAlign: "center" }}>Browse as Guest</h1>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  See how ResumeCraft works without creating an account. Guest
                  access is read-only. Editing your profile and generating AI
                  resumes requires a free account.
                </p>
                <hr style={{ margin: "2rem 0" }} />

                <>
                  <button
                    id="guest-login-btn"
                    type="submit"
                    className="btn-secondary"
                    disabled={isSubmitting}
                  >
                    <div className="btn-secondary-state"></div>
                    <span className="btn-secondary-contents">
                      Continue as Guest
                    </span>
                  </button>
                </>

                <hr />

                <div className="d-flex align-items-center justify-content-between">
                  <span>
                    Want full access?{" "}
                    <Link to="/register">Create a free account</Link>
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default GuestLogin;
