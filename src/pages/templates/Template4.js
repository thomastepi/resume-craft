import "../../resources/styles/pages/templates/templates.css";

function Template4() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="template4-parent">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="m-0">
            {(user.firstName || "").toUpperCase()}{" "}
            {(user.lastName || "").toUpperCase()}
          </h1>
          <small className="text-muted">{user.role || ""}</small>
        </div>
        <div className="text-end">
          <div>{user.email}</div>
          <div>{user.mobileNumber}</div>
          <div>{user.portfolio}</div>
          <div>{user.address}</div>
        </div>
      </div>

      <div className="d-flex gap-3">
        {/* Sidebar */}
        <aside className="template4-sidebar p-3" style={{ minWidth: 260 }}>
          {/* Contact */}
          <div className="mb-4">
            <h5 className="template4-section-title">Contact</h5>
            <div className="small">
              <div>{user.email}</div>
              <div>{user.mobileNumber}</div>
              <div>{user.portfolio}</div>
              <div>{user.address}</div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <h5 className="template4-section-title">Skills</h5>
            <ul className="mb-0 ps-3">
              {user.skills?.map((skill, i) => (
                <li key={i} className="small">
                  {skill.skill || skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          {user.languages?.length > 0 && (
            <>
              <div className="mb-2">
                <h5 className="template4-section-title">Languages</h5>
                <ul className="mb-0 ps-3">
                  {user.languages?.map((lang, i) => (
                    <li key={i} className="small">
                      <strong>{lang.language || lang}</strong>{" "}
                      {lang.language && "-"} {lang.proficiency || ""}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </aside>

        <main className="flex-grow-1">
          {/* Summary */}
          <section className="mb-4">
            <h3 className="template4-h3">Summary</h3>
            <div className="template4-divider" />
            <p className="mb-0">{user.summary}</p>
          </section>

          {/* Experience */}
          {user.experience?.length > 0 && (
            <section className="mb-4">
              <h3 className="template4-h3">Experience</h3>
              <div className="template4-divider" />
              {user.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <strong>{exp.role || exp.title}</strong>
                    <small className="text-muted">
                      {exp.range || ""}{" "}
                      {exp.startDate
                        ? `${exp.startDate} - ${exp.endDate}`
                        : exp.endDate}
                    </small>
                  </div>
                  <div className="text-muted">
                    {exp.company} · {exp.place || exp.location}
                  </div>
                  <p className="mb-0">{exp.roleDescription}</p>
                  <ul>
                    {exp.description?.length > 0 &&
                      exp.description.map((d, index) => (
                        <li key={index}>{d}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {user.education?.length > 0 && (
            <>
              <section className="mb-4">
                <h3 className="template4-h3">Education</h3>
                <div className="template4-divider" />
                {user.education?.map((e, i) => (
                  <div key={i} className="mb-2 d-flex justify-content-between">
                    <div>
                      <strong>{e.qualification || e.degree}</strong> —{" "}
                      {e.institution}
                    </div>
                    <small className="text-muted">
                      {e.range}{" "}
                      {e.startDate
                        ? `${e.startDate} - ${e.endDate}`
                        : e.endDate}
                    </small>
                  </div>
                ))}
              </section>
            </>
          )}

          {/* Projects */}
          {user.projects?.length > 0 && (
            <section className="mb-4">
              <h3 className="template4-h3">Projects</h3>
              <div className="template4-divider" />
              {user.projects.map((project, i) => (
                <div key={i} className="mb-2">
                  <strong>{project.title || project.name}</strong>{" "}
                  <small className="text-muted">{[project.range || ""]}</small>
                  <p className="mb-0">{project.description || ""}</p>
                  <ul>
                    {Array.isArray(project.description) &&
                      project.description.length > 0 &&
                      project.description.map((d, index) => (
                        <li key={index}>{d}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {user.certifications?.length > 0 && (
            <section className="mb-2">
              <h3 className="template4-h3">Certifications</h3>
              <div className="template4-divider" />
              {user.certifications.map((cert, i) => (
                <div key={i} className="mb-1">
                  <strong>{cert.name || cert}</strong> {cert.organization || ""}{" "}
                  {cert.year && "-"} {cert.year || ""}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default Template4;
