import { useState, useRef } from "react";
import logo from "../assets/images/logo-form.png";
import { Form, Input, message, Spin, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { EmailSchema } from "../utils/validationSchema";
import "../resources/styles/pages/authentication.css";
import { forgetPassword } from "../services/authService";
import GoogleReCaptcha from "../components/GoogleReCaptcha";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div className="form">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={EmailSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const captchaToken = await recaptchaRef.current?.execute();
                if (!captchaToken) {
                  message.error("reCAPTCHA failed. Please try again.");
                  return;
                }
                await forgetPassword(
                  values,
                  captchaToken,
                  setLoading,
                  navigate
                );
                values.email = "";
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
                <h1 style={{ textAlign: "center" }}>Forgot your password?</h1>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  No worries. it happens to all of us. <br />
                  Enter your email address below and we’ll send you a link to
                  reset your password.
                </p>
                <hr />

                <>
                  <Form.Item
                    label="Email"
                    validateStatus={
                      touched.email && errors.email ? "error" : ""
                    }
                    help={touched.email && errors.email ? errors.email : ""}
                  >
                    <Input
                      name="email"
                      type="email"
                      autoFocus
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>
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
                  <button
                    type="submit"
                    className="btn-secondary"
                    disabled={isSubmitting}
                  >
                    <div className="btn-secondary-state"></div>
                    <span className="btn-secondary-contents">
                      Reset Password
                    </span>
                  </button>
                  <Button
                    style={{ marginTop: "0.5rem", width: "100%" }}
                    type="link"
                    //className="btn-primary"
                    onClick={() => {
                      values.email = "";
                      recaptchaRef.current?.reset();
                      navigate("/login");
                    }}
                    icon={<ArrowLeftOutlined />}
                  >
                    <div className="btn-secondary-state"></div>
                    <span className="btn-secondary-contents">
                      Back to Login
                    </span>
                  </Button>
                  <GoogleReCaptcha ref={recaptchaRef} />
                </>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
