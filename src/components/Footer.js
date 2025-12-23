import { Link } from "react-router-dom";
import styles from "../resources/styles/components/Footer.module.css";
import logo from "../assets/images/logo-form.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.logo}>
            <img src={logo} alt="ResumeCraft Logo" />
            <span>ResumeCraft</span>
          </div>
          <p className={styles.tagline}>
            The smarter way to craft your resume.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Product</h3>
          <Link to="/templates">Templates</Link>
          <Link to="/ai-toolkit/analyzer">AI Analyzer</Link>
        </div>

        <div className={styles.column}>
          <h3>Company</h3>
          <a
            href="https://www.thomastepi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Me
          </a>
          <a
            href="https://www.thomastepi.com/#contactme-section"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </div>

        <div className={styles.column}>
          <h3>Legal</h3>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>
          © {new Date().getFullYear()} ResumeCraft by{" "}
          <a
            href="https://www.thomastepi.com/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thomas Tepi
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
