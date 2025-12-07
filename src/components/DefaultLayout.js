import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { logoutUser } from "../services/authService";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  ToolOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import s from "./../resources/styles/defaultLayout.module.css";
import logo from "../assets/images/logo-form.png";

function DefaultLayout({ children, title = "Home" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      path: "/home",
      icon: <HomeOutlined />,
      name: "Home",
    },
    {
      path: "/profile",
      icon: <UserOutlined />,
      name: "Profile",
    },
    {
      path: "/templates",
      icon: <FileTextOutlined />,
      name: "Templates",
    },
    {
      path: "/ai-toolkit",
      icon: <ToolOutlined />,
      name: "AI Toolkit",
    },
  ];

  return (
    <div
      className={`${s.layout} ${isCollapsed ? s.collapsedLayout : ""} ${
        isMobileMenuOpen ? s.mobileMenuOpen : ""
      }`}
    >
      <div className={`${s.sidebar} ${isCollapsed ? s.collapsedSidebar : ""}`}>
        <div className={s.sidebarHeader}>
          <div className={s.logo}>
            {!isCollapsed && <img src={logo} alt="logo" />}
            {!isCollapsed && <span>ResumeCraft</span>}
          </div>
          <button onClick={toggleCollapse} className={s.collapseButton}>
            {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
        <nav className={s.nav}>
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={`${s.navItem} ${
                location.pathname.startsWith(item.path) ? s.active : ""
              }`}
              onClick={isMobileMenuOpen ? toggleMobileMenu : null}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div
          className={`${s.userInfo} ${isCollapsed ? s.collapsedUserInfo : ""}`}
        >
          <Avatar src={user.avatar} icon={<UserOutlined />} />
          {!isCollapsed && (
            <div className={s.userDetails}>
              <span className={s.userName}>{user.username}</span>
              <span className={s.logout} onClick={() => logoutUser(navigate)}>
                <LogoutOutlined /> Logout
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={s.mainContent}>
        <div className={s.header}>
          <button onClick={toggleMobileMenu} className={s.mobileMenuButton}>
            <MenuOutlined />
          </button>
          <h1>{title.length > 20 ? title.slice(0, 20) + "..." : title}</h1>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
