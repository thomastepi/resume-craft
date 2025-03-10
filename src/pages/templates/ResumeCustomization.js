import React, { useState, useContext } from "react";
import { message, Spin } from "antd";
import AIResumeComponent from "../../components/AIResumeComponent";
import AlertBox from "../../components/AlertBox";
import useIsMobile from "../../hooks/useIsMobile";
import "../../resources/styles/pages/templates/template3.css";
import checkMandatoryFields from "../../utils/validatePrompt";
import { generateResumePrompt } from "../../utils/aiResumeUtils";
import { ResumeContext } from "../../context/ResumeContext";
import { getErrorMessage } from "../../utils/errorHandler";
import CustomizationPanel from "../../components/CustomizationFields/CustomizationPanel";
import { useNavigate } from "react-router-dom";

const ResumeCustomization = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("Single Column");
  const [writingStyle, setWritingStyle] = useState("Professional");
  const [fontChoice, setFontChoice] = useState("Serif");
  const [themeColor, setThemeColor] = useState("rgb(33, 37, 41)");
  const [optimizeForATS, setOptimizeForATS] = useState(false);

  const [errorStatus, setErrorStatus] = useState(null);
  const [remainingGenerations, setRemainingGenerations] = useState(null);
  const navigate = useNavigate();

  const isMobile = useIsMobile();
  const resumeCustomiztions = {
    selectedLanguage,
    selectedLayout,
    writingStyle,
    fontChoice,
    themeColor,
    optimizeForATS,
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    generatedHTML,
    setGeneratedHTML,
    loading,
    setLoading,
    setIsGenerating,
  } = useContext(ResumeContext);

  const handleGenerateResume = async () => {
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
      const prompt = generateResumePrompt(user, resumeCustomiztions);
      setLoading(true);
      setIsGenerating(true);
      setAlert("LOADING...please wait while the AI Robots work their magic");
      setGeneratedHTML("");
      const result = await fetch(`${baseUrl}/api/user/build`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ text: prompt.trim() }),
      });

      if (!result.ok) {
        throw result;
      }

      const rateLimitHeader =
        result.headers.get("RateLimit") ||
        result.headers.get("ratelimit-remaining");

      let remainingRequests = "Unknown";

      if (rateLimitHeader) {
        const match = rateLimitHeader.match(/r=(\d+)/);
        if (match) {
          remainingRequests = match[1];
        }
      }

      setRemainingGenerations(remainingRequests);

      const reader = result.body.getReader();
      const decoder = new TextDecoder();
      let fullResume = "";
      let firstChunkReceived = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullResume += chunk;
        setGeneratedHTML(fullResume);
        if (!firstChunkReceived && fullResume.length > 500) {
          setLoading(false);
          firstChunkReceived = true;
        }
      }
      setIsGenerating(false);
      message.success("Resume Generated Successfully!");
    } catch (err) {
      console.error("Error", err);
      setLoading(false);
      setIsGenerating(false);
      setErrorStatus(err?.status || null);

      const errorMessage = await getErrorMessage(err);

      if (err.message === "Failed to fetch") {
        message.error("Network Error. Please check your internet connection.");
        return;
      }

      switch (err.status) {
        case 401:
          setAlertTitle(errorMessage.error || "Unauthorized");
          setAlertType("error");
          message.error(
            errorMessage.error ||
              "You are not authorized to perform this action.",
            6
          );
          setError(errorMessage.message || "Please log in to continue.");
          setTimeout(() => {
            navigate("/login");
            localStorage.clear();
          }, 2000);
          break;

        case 429:
          setAlertTitle(errorMessage.error || "Rate Limit Exceeded");
          setAlertType("error");
          message.error(
            errorMessage.error ||
              "You've reached the limit of resume generations. Please wait."
          );
          setError(errorMessage.message || "Try again later.");
          break;

        case 403:
          setAlertTitle(errorMessage.error || "Access Denied");
          setAlertType("warning");
          message.warning(
            errorMessage.error || "You don't have permission for this action."
          );
          setError(
            errorMessage.message || "Please sign up to unlock this feature."
          );
          break;

        default:
          setAlertTitle(errorMessage.error || "An error occurred!");
          setAlertType("error");
          message.error(
            errorMessage.error ||
              "An unexpected error occurred. Please try again."
          );
          setError(
            errorMessage.message || "Unexpected error. Please try again."
          );
          break;
      }
    } finally {
      setLoading(false);
      setIsGenerating(false);
      setAlert("");
    }
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
              alertTitle === "Missing Fields"
                ? "/profile"
                : errorStatus === 403
                ? "/register"
                : "/login"
            }
            endSession={alertTitle === "Missing Fields" ? false : true}
            btnText={
              alertTitle === "Missing Fields"
                ? "Update Profile"
                : errorStatus === 403
                ? "Sign Up Now"
                : "Log In Now"
            }
            setError={setError}
            showActionButton={![429, 500, 503].includes(errorStatus)}
          />
        )}
      </div>

      {loading && <Spin size="large" />}
      {alert && !generatedHTML && (
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
            <h4>Customize your resume before generating</h4>
          </div>

          <div className="options-container">
            <CustomizationPanel
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
              writingStyle={writingStyle}
              setWritingStyle={setWritingStyle}
              fontChoice={fontChoice}
              setFontChoice={setFontChoice}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              optimizeForATS={optimizeForATS}
              setOptimizeForATS={setOptimizeForATS}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>

          {remainingGenerations !== null && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <AlertBox
                message={`You have ${remainingGenerations} resume ${
                  remainingGenerations === "1" ? "generation" : "generations"
                } left this hour.`}
                type={remainingGenerations > 2 ? "info" : "warning"}
                showIcon
              />
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="btn-secondary" onClick={handleGenerateResume}>
              <div className="btn-seconday-state"></div>
              <span className="btn-secondary-contents">Generate Resume</span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ResumeCustomization;
