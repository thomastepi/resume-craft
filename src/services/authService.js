import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

const baseUrl = process.env.REACT_APP_BASE_URL;

const storeUserSession = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("accessToken", userData.accessToken);
  const decodedToken = jwtDecode(userData.accessToken);
  localStorage.setItem("tokenExpiry", decodedToken.exp);
};

export const loginWithGoogle = async (credential, navigate, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(`${baseUrl}/api/user/google-oauth`, {
      token: credential,
    });
    const { firstName, username } = res.data;

    storeUserSession(res.data);

    const name = username === "guest" ? `Guest User` : firstName || username;
    message.success(`Welcome, ${name}!`);

    setTimeout(() => navigate("/home"), 2000);
    return res.data;
  } catch (err) {
    console.error("Google Login Failed:", err);
    if (!err.response) {
      message.error("Network Error. Please check your internet connection.", 5);
      return;
    }
    message.error(
      err.response?.data?.message || "An error occurred. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const loginWithCredentials = async (
  values,
  captchaToken,
  navigate,
  setLoading
) => {
  if (!captchaToken && values.username !== "guest") {
    message.error("Please complete the reCAPTCHA.");
    return;
  }

  try {
    setLoading(true);
    const res = await axios.post(`${baseUrl}/api/user/login`, {
      ...values,
      captchaToken,
    });
    const { firstName, username } = res.data;

    storeUserSession(res.data);

    const name = username === "guest" ? `Guest User` : firstName || username;
    message.success(`Welcome, ${name}!`);

    setTimeout(() => navigate("/home"), 2000);
    return res.data;
  } catch (err) {
    console.error("Login Failed:", err);
    if (err.message === "Network Error") {
      message.error("Network Error. Please check your internet connection.", 5);
    } else {
      message.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  } finally {
    setLoading(false);
  }
};

export const registerUser = async (
  values,
  captchaToken,
  navigate,
  setLoading
) => {
  if (!captchaToken && values.username !== "guest") {
    message.error("Please complete the reCAPTCHA.");
    return;
  }

  try {
    setLoading(true);
    if (values.username !== "guest") {
      await axios.post(`${baseUrl}/api/user/register`, values);
    }

    await loginWithCredentials(values, captchaToken, navigate, setLoading);
  } catch (err) {
    console.error("Registration Error:", err);
    if (err.message === "Network Error") {
      message.error("Network Error. Please check your internet connection.", 5);
      return;
    }
    message.error(
      err.response?.data?.message || "An error occurred. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const registerGuestLogin = async () => {
  try {
    axios.post(`${baseUrl}/api/user/guest-log`);
  } catch (err) {
    console.error("Guest Log Failed:", err);
    message.error(
      err.response?.data?.message || "An error occurred. Please try again."
    );
  }
};

export const logoutUser = (navigate) => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenExpiry");
  message.success("Logged out successfully!");
  navigate("/login");
};

export const isUserSessionValid = () => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (!tokenExpiry) return false;
  return Date.now() / 1000 < parseInt(tokenExpiry, 10);
};
