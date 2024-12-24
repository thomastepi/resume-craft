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
    if (values.username === "guest" && values.password === "0000") {
      try {
        setLoading(true);
        const response = await axios.post(`${baseUrl}/api/user/login`, values);

        message.success({
          content: "Welcome, Guest User!",
          duration: 4,
        });

        localStorage.setItem("user", JSON.stringify(response.data));
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (err) {
        console.error("Error", err);
        message.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!values.username || !values.password || !values.cpassword) {
      message.error("Please fill all the fields");
      return;
    }
    if (values.password !== values.cpassword) {
      message.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/api/user/register`, values);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error", err);
      if (err.message === "Network Error") {
        message.error("Network Error. Please check your internet connection.");
        return;
      }
      message.error(
        err.response.data || "An error occurred. Please try again."
      );
    }

    try {
      const res = await axios.post(`${baseUrl}/api/user/login`, values);

      message.success({
        content: `Welcome, ${values.username}!`,
        duration: 4,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
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
    } finally {
      setLoading(false);
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
            <Button
              type="primary"
              htmlType="submit"
              className="btn-block btn-register"
            >
              Register
            </Button>
            <span>
              Already have an account? <Link to="/login">Login</Link>{" "}
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

                      onFinish({ username: "guest", password: "0000" });
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
        </div>
      </div>
    </div>
  );
}

export default Register;
