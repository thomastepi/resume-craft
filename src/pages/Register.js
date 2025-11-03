import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-form.png";
import { Form, Input, message, Spin } from "antd";
import { Formik } from "formik";
import { registerSchema } from "../utils/validationSchema";
import {
  //loginWithGoogle,
  registerUser,
  isUserSessionValid,
} from "../services/authService";
import GoogleReCaptcha from "../components/GoogleReCaptcha";
import "../resources/styles/pages/authentication.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

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
                const captchaToken = await recaptchaRef.current?.execute();
                if (!captchaToken) {
                  message.error("reCAPTCHA failed. Please try again.");
                  return;
                }
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
                recaptchaRef.current?.reset();
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
                <h1>Sign Up</h1>
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
                <GoogleReCaptcha ref={recaptchaRef} />
                <p>
                  Protected by reCAPTCHA{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>{" "}
                </p>

                <button
                  className="btn-secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <div className="btn-secondary-state"></div>
                  <span className="btn-secondary-contents">Create Account</span>
                </button>
                <hr />
                <span>
                  Already have an account? <Link to="/login">Sign in</Link>
                </span>

                <div style={{ marginTop: "10px" }}>
                  <span>
                    Not ready to Sign up?{" "}
                    <span
                      className="guest-link"
                      onClick={() => navigate("/guest-login")}
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
