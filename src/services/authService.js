import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";
import { unloadGuidefoxAgent } from "../lib/loadGuidefox";

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
    console.error("Google Login Failed:", err);
    if (!err.response) {
      message.error("Network Error. Please check your internet connection.", 5);
      return;
    }
    message.error(
      err.response?.data?.error || "An error occurred. Please try again."
    );
    setError(
      err.response?.data || { error: "An error occurred. Please try again." }
    );
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
    //message.success("Password reset link sent to your email.", [2]);
    navigate("/check-email", { state: { email } });
    return res.data;
  } catch (e) {
    console.log("Error Resetting Password: ", e);
    setError(
      e.response?.data || { error: "An error occurred. Please try again later" }
    );
    message.error(
      e.response?.data?.error || "Something went wrong. Please try again later",
      [6]
    );
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
    setTimeout(() => navigate("/login"), 2000);
    return res.data;
  } catch (e) {
    console.log("Error Resetting Password: ", e);
    message.error(
      e.response?.data?.error || "An error occurred. Please try again later"
    );
    setError(
      e.response?.data || { error: "An error occurred. Please try again later" }
    );
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
    console.error("Login Failed:", err);
    if (err.message === "Network Error") {
      message.error("Network Error. Please check your internet connection.", 5);
    } else {
      message.error(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
    setError(
      err.response?.data || { error: "An error occurred. Please try again." }
    );
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
    console.error("Registration Error:", err);
    if (err.message === "Network Error") {
      message.error("Network Error!", 5);
      setError(
        err.response?.data || {
          error: "Network Error. Please check your internet connection.",
        }
      );
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
