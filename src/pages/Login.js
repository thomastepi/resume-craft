import { useEffect, useState, useRef } from "react";
import logo from "../assets/images/logo-form.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message, Spin, Alert } from "antd";
import { Formik } from "formik";
import { loginSchema } from "../utils/validationSchema";
import { useGoogleLogin } from "@react-oauth/google";
import "../resources/styles/pages/authentication.css";
import GoogleSignInButton from "../components/GoogleSignInButton";
import {
  loginWithGoogle,
  loginWithCredentials,
  isUserSessionValid,
} from "../services/authService";
import GoogleReCaptcha from "../components/GoogleReCaptcha";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidatedUsername, setIsValidatedUsername] = useState(false);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  useEffect(() => {
    if (isUserSessionValid()) {
      setTimeout(() => navigate("/home"), 2000);
    }
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginWithGoogle(
        tokenResponse.access_token,
        navigate,
        setLoading,
        setError
      );
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
                const captchaToken = await recaptchaRef.current?.execute();
                if (!captchaToken) {
                  message.error("reCAPTCHA failed. Please try again.");
                  return;
                }
                await loginWithCredentials(
                  values,
                  captchaToken,
                  navigate,
                  setLoading,
                  setError
                );
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

                {!isValidatedUsername && (
                  <>
                    <div style={{ width: "100%" }}>
                      <GoogleSignInButton
                        loading={loading}
                        onClick={() => login()}
                        btnText="Continue with Google"
                      />
                    </div>

                    <div className="or-divider">
                      <span>
                        <strong>OR</strong>
                      </span>
                    </div>
                  </>
                )}
                {!isValidatedUsername ? (
                  <>
                    <Form.Item
                      label="Username"
                      validateStatus={
                        touched.username && errors.username ? "error" : ""
                      }
                      help={
                        touched.username && errors.username
                          ? errors.username
                          : ""
                      }
                    >
                      <Input
                        className="input-field"
                        name="username"
                        autoFocus
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onPressEnter={(e) => {
                          e.preventDefault();
                          if (!errors.username && values.username) {
                            setIsValidatedUsername(true);
                          } else {
                            message.error("Please enter a valid username.");
                          }
                        }}
                      />
                    </Form.Item>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        if (!errors.username && values.username) {
                          setIsValidatedUsername(true);
                        } else {
                          message.error("Please enter a valid username.");
                        }
                      }}
                    >
                      <div className="btn-secondary-state"></div>
                      <span className="btn-secondary-contents">Next</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 14,
                        opacity: 0.85,
                        backgroundColor: "#f0f0f0",
                        padding: 8,
                        borderRadius: 4,
                        marginBottom: 16,
                      }}
                    >
                      Username: <strong>{values.username}</strong>
                    </div>
                    <Form.Item
                      label="Password"
                      validateStatus={
                        touched.password && errors.password ? "error" : ""
                      }
                      help={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                    >
                      <Input.Password
                        className="passwd-field"
                        name="password"
                        type="password"
                        autoFocus
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>
                    {error && (
                      <Alert
                        message={
                          error.message ||
                          "Something went wrong. Please try again."
                        }
                        type="error"
                        style={{ marginBottom: 16 }}
                      />
                    )}
                    <GoogleReCaptcha ref={recaptchaRef} />
                    <div style={{ width: "100%" }}>
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
                    </div>
                    <button
                      type="submit"
                      className="btn-secondary"
                      disabled={isSubmitting}
                    >
                      <div className="btn-secondary-state"></div>
                      <span className="btn-secondary-contents">Sign in</span>
                    </button>
                    <button
                      style={{ marginTop: "0.5rem" }}
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        values.password = "";
                        recaptchaRef.current?.reset();
                        setIsValidatedUsername(false);
                        setError(null);
                      }}
                    >
                      <div className="btn-secondary-state"></div>
                      <span className="btn-secondary-contents">Back</span>
                    </button>
                  </>
                )}

                <hr />

                <div>
                  <span
                    className="guest-link"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot your password?{" "}
                  </span>
                </div>

                <div style={{ margin: "3px 0" }}>
                  <span>
                    Not ready to sign in?{" "}
                    <span
                      className="guest-link"
                      onClick={() => navigate("/guest-login")}
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
