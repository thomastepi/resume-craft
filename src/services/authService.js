import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";
import { unloadGuidefoxAgent } from "../lib/loadGuidefox";
import { handleError } from "../utils/errorHandler";

const baseUrl = process.env.REACT_APP_BASE_URL;

const storeUserSession = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("accessToken", userData.accessToken);
  const decodedToken = jwtDecode(userData.accessToken);
  localStorage.setItem("tokenExpiry", decodedToken.exp);
};

export const loginWithGoogle = async (
  access_token,
  navigate,
  setLoading,
  setError
) => {
  try {
    setLoading(true);
    const res = await axios.post(`${baseUrl}/api/user/google-oauth`, {
      token: access_token,
    });
    const { firstName, username } = res.data;
    storeUserSession(res.data);
    const name = username === "guest" ? `Guest User` : firstName || username;
    message.success(`Welcome, ${name}!`);
    setTimeout(() => navigate("/home"), 2000);
    return res.data;
  } catch (err) {
    handleError(err, setError, "GOOGLE_LOGIN_FAILED");
  } finally {
    setLoading(false);
  }
};

export const forgetPassword = async (
  email,
  captchaToken,
  setLoading,
  navigate,
  setError
) => {
  if (!captchaToken) {
    message.error("Please complete the reCAPTCHA.");
    return;
  }
  try {
    setLoading(true);
    const res = await axios.post(`${baseUrl}/api/user/forget-password`, {
      email,
      captchaToken,
    });
    navigate("/check-email", { state: { email } });
    return res.data;
  } catch (e) {
    handleError(e, setError, "PASSWORD_RESET_FAILED");
  } finally {
    setLoading(false);
  }
};

export const resetPassword = async (
  newPassword,
  resetToken,
  captchaToken,
  setLoading,
  navigate,
  setError
) => {
  try {
    setLoading(true);
    const res = await axios.post(`${baseUrl}/api/user/reset-password`, {
      newPassword,
      resetToken,
      captchaToken,
    });
    message.success("Password reset successfully.", [6]);
    setTimeout(() => navigate("/reset-success"), 2000);
    return res.data;
  } catch (e) {
    handleError(e, setError, "PASSWORD_RESET_FAILED");
  } finally {
    setLoading(false);
  }
};

export const loginWithCredentials = async (
  values,
  captchaToken,
  navigate,
  setLoading,
  setError
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
    handleError(err, setError, "LOGIN_FAILED");
  } finally {
    setLoading(false);
  }
};

export const registerUser = async (
  values,
  captchaToken,
  navigate,
  setLoading,
  setError
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
    await loginWithCredentials(
      values,
      captchaToken,
      navigate,
      setLoading,
      setError
    );
  } catch (err) {
    handleError(err, setError, "REGISTRATION_FAILED");
  } finally {
    setLoading(false);
  }
};

export const registerGuestLogin = async (setError) => {
  try {
    await axios.post(`${baseUrl}/api/user/guest-login`);
  } catch (err) {
    handleError(err, setError, "GUEST_LOGIN_FAILED");
  }
};

export const logoutUser = (navigate) => {
  unloadGuidefoxAgent();
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenExpiry");
  message.success("Logged out successfully!");
  navigate("/login");
};

export const clearUserDataOnDelete = (navigate) => {
  unloadGuidefoxAgent();
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenExpiry");
  message.success("Account deleted successfully!");
  navigate("/register");
};

export const isUserSessionValid = () => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (!tokenExpiry) return false;
  return Date.now() / 1000 < parseInt(tokenExpiry, 10);
};
