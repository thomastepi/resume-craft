import React, { useState } from "react";
import { message, Spin, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import AIGeneratedCV from "./AIGeneratedCV";
import AlertBox from "../../components/AlertBox";
import useIsMobile from "../../hooks/useIsMobile";

const Template3 = () => {
  const [loading, setLoading] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [isCVGenerated, setIsCVGenerated] = useState(true);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const isMobile = useIsMobile();

  //console.log(isMobile);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const checkMandatoryFields = (user) => {
    const missingFields = [];
    if (!user.firstName || !user.lastName) missingFields.push("Full Name");
    if (!user.email) missingFields.push("Email");
    if (!user.mobileNumber) missingFields.push("Phone Number");
    if (!user.careerObjective) missingFields.push("Career Objective");
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
        message.error("Missing Fields. Please update your profile.");
        setError(
          <div>
            <p style={{ marginBottom: "0" }}>
              Please update the following sections of your profile before
              generating your resume:
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <em>{missingFields.join(", ")}</em>
            </p>
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
        mobileNumber,
        address,
        skills,
        education,
        experience,
        projects,
        careerObjective,
      } = user;
      const skillsString = skills
        .map((skill) => `${skill.skill}: ${skill.rating}`)
        .join(", ");
      const educationString = education
        .map(
          (edu) =>
            `Qualification: ${edu.qualification}, Institution: ${edu.institution}, GPA:${edu.gpa}`
        )
        .join(", ");
      const experienceString = experience
        .map(
          (exp) =>
            `Employer: ${exp.company}, Role: ${exp.role}, Place: ${exp.place}, Duration: ${exp.range}`
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
          text: `Create a professional HTML-based resume with the following details:
    - Full Name: ${firstName} ${lastName}
    - Email: ${email}
    - Phone: ${mobileNumber}
    - Address: ${address || "N/A"}
    - Career Objective: ${careerObjective || "N/A"}
    - Skills: ${skillsString || "N/A"}
    - Education: ${educationString || "N/A"}
    - Experience: ${experienceString || "N/A"}
    - Projects: ${projectsString || "N/A"}
    
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
        message.error("Quota Exceeded. Please try again later.");
      } else if (err.response.status === 403) {
        setAlertTitle("Unauthorized Access!");
        message.error("Unauthorized Access. Please login/signup.");
      } else {
        setAlertTitle("An error occurred!");
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

  return (
    <div>
      <div
        style={{ width: `${isMobile ? "95%" : "50%"}`, margin: "10px auto" }}
      >
        {error && (
          <AlertBox message={error} setError={setError} title={alertTitle} />
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
      {generatedHTML === "" && alert === "" && !error && (
        <>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h4>
              Select a template style and click the button below to generate
              your resume.
            </h4>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Dropdown
              menu={{
                items: templateStyle,
                selectable: true,
              }}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <button
                style={{
                  borderRadius: "5px",
                  marginLeft: "20px",
                  marginBottom: "20px",
                }}
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
