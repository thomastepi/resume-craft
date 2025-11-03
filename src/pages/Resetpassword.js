import { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logo-form.png";
import { Form, Input, message, Spin } from "antd";
import { Formik } from "formik";
import "../resources/styles/pages/authentication.css";
import { resetPassword } from "../services/authService";
import GoogleReCaptcha from "../components/GoogleReCaptcha";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("token");

  useEffect(() => {
    if (!resetToken) {
      navigate("/login");
    }
  }, [resetToken, navigate]);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>_\-=]/,
        "Password must contain at least one special character"
      ),
  });

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div className="form">
          <Formik
            initialValues={{ newPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const captchaToken = await recaptchaRef.current?.execute();
                if (!captchaToken) {
                  message.error("reCAPTCHA failed. Please try again.");
                  return;
                }
                await resetPassword(
                  values.newPassword,
                  resetToken,
                  captchaToken,
                  setLoading,
                  navigate
                );
                values.newPassword = "";
                recaptchaRef.current?.reset();
              } catch (err) {
                console.error("Password Reset Error: ", err);
                message.error(
                  err.response?.data?.error ||
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
                <h1 style={{ textAlign: "center" }}>Reset your password</h1>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  Enter your new password below to secure your account. Make
                  sure it’s something strong and easy for you to remember.
                </p>
                <hr />

                <>
                  <Form.Item
                    label="New Password"
                    validateStatus={
                      touched.newPassword && errors.newPassword ? "error" : ""
                    }
                    help={
                      touched.newPassword && errors.newPassword
                        ? errors.newPassword
                        : ""
                    }
                  >
                    <Input.Password
                      className="passwd-field"
                      name="newPassword"
                      type="password"
                      autoFocus
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                  <button
                    type="submit"
                    className="btn-secondary"
                    disabled={isSubmitting}
                  >
                    <div className="btn-secondary-state"></div>
                    <span className="btn-secondary-contents">Submit</span>
                  </button>
                  <GoogleReCaptcha ref={recaptchaRef} />
                  <div style={{ width: "100%" }}>
                    <p>
                      protected by reCAPTCHA{" "}
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
                </>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
