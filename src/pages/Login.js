import { useEffect, useState, useRef } from "react";
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
  const [isValidatedUsername, setIsValidatedUsername] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const handleCaptchaChange = (token) => setCaptchaToken(token);
  const resetCaptcha = () => {
    handleCaptchaChange(null);
    recaptchaRef.current?.reset();
  };

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
                resetCaptcha();
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
                        // display: "flex",
                        // flexDirection: "column",
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        onExpired={resetCaptcha}
                        onErrored={resetCaptcha}
                        sitekey={"6Lco1-oqAAAAAEiEbzvjXKUk_dHhb7jWQsup0cxi"}
                        size="normal"
                        onChange={handleCaptchaChange}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 10,
                        //opacity: 1,
                        textAlign: "center",
                        marginTop: -5,
                        marginBottom: 10,
                      }}
                    >
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms of Service
                      </a>{" "}
                      apply.
                    </p>
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
                        handleCaptchaChange(null);
                        setIsValidatedUsername(false);
                      }}
                    >
                      <div className="btn-secondary-state"></div>
                      <span className="btn-secondary-contents">Back</span>
                    </button>
                  </>
                )}

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
