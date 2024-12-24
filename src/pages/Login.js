import React, { useEffect } from "react";
import axios from "axios";
import logo from "../assets/images/logo-form.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import "../resources/authentication.css";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (!values.username || !values.password) {
      message.error("Please fill all the fields");
      form.resetFields();
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/user/login`, values);

      const { username, firstName } = response.data;

      const name = username === "guest" ? `Guest User` : firstName || username;

      message.success({
        content: `Welcome, ${name}!`,
        duration: 4,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("Error", err);
      if (err.message === "Network Error") {
        message.error("Network Error. Please check your internet connection.");
        return;
      }
      message.error(
        err.response.data.error || "An error occurred. Please try again."
      );
      //form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  });

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div className="form">
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <div className="form-logo">
              <img src={logo} alt="logo" />
            </div>
            <h1>Login</h1>
            <hr />
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="btn-block">
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

                  onFinish({ username: "guest", password: "0000" });
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
                Don't have an account? <Link to="/register">Register</Link>{" "}
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
