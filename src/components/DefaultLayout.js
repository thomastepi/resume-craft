import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import { jwtDecode } from "jwt-decode";

import "./../resources/styles/defaultLayout.css";

function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const decodedToken = jwtDecode(user.accessToken);

  const items = [
    {
      key: "1",
      label: (
        <Link style={{ textDecoration: "none" }} to="/home">
          Home
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link style={{ textDecoration: "none" }} to="/profile">
          Profile
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/landing");
            message.success(
              decodedToken.role === "guest"
                ? "Guest Session Ended"
                : "Successfully Logged Out"
            );
          }}
        >
          Logout
        </span>
      ),
    },
  ];

  return (
    <div className="layout">
      <div className="header">
        <img
          className="logo"
          onClick={() => {
            navigate("/home");
          }}
          src={logo}
          alt="logo"
        />
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button className="btn-user" icon={<UserOutlined />}>
            {user.username}
          </Button>
        </Dropdown>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
