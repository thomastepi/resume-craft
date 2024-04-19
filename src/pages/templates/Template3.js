import React, { useState } from "react";
import { message, Spin } from "antd";
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
  const isMobile = useIsMobile();

  console.log(isMobile);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
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
            `$Qualification: ${edu.qualification}, Institution: ${edu.institution}, GPA:${edu.gpa}`
        )
        .join(", ");
      const experienceString = experience
        .map(
          (exp) =>
            `$Employer: ${exp.company}, Role: ${exp.role}, Place: ${exp.place}, Duration: ${exp.range}`
        )
        .join(", ");
      const projectsString = projects
        .map(
          (proj) => `$Projects: ${proj.title}, Description: ${proj.description}`
        )
        .join(", ");

      setIsCVGenerated(false);
      setAlert("LOADING...please wait while the AI Robots work their magic");
      const result = await axios.post(
        `${baseUrl}/api/user/build`,
        {
          text: `generate a simple HTML-based resume styled with in-line CSS, using these values: first name:${firstName}, last name:${lastName}, email:${email}, phone:${mobileNumber}, adddress:${address}, objectives:${careerObjective}, skills:${skillsString}, education:${educationString}, experience:${experienceString}, projects:${projectsString}`,
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
      setLoading(false);
      setIsCVGenerated(true);
      setAlert("");
      setError(err.response.data);
    }
  };

  return (
    <div>
      <div
        style={{ width: `${isMobile ? "95%" : "50%"}`, margin: "10px auto" }}
      >
        {error && <AlertBox message={error} setError={setError} />}
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
            <h4>Click the button below to generate your resume</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleClick}
              style={{ borderRadius: "5px", marginLeft: "20px" }}
              type="button"
            >
              Generate AI Resume.
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Template3;
