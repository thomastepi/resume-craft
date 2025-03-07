import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useInactivityLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleLogout, 60 * 60 * 1000);
    };

    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("user");
      message.error("Session Expired. Please login again.", 6);
      navigate("/login");
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);
};

export default useInactivityLogout;
