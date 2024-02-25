import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-form.png";
import axios from "axios";
import { Button, Form, Input, message, Spin } from "antd";
import "../resources/authentication.css";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (!values.username || !values.password || !values.cpassword) {
      message.error("Please fill all the fields");
      form.resetFields();
      return;
    }
    if (values.password !== values.cpassword) {
      message.error("Passwords do not match");
      form.resetFields();
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/api/user/register`, values);
      setLoading(false);
      message.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      message.error(err.response.data);
      form.resetFields();
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
    }
  });

  return (
    <div className="auth-parent">
      {loading && <Spin size="large" />}
      <div className="auth-child">
        <div>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <div className="form-logo">
              <img src={logo} alt="logo" />
            </div>
            <h1>Register</h1>
            <hr />
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <Form.Item name="cpassword" label="Confirm Password">
              <Input type="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="btn-block btn-register">
              Register
            </Button>
            <span>
              Already have an account? Login <Link to="/login">Here</Link>{" "}
            </span>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
