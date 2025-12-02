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
              <p>- {skill.skill || skill}</p>
            </div>
          );
        })}
      </div>

      <div className="divider mt-3"></div>

      <div className="education mt-3">
        <h3 style={{ backgroundColor: "grey", padding: "10px" }}>
          {user.education.length > 0 ? "Education" : ""}
        </h3>
        <hr />
        {user.education.map((e, index) => {
          return (
            <div key={index} className="d-flex align-items-center">
              <h6 style={{ width: 120 }}>
                <strong>
                  {e.range || ""} {e.range && ":"}{" "}
                </strong>
                <strong>
                  {e.startDate ? `${e.startDate} - ${e.endDate}` : e.endDate} :{" "}
                </strong>
              </h6>
              <p>
                <strong>{e.qualification || e.degree} </strong> |
                <strong> {e.institution}</strong> |
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
                    <strong> {exp.role || exp.title} </strong> |
                    <strong> {exp.place || exp.location}</strong>
                  </p>
                  <h6 style={{ width: 500 }}>
                    <strong>{exp.range || ""} </strong>
                    <strong>
                      {exp.startDate
                        ? `${exp.startDate} - ${exp.endDate}`
                        : exp.endDate}
                    </strong>
                  </h6>
                  <p>{exp.roleDescription || ""}</p>
                  <ul>
                    {exp.description?.length > 0 &&
                      exp.description.map((d, index) => (
                        <li key={index}>{d}</li>
                      ))}
                  </ul>
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
                      {project.title || project.name} {[project.range || ""]}{" "}
                    </strong>
                  </h6>
                  <p>{project.description || ""}</p>
                  <ul>
                    {Array.isArray(project.description) &&
                      project.description.length > 0 &&
                      project.description.map((d, index) => (
                        <li key={index}>{d}</li>
                      ))}
                  </ul>
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
                    <strong>{cert.name || cert || ""} </strong>
                    {cert.organization} {cert.year && "- "}
                    {cert.year}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {user.languages.length > 0 && (
        <>
          <div className="divider mt-3"></div>

          <div className="languages mt-3">
            <h3 style={{ backgroundColor: "grey", padding: "10px" }}>
              {user.languages.length > 0 ? "Languages" : ""}
            </h3>
            <hr />
            {user.languages.map((lang, index) => {
              return (
                <div key={index} className="d-flex flex-column">
                  <p>
                    <strong>{lang.language || lang} </strong>{" "}
                    {lang.proficiency || ""}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Template2;
