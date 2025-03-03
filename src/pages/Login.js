import React, { useEffect } from "react";
import axios from "axios";
import logo from "../assets/images/logo-form.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import { Formik } from "formik";
import { loginSchema } from "../utils/validationSchema";
import "../resources/styles/pages/authentication.css";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [navigate]);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/user/login`, values);

      const { username, firstName } = response.data;
      const name = username === "guest" ? `Guest User` : firstName || username;

      message.success(`Welcome, ${name}!`);
      localStorage.setItem("user", JSON.stringify(response.data));

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("Error", err);
      if (err.message === "Network Error") {
        message.error("Network Error. Please check your internet connection.");
      } else {
        message.error(
          err.response?.data?.error || "An error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div className="form">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
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
                <h1>Login</h1>
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

                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-block"
                  disabled={isSubmitting}
                >
                  Login
                </Button>

                <div className="or-divider">
                  <span>
                    <strong>OR</strong>
                  </span>
                </div>

                <Button
                  type="primary"
                  htmlType="button"
                  onClick={async () => {
                    try {
                      setLoading(true);
                      await axios.post(`${baseUrl}/api/user/guest-log`);
                      handleLogin(
                        { username: "guest", password: "SecurePass123" },
                        { setSubmitting: () => {} }
                      );
                    } catch (err) {
                      console.error("Failed to log guest session:", err);
                      message.error("An error occurred. Please try again.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="btn-block btn-guest"
                >
                  Explore as Guest
                </Button>

                <div className="d-flex align-items-center justify-content-between">
                  <span>
                    Don't have an account? <Link to="/register">Register</Link>
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
