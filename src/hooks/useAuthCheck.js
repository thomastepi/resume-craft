import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("user");
      message.error("Session Expired. Please login again.");
      navigate("/login");
    };

    const checkTokenExpiration = () => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (!tokenExpiry) return;

      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= tokenExpiry) {
        handleLogout();
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [navigate]);
};

export default useAuthCheck;
