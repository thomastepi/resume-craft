import React, { useState } from "react";
import { message, Spin, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import AIGeneratedCV from "./AIGeneratedCV";
import AlertBox from "../../components/AlertBox";
import useIsMobile from "../../hooks/useIsMobile";
import "./template3.css";

const Template3 = () => {
  const [loading, setLoading] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [isCVGenerated, setIsCVGenerated] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertType, setAlertType] = useState("");
  const isMobile = useIsMobile();

  //console.log(isMobile);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const checkMandatoryFields = (user) => {
    const missingFields = [];
    if (!user.firstName || !user.lastName) missingFields.push("Full Name");
    if (!user.email) missingFields.push("Email");
    if (!user.mobileNumber) missingFields.push("Phone Number");
    if (!user.summary) missingFields.push("Summary");
    if (!user.skills || user.skills.length === 0) missingFields.push("Skills");
    if (!user.education || user.education.length === 0)
      missingFields.push("Education");

    return missingFields;
  };

  const handleClick = async (selectedStyle) => {
    try {
      const styleToUse = selectedStyle.toLowerCase();
      const user = JSON.parse(localStorage.getItem("user"));
      const missingFields = checkMandatoryFields(user);
      if (missingFields.length > 0) {
        setIsCVGenerated(true);
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
            <p style={{ marginBottom: "0" }}>
              Hover over your name on the top right corner and select{" "}
              <strong>Profile</strong> from the dropdown.
            </p>
          </div>
        );
        return;
      }
      const {
        firstName,
        lastName,
        email,
        portfolio,
        mobileNumber,
        address,
        skills,
        education,
        experience,
        projects,
        summary,
        certifications,
        languages,
      } = user;
      const skillsString = skills.map((skill) => `${skill.skill}`).join(", ");
      const educationString = education
        .map(
          (edu) =>
            `Qualification: ${edu.qualification}, Institution: ${edu.institution}`
        )
        .join(", ");
      const certificationsString = certifications
        .map(
          (cert) =>
            `Certification name: ${cert.name}, Issuer: ${cert.organization}, Date: ${cert.year}`
        )
        .join(", ");
      const languagesString = languages
        .map(
          (lang) =>
            `Language: ${lang.language}, Proficiency: ${lang.proficiency}`
        )
        .join(", ");
      const experienceString = experience
        .map(
          (exp) =>
            `Employer: ${exp.company}, Role: ${exp.role}, Description: ${exp.roleDescription},  Place: ${exp.place}, Duration: ${exp.range}`
        )
        .join(", ");
      const projectsString = projects
        .map(
          (proj) => `Projects: ${proj.title}, Description: ${proj.description}`
        )
        .join(", ");

      setIsCVGenerated(false);
      setAlert("LOADING...please wait while the AI Robots work their magic");
      const result = await axios.post(
        `${baseUrl}/api/user/build`,
        {
          text: `Create a professional HTML-based resume in ${selectedLanguage} with the following details:
- Full Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${mobileNumber}
- Address: ${address || "N/A"}
- Portfolio: ${portfolio || "N/A"}
- Summary: ${summary || "N/A"}
- Skills: ${skillsString || "N/A"}
- Education: ${educationString || "N/A"}
- Experience: ${experienceString || "N/A"}
- Projects: ${projectsString || "N/A"}
- Certifications: ${certificationsString || "N/A"}
- Languages: ${languagesString || "N/A"}

Requirements:
- Use the "${styleToUse}" template style.
- If the template is "modern":
  - Use a minimalist design with sans-serif fonts, subtle colors (e.g., gray or blue), and clean lines.
  - Include rounded borders, soft shadows, and prominent headers.
  - Focus on spacing and typography for a sleek appearance.
- If the template is "classic":
  - Use a traditional design with serif fonts and a simple black-and-white color scheme.
  - Add a border around the entire resume for a structured look.
  - Focus on straightforward readability and avoid complex design elements.
  
Additional Guidelines:
- Highlight key achievements using bullet points.
- Organize the content into sections: "Objective," "Skills," "Education," "Experience," and "Projects" in this order.
- Provide placeholders like "N/A" for missing data.
- Translate all content, including section titles, into ${selectedLanguage}.
- Return the complete HTML and inline CSS in a <div> element.`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (result.status === 200) {
        setIsCVGenerated(true);
        setAlert("");
        setGeneratedHTML(result.data.data[0].message.content);
        setLoading(false);
        message.success("Your AI Resume is Ready!");
      }
    } catch (err) {
      console.error("Error", err);
      setLoading(false);
      setIsCVGenerated(true);
      setAlert("");
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
        setAlertType("info");
        message.info("Unauthorized Access. Please login/signup.");
      } else {
        setAlertTitle("An error occurred!");
        setAlertType("error");
        message.error("An error occurred. Please try again.");
      }
      setError(err.response.data);
    }
  };

  const templateStyle = [
    {
      key: "1",
      label: (
        <span
          style={{ width: "100%", display: "block" }}
          onClick={() => {
            const selectedStyle = "Modern";
            handleClick(selectedStyle);
          }}
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
          onClick={() => {
            const selectedStyle = "Classic";
            handleClick(selectedStyle);
          }}
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
    <div>
      <div
        style={{ width: `${isMobile ? "95%" : "50%"}`, margin: "10px auto" }}
      >
        {error && (
          <AlertBox
            message={error}
            setError={setError}
            title={alertTitle}
            type={alertType}
          />
        )}
      </div>
      {loading && <Spin size="large" />}
      {!isCVGenerated && (
        <>
          <div style={{ textAlign: "center" }}>
            <h4>{alert}</h4>
          </div>
          <Spin size="large" />
        </>
      )}
      {isCVGenerated && generatedHTML && (
        <>
          <div>
            <AIGeneratedCV generatedHTML={generatedHTML} />
          </div>
        </>
      )}
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
    </div>
  );
};

export default Template3;
