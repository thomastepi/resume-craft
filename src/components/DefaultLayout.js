import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.png";

import "./../resources/defaultLayout.css";

function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
            message.success("Successfully logged out");
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
      <div className="content" style={{ overflow: "auto" }}>
        {props.children}
      </div>
      <div className="footer">
        <div className="footer-content">
          <p>Made with ❤️ by Thomas Tepi</p>
          <a
            href="https://www.thomastepi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.thomastepi.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
