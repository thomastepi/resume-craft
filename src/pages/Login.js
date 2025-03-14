import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/images/logo-form.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message, Spin } from "antd";
import { Formik } from "formik";
import { loginSchema } from "../utils/validationSchema";
import { useGoogleLogin } from "@react-oauth/google";
import "../resources/styles/pages/authentication.css";
import GoogleSignInButton from "../components/GoogleSignInButton";
import {
  loginWithGoogle,
  loginWithCredentials,
  registerGuestLogin,
  isUserSessionValid,
} from "../services/authService";

function Login() {
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleCaptchaChange = (token) => setCaptchaToken(token);

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
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div className="form">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await loginWithCredentials(
                  values,
                  captchaToken,
                  navigate,
                  setLoading
                );
              } catch (err) {
                console.error("Login Error:", err);
                message.error(
                  err.response?.data?.message ||
                    "An error occurred. Please try again."
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form layout="vertical" onFinish={handleSubmit}>
                <div className="form-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h1>Sign In</h1>
                <hr />

                <div style={{ width: "100%" }}>
                  <GoogleSignInButton
                    loading={loading}
                    onClick={() => login()}
                    btnText="Sign in with Google"
                  />
                </div>

                <div className="or-divider">
                  <span>
                    <strong>OR</strong>
                  </span>
                </div>
                <Form.Item
                  label="Username"
                  validateStatus={
                    touched.username && errors.username ? "error" : ""
                  }
                  help={
                    touched.username && errors.username ? errors.username : ""
                  }
                >
                  <Input
                    className="input-field"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  type="text"
                  validateStatus={
                    touched.password && errors.password ? "error" : ""
                  }
                  help={
                    touched.password && errors.password ? errors.password : ""
                  }
                >
                  <Input.Password
                    className="passwd-field"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "8px",
                  }}
                >
                  <ReCAPTCHA
                    sitekey={"6Lco1-oqAAAAAEiEbzvjXKUk_dHhb7jWQsup0cxi"}
                    onChange={handleCaptchaChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  <div className="btn-secondary-state"></div>
                  <span className="btn-secondary-contents">Sign in</span>
                </button>

                <hr />

                <div style={{ margin: "10px 0" }}>
                  <span>
                    Not ready to sign in?{" "}
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

                <div className="d-flex align-items-center justify-content-between">
                  <span>
                    Don't have an account? <Link to="/register">Sign up</Link>
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

export default Login;
