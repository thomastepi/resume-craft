import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/images/logo-form.png";
import { Button, Form, Input, message, Spin } from "antd";
import { Formik } from "formik";
import { registerSchema } from "../utils/validationSchema";
import {
  //loginWithGoogle,
  loginWithCredentials,
  registerUser,
  registerGuestLogin,
  isUserSessionValid,
} from "../services/authService";
import "../resources/styles/pages/authentication.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleCaptchaChange = (token) => setCaptchaToken(token);

  useEffect(() => {
    if (isUserSessionValid()) {
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [navigate]);

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div>
          <Formik
            initialValues={{ username: "", password: "", cpassword: "" }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await registerUser(
                  values,
                  captchaToken,
                  navigate,
                  setLoading,
                  setSubmitting
                );
              } catch (err) {
                console.error("Register Error:", err);
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
                <h1>Register</h1>
                <hr />

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
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
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
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  validateStatus={
                    touched.cpassword && errors.cpassword ? "error" : ""
                  }
                  help={
                    touched.cpassword && errors.cpassword
                      ? errors.cpassword
                      : ""
                  }
                >
                  <Input.Password
                    className="passwd-field"
                    name="cpassword"
                    value={values.cpassword}
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

                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-block btn-register"
                  disabled={isSubmitting || !captchaToken}
                >
                  Register
                </Button>

                <span>
                  Already have an account? <Link to="/login">Login</Link>
                </span>

                <div style={{ marginTop: "10px" }}>
                  <span>
                    Not ready to register?{" "}
                    <span
                      className="guest-link"
                      onClick={async () => {
                        try {
                          setLoading(true);
                          await loginWithCredentials(
                            { username: "guest", password: "SecurePass123" },
                            null,
                            navigate,
                            setLoading
                          );
                          await registerGuestLogin();
                        } catch (err) {
                          console.error("Failed to log guest session:", err);
                          message.error(
                            err.response?.data?.message ||
                              "An error occurred. Please try again."
                          );
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      Explore as Guest
                    </span>
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

export default Register;
