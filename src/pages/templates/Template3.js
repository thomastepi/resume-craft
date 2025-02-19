import React, { useState, useContext } from "react";
import { message, Spin, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
//import { jwtDecode } from "jwt-decode";
import AIResumeComponent from "../../components/AIResumeComponent";
import AlertBox from "../../components/AlertBox";
import useIsMobile from "../../hooks/useIsMobile";
import "./template3.css";
import checkMandatoryFields from "../../utils/validatePrompt";
import { generateResumePrompt } from "../../utils/aiResumeUtils";
import { ResumeContext } from "../../context/ResumeContext";

const Template3 = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const isMobile = useIsMobile();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    generatedHTML,
    setGeneratedHTML,
    setIsCVGenerated,
    loading,
    setLoading,
  } = useContext(ResumeContext);

  const handleClick = async (selectedStyle) => {
    const missingFields = checkMandatoryFields(user);
    if (missingFields.length > 0) {
      setAlertTitle("Missing Fields");
      setAlertType("error");
      message.error("Missing Fields. Please update your profile.");
      setError(
        <div>
          <p style={{ marginBottom: "0" }}>
            Please update the following sections of your profile before
            generating your resume:
          </p>
          <ul>
            {missingFields.map((field) => (
              <li key={field}>
                <em>{field}</em>
              </li>
            ))}
          </ul>
        </div>
      );
      return;
    }
    try {
      const prompt = generateResumePrompt(
        user,
        selectedStyle,
        selectedLanguage
      );
      setLoading(true);
      setAlert("LOADING...please wait while the AI Robots work their magic");
      const result = await axios.post(
        `${baseUrl}/api/user/build`,
        {
          text: prompt.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (result.status === 200) {
        setIsCVGenerated(true);
        setGeneratedHTML(result.data.data[0].message.content);
        message.success("Resume Generated Successfully!");
      } else {
        message.error("Something went wrong. Please try again later");
      }
    } catch (err) {
      console.error("Error", err);
      setIsCVGenerated(false);
      if (err.message === "Network Error") {
        message.error("Network Error. Please check your internet connection.");
        return;
      }

      if (err && err.response.status === 429) {
        setAlertTitle("Quota Exceeded");
        setAlertType("error");
        message.error("Quota Exceeded. Please try again later.");
      } else if (err.response.status === 403) {
        setAlertTitle("Unauthorized Access!");
        setAlertType("warning");
        message.warning("Unauthorized Access. Please login/signup.");
      } else {
        setAlertTitle("An error occurred!");
        setAlertType("error");
        message.error("An error occurred. Please try again.");
      }
      setError(err.response.data);
    } finally {
      setLoading(false);
      setAlert("");
    }
  };

  const templateStyle = [
    {
      key: "1",
      label: (
        <span
          style={{ width: "100%", display: "block" }}
          onClick={() => handleClick("Modern")}
        >
          Modern
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          style={{ width: "100%", display: "block" }}
          onClick={() => handleClick("Classic")}
        >
          Classic
        </span>
      ),
    },
  ];

  const languageOptions = [
    { key: "1", label: "English" },
    { key: "2", label: "French" },
    { key: "3", label: "Spanish" },
  ];

  const handleLanguageChange = (key) => {
    const selected = languageOptions.find((option) => option.key === key);
    setSelectedLanguage(selected.label);
  };

  return (
    <>
      <div
        style={{ width: `${isMobile ? "95%" : "50%"}`, margin: "10px auto" }}
      >
        {error && (
          <AlertBox
            message={error}
            title={alertTitle}
            type={alertType}
            navigateTo={
              alertTitle === "Missing Fields" ? "/profile" : "/register"
            }
            endSession={alertTitle === "Missing Fields" ? false : true}
            btnText={
              alertTitle === "Missing Fields" ? "Update Profile" : "Sign Up Now"
            }
            setError={setError}
            showActionButton={true}
          />
        )}
      </div>
      {loading && <Spin size="large" />}
      {alert && (
        <>
          <div style={{ textAlign: "center" }}>
            <h4>{alert}</h4>
          </div>
          <Spin size="large" />
        </>
      )}
      {generatedHTML && <AIResumeComponent />}
      {!generatedHTML && !alert && !error && (
        <>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h4>
              Select a language and choose a template style to automatically
              generate your resume.
            </h4>
          </div>
          <div className="options-dropdown">
            <label
              htmlFor="language-dropdown"
              style={{
                textAlign: "center",
                display: "block",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Resume Language
            </label>
            <Dropdown
              className="language-dropdown"
              menu={{
                items: languageOptions.map((lang) => ({
                  key: lang.key,
                  label: (
                    <span
                      onClick={() => handleLanguageChange(lang.key)}
                      style={{ display: "block", cursor: "pointer" }}
                    >
                      {lang.label}
                    </span>
                  ),
                })),
              }}
              trigger={["click"]}
            >
              <button className="language-button" type="button">
                <Space>
                  {selectedLanguage} <DownOutlined />
                </Space>
              </button>
            </Dropdown>

            <Dropdown
              menu={{
                items: templateStyle,
                selectable: true,
              }}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <button
                className="template-button"
                type="button"
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  Select Template Style
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
          </div>
        </>
      )}
    </>
  );
};

export default Template3;
