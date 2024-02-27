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
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, values);
      localStorage.setItem("user", JSON.stringify(response.data));
      let name =
        response.data.firstName === "John "
          ? "Guest User"
          : response.data.firstName;
      message.success({
        content: `Welcome, ${name || response.data.username}!`,
        duration: 4,
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setLoading(false);
      message.error(err.response.data);
      form.resetFields();
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
            <Button
              type="primary"
              htmlType="button"
              onClick={() => {
                onFinish({ username: "guest", password: "0000" });
              }}
              className="btn-block btn-guest"
            >
              Explore as Guest
            </Button>
            <div className="d-flex align-items-center justify-content-between">
              <span>
                Don't have an account? Register <Link to="/register">Here</Link>{" "}
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
