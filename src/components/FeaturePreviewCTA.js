import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../resources/styles/components/FeaturePreviewCTA.module.css';

const FeaturePreviewCTA = ({ title, message }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>{title || "Unlock Full Access"}</h2>
        <p>{message || "Sign up or log in to use this feature and create your job-winning resume."}</p>
        <div className={styles.actions}>
          <button className={styles.signupButton} onClick={() => navigate('/register')}>
            Sign Up for Free
          </button>
          <button className={styles.loginButton} onClick={() => navigate('/login')}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturePreviewCTA;
