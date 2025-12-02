import "../../resources/styles/pages/templates/templates.css";

function Template5() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="template5-parent">
      {/* Header */}
      <header className="text-center mb-2">
        <h1 className="m-0">
          {(user.firstName || "").toUpperCase()}{" "}
          {(user.lastName || "").toUpperCase()}
        </h1>
        <div className="template5-subhead small">
          <span>{user.email}</span>
          <span>•</span>
          <span>{user.mobileNumber}</span>
          <span>•</span>
          <span>{user.portfolio}</span>
          <span>•</span>
          <span>{user.address}</span>
        </div>
      </header>

      <div className="template5-rule mb-3"></div>

      {/* Summary */}
      <section className="mb-4">
        <h3 className="template5-h3">Summary</h3>
        <p className="mb-0">{user.summary}</p>
      </section>

      {/* Skills*/}
      {user.skils?.length > 0 && (
        <>
          <section className="mb-4 flex-wrap">
            <h3 className="template5-h3">Skills</h3>
            <ul className="mb-0 ps-3">
              {user.skills?.map((s, i) => (
                <li key={i}>{s.skill || s}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* Experience */}
      {user.experience?.length > 0 && (
        <section className="mb-4">
          <h3 className="template5-h3">Experience</h3>
          <div className="template5-timeline">
            {user.experience.map((exp, i) => (
              <div key={i} className="template5-timeline-item">
                <div className="template5-timeline-dot" />
                <div className="template5-timeline-content">
                  <div className="">
                    <strong>{exp.role || exp.title}</strong> |{" "}
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {user.education?.length > 0 && (
        <>
          <section className="mb-4">
            <h3 className="template5-h3">Education</h3>
            <div className="template5-timeline">
              {user.education?.map((e, i) => (
                <div key={i} className="template5-timeline-item">
                  <div className="template5-timeline-dot" />
                  <div className="template5-timeline-content">
                    <div className="">
                      <strong>{e.qualification || e.degree}</strong> |{" "}
                      <small className="text-muted">
                        {e.range}{" "}
                        {e.startDate
                          ? `${e.startDate} - ${e.endDate}`
                          : e.endDate}
                      </small>
                    </div>
                    <div className="text-muted">{e.institution}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Projects */}
      {user.projects?.length > 0 && (
        <section className="mb-4">
          <h3 className="template5-h3">Projects</h3>
          {user.projects.map((p, i) => (
            <div key={i} className="mb-2">
              <strong>{p.title || p.name}</strong>{" "}
              <small className="text-muted">{[p.range || ""]}</small>
              <p className="mb-0">{p.description || ""}</p>
              <ul>
                {Array.isArray(p.description) &&
                  p.description.length > 0 &&
                  p.description.map((d, index) => <li key={index}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {user.certifications?.length > 0 && (
        <section className="mb-4">
          <h3 className="template5-h3">Certifications</h3>
          {user.certifications.map((c, i) => (
            <div key={i} className="mb-1">
              <strong>{c.name || c}</strong> {c.organization} {c.year && "-"}{" "}
              {c.year}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {user.languages.length > 0 && (
        <>
          <section className="">
            <div style={{ minWidth: 220 }}>
              <h3 className="template5-h3">Languages</h3>
              <ul className="mb-0 ps-3">
                {user.languages?.map((l, i) => (
                  <li key={i}>
                    <strong>{l.language || l}</strong> {l.proficiency && "-"}{" "}
                    {l.proficiency}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Template5;
