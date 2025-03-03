import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-form.png";
import axios from "axios";
import { Button, Form, Input, message, Spin } from "antd";
import { Formik } from "formik";
import { registerSchema } from "../utils/validationSchema"; // Import Yup schema
import "../resources/styles/pages/authentication.css";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      await axios.post(`${baseUrl}/api/user/register`, values);

      message.success(`Registration successful! Logging in...`);

      const res = await axios.post(`${baseUrl}/api/user/login`, values);
      localStorage.setItem("user", JSON.stringify(res.data));

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("Error", err);
      message.error(
        err.response?.data || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div>
          <Formik
            initialValues={{ username: "", password: "", cpassword: "" }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
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

                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-block btn-register"
                  disabled={isSubmitting}
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
                          await axios.post(`${baseUrl}/api/user/guest-log`);
                          handleRegister(
                            {
                              username: "guest",
                              password: "0000",
                              cpassword: "0000",
                            },
                            { setSubmitting: () => {} }
                          );
                        } catch (err) {
                          console.error("Failed to log guest session:", err);
                          message.error("An error occurred. Please try again.");
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
