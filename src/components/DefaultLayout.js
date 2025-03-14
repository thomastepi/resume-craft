import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button, Avatar } from "antd";
import { logoutUser } from "../services/authService";
import { UserOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import "./../resources/styles/defaultLayout.css";

function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const avatarSrc = user.avatar || null;

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
      label: <span onClick={() => logoutUser(navigate)}>Logout</span>,
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
          <Button
            className="btn-primary"
            style={{ width: "fit-content", color: "white", backgroundColor: "black", borderRadius: "5px" }}
            icon={avatarSrc ? <Avatar src={avatarSrc} /> : <UserOutlined />}
          >
            <span className="btn-primary-contents">{user.username}</span>
          </Button>
        </Dropdown>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
