import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../resources/styles/components/Header.module.css";
import logo from "../assets/images/logo-form.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="ResumeCraft Logo" />
          <span>ResumeCraft</span>
        </div>
        <nav className={styles.nav}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#testimonials">Testimonials</a>
        </nav>
        <div className={styles.actions}>
          <button className={styles.loginButton} onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className={styles.signupButton} onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
        <button className={styles.hamburgerButton} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          <a href="#features" onClick={toggleMobileMenu}>Features</a>
          <a href="#how-it-works" onClick={toggleMobileMenu}>How It Works</a>
          <a href="#testimonials" onClick={toggleMobileMenu}>Testimonials</a>
          <button className={styles.loginButton} onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className={styles.signupButton} onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
