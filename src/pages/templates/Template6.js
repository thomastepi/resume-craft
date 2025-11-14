import "../../resources/styles/pages/templates/templates.css";

const Template6 = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="template6-parent">
      {/* Header */}
      <div className="template6-header text-center">
        <h1>
          {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
        </h1>
        <div className="template6-contact d-flex flex-column align-items-center">
          <p>{user.email}</p>
          <p>{user.mobileNumber}</p>
          <p>{user.address}</p>
          <p>{user.portfolio}</p>
        </div>
      </div>

      <div className="divider mt-3"></div>

      {/* Summary */}
      {user.summary && (
        <div className="objective mt-3">
          <h3 className="template6-section-title">Summary</h3>
          <hr />
          <p>{user.summary}</p>
        </div>
      )}

      {/* Experience */}
      {user.experience && user.experience.length > 0 && (
        <>
          <div className="divider mt-3"></div>
          <div className="experience mt-3">
            <h3 className="template6-section-title">Experience</h3>
            <hr />
            {user.experience.map((exp, index) => (
              <div
                key={index}
                className="template6-experience-item"
                style={{ marginBottom: 15 }}
              >
                <div className="d-flex justify-content-between">
                  <p>
                    <strong>{exp.role}</strong> - <strong>{exp.company}</strong>
                  </p>
                  <p className="template6-range">{exp.range}</p>
                </div>
                <p className="template6-place">{exp.place}</p>
                <p>{exp.roleDescription}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Projects */}
      {user.projects && user.projects.length > 0 && (
        <>
          <div className="divider mt-3"></div>
          <div className="projects mt-3">
            <h3 className="template6-section-title">Projects</h3>
            <hr />
            {user.projects.map((project, index) => (
              <div key={index} className="template6-project-item mb-3">
                <div className="d-flex justify-content-between">
                  <h6>
                    <strong>{project.title}</strong>
                  </h6>
                  <span className="template6-range">{project.range}</span>
                </div>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Education */}
      {user.education && user.education.length > 0 && (
        <>
          <div className="divider mt-3"></div>
          <div className="education mt-3">
            <h3 className="template6-section-title">Education</h3>
            <hr />
            {user.education.map((education, index) => (
              <div key={index} className="template6-education-item mb-2">
                <div className="d-flex justify-content-between">
                  <p>
                    <strong>{education.qualification}</strong> -{" "}
                    <strong>{education.institution}</strong>
                  </p>
                  <span className="template6-range">{education.range}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <>
          <div className="divider mt-3"></div>
          <div className="skills mt-3">
            <h3 className="template6-section-title">Skills</h3>
            <hr />
            <ul className="template6-skills-list">
              {user.skills.map((skill, index) => (
                <li key={index}>{skill.skill}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Certifications */}
      {user.certifications && user.certifications.length > 0 && (
        <>
          <div className="divider mt-3"></div>
          <div className="certifications mt-3">
            <h3 className="template6-section-title">Certifications</h3>
            <hr />
            {user.certifications.map((cert, index) => (
              <div key={index} className="template6-cert-item">
                <p>
                  <strong>{cert.name}</strong> ({cert.organization}) [
                  {cert.year}]
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Languages */}
      {user.languages && user.languages.length > 0 && (
        <>
          <div className="divider mt-3"></div>
          <div className="languages mt-3">
            <h3 className="template6-section-title">Languages</h3>
            <hr />
            {user.languages.map((lang, index) => (
              <div key={index} className="template6-language-item">
                <p>
                  <strong>{lang.language}</strong> ({lang.proficiency})
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Template6;
