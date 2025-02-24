import React from "react";
import "../../resources/styles/pages/templates/templates.css";

const Template2 = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="template1-parent">
      <div className="top d-flex flex-column">
        <h1>
          {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
        </h1>
        <div>
          <p>{user.email}</p>
          <p>{user.address}</p>
          <p>{user.mobileNumber}</p>
          <p>{user.portfolio}</p>
        </div>
      </div>

      <div className="divider mt-3"></div>
      <div className="divider mt-1"></div>

      <div className="objective mt-3">
        <h3 style={{ backgroundColor: "grey", padding: "10px" }}>Summary</h3>
        <hr />
        <p>{user.summary}</p>
      </div>

      <div className="divider mt-3"></div>

      <div className="skills mt-3">
        <h3 style={{ backgroundColor: "grey", padding: "10px" }}>Skills</h3>
        <hr />
        {user.skills.map((skill, index) => {
          return (
            <div key={index} className="d-flex flex-column">
              <p>- {skill.skill}</p>
            </div>
          );
        })}
      </div>

      <div className="divider mt-3"></div>

      <div className="education mt-3">
        <h3 style={{ backgroundColor: "grey", padding: "10px" }}>Education</h3>
        <hr />
        {user.education.map((education, index) => {
          return (
            <div key={index} className="d-flex align-items-center">
              <h6 style={{ width: 120 }}>
                <strong>{education.range} : </strong>
              </h6>
              <p>
                <strong>{education.qualification} </strong> |
                <strong> {education.institution}</strong> |
              </p>
            </div>
          );
        })}
      </div>

      {user.experience.length > 0 && (
        <>
          <div className="divider mt-3"></div>

          <div className="experience mt-3">
            <h3 style={{ backgroundColor: "grey", padding: "10px" }}>
              Experience
            </h3>
            <hr />
            {user.experience.map((exp, index) => {
              return (
                <div
                  key={index}
                  className="d-flex flex-column"
                  style={{ marginBottom: 15 }}
                >
                  <p>
                    <strong>{exp.company} </strong> |
                    <strong> {exp.role} </strong> |<strong> {exp.place}</strong>
                  </p>
                  <h6 style={{ width: 120 }}>
                    <strong>{exp.range} : </strong>
                  </h6>
                  <p>{exp.roleDescription}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {user.projects.length > 0 && (
        <>
          <div className="divider mt-3"></div>

          <div className="projects mt-3">
            <h3 style={{ backgroundColor: "grey", padding: "10px" }}>
              Projects
            </h3>
            <hr />
            {user.projects.map((project, index) => {
              return (
                <div key={index} className="d-flex flex-column">
                  <h6>
                    <strong>
                      {project.title} [{project.range}]{" "}
                    </strong>
                  </h6>
                  <p>{project.description}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {user.certifications.length > 0 && (
        <>
          <div className="divider mt-3"></div>

          <div className="certifications mt-3">
            <h3 style={{ backgroundColor: "grey", padding: "10px" }}>
              Certifications
            </h3>
            <hr />
            {user.certifications.map((cert, index) => {
              return (
                <div key={index} className="d-flex flex-column">
                  <p>
                    <strong>{cert.name} </strong> ({cert.organization}) [
                    {cert.year}]
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="divider mt-3"></div>

      <div className="languages mt-3">
        <h3 style={{ backgroundColor: "grey", padding: "10px" }}>Languages</h3>
        <hr />
        {user.languages.map((lang, index) => {
          return (
            <div key={index} className="d-flex flex-column">
              <p>
                <strong>{lang.language} </strong> ({lang.proficiency})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Template2;
