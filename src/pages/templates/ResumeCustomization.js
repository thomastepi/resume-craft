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

const ResumeCustomization = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("Single Column");
  const [writingStyle, setWritingStyle] = useState("Professional");
  const [fontChoice, setFontChoice] = useState("Serif");
  const [themeColor, setThemeColor] = useState("rgb(0, 150, 136)");
  const [optimizeForATS, setOptimizeForATS] = useState(false);

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
    setIsCVGenerated,
    loading,
    setLoading,
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

      const reader = result.body.getReader();
      const decoder = new TextDecoder();
      let fullResume = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullResume += decoder.decode(value, { stream: true });
        setGeneratedHTML(fullResume);
        setLoading(false);
      }

      setIsCVGenerated(true);
      message.success("Resume Generated Successfully!");
    } catch (err) {
      console.error("Error", err);
      setIsCVGenerated(false);
      const errorMessage = await getErrorMessage(err);
      if (errorMessage === "Failed to fetch") {
        message.error("Network Error. Please check your internet connection.");
        return;
      }

      if (err && err.status === 429) {
        setAlertTitle("Quota Exceeded");
        setAlertType("error");
        message.error("Quota Exceeded. Please try again later.");
        return;
      }
      if (err.status === 403) {
        setAlertTitle("Unauthorized Access!");
        setAlertType("warning");
        message.warning("Unauthorized Access. Please login/signup.");
        setError(errorMessage);
      } else {
        setAlertTitle("An error occurred!");
        setAlertType("error");
        message.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
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

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="generate-button" onClick={handleGenerateResume}>
              Generate Resume
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ResumeCustomization;
