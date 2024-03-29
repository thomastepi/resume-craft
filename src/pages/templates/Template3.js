import React, { useState } from "react";
import { message, Spin } from "antd";
import axios from "axios";
import AIGeneratedCV from "./AIGeneratedCV";

const Template3 = () => {
  const [loading, setLoading] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [isCVGenerated, setIsCVGenerated] = useState(true);
  const [alert, setAlert] = useState("");
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
        console.log(result);
        setGeneratedHTML(result.data.data[0].message.content);
        setLoading(false);
        message.success("Resume generated Successfully");
      }
    } catch (err) {
      setLoading(false);
      setIsCVGenerated(true);
      setAlert("");
      message.error(err.response.data);
      console.log(err);
    }
  };

  return (
    <div>
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
      {generatedHTML === "" && alert === "" && (
        <>
          <div style={{ textAlign: "center" }}>
            <h4>Click the button below to generate your resume</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleClick}
              style={{ borderRadius: "5px", marginLeft: "20px" }}
              type="button"
            >
              Generate Resume using AI
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Template3;
