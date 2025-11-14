import "../../resources/styles/pages/templates/templates.css";

const Template3 = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="template3-parent">
      {/* Header */}
      <div className="template3-header d-flex justify-content-between">
        <div className="template3-name">
          <h1>
            {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
          </h1>
        </div>
        <div className="template3-contact text-right">
          <p>{user.email}</p>
          <p>{user.mobileNumber}</p>
          <p>{user.address}</p>
          <p>{user.portfolio}</p>
        </div>
      </div>

      <div className="divider mt-3"></div>

      <div className="template3-body d-flex mt-3">
        {/* left column */}
        <div className="template3-left-column">
          {/* Summary */}
          {user.summary && (
            <div className="objective mb-4">
              <h3 className="template3-section-title">Summary</h3>
              <hr />
              <p>{user.summary}</p>
            </div>
          )}

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="skills mb-4">
              <h3 className="template3-section-title">Skills</h3>
              <hr />
              {user.skills.map((skill, index) => (
                <div key={index} className="d-flex flex-column">
                  <p>- {skill.skill}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {user.languages && user.languages.length > 0 && (
            <div className="languages mb-4">
              <h3 className="template3-section-title">Languages</h3>
              <hr />
              {user.languages.map((lang, index) => (
                <div key={index} className="d-flex flex-column">
                  <p>
                    <strong>{lang.language}</strong> ({lang.proficiency})
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* right column */}
        <div className="template3-right-column">
          {/* Experience */}
          {user.experience && user.experience.length > 0 && (
            <div className="experience mb-4">
              <h3 className="template3-section-title">Experience</h3>
              <hr />
              {user.experience.map((exp, index) => (
                <div
                  key={index}
                  className="d-flex flex-column"
                  style={{ marginBottom: 15 }}
                >
                  <p>
                    <strong>{exp.company}</strong> | <strong>{exp.role}</strong>{" "}
                    | <strong>{exp.place}</strong>
                  </p>
                  <h6 style={{ width: 120 }}>
                    <strong>{exp.range} :</strong>
                  </h6>
                  <p>{exp.roleDescription}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {user.projects && user.projects.length > 0 && (
            <div className="projects mb-4">
              <h3 className="template3-section-title">Projects</h3>
              <hr />
              {user.projects.map((project, index) => (
                <div key={index} className="d-flex flex-column">
                  <h6>
                    <strong>
                      {project.title} [{project.range}]
                    </strong>
                  </h6>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {user.education && user.education.length > 0 && (
            <div className="education mb-4">
              <h3 className="template3-section-title">Education</h3>
              <hr />
              {user.education.map((education, index) => (
                <div key={index} className="d-flex align-items-center">
                  <h6 style={{ width: 120 }}>
                    <strong>{education.range} :</strong>
                  </h6>
                  <p>
                    <strong>{education.qualification}</strong> |{" "}
                    <strong>{education.institution}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {user.certifications && user.certifications.length > 0 && (
            <div className="certifications mb-4">
              <h3 className="template3-section-title">Certifications</h3>
              <hr />
              {user.certifications.map((cert, index) => (
                <div key={index} className="d-flex flex-column">
                  <p>
                    <strong>{cert.name}</strong> ({cert.organization}) [
                    {cert.year}]
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template3;
