function renderTemplateHtml(templateHtml, user) {
  let html = templateHtml;

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const scalarValues = {
    "[[fullName]]": fullName,
    "[[firstName]]": user.firstName || "",
    "[[lastName]]": user.lastName || "",
    "[[email]]": user.email || "",
    "[[mobileNumber]]": user.mobileNumber || "",
    "[[address]]": user.address || "",
    "[[portfolio]]": user.portfolio || "",
    "[[summary]]": user.summary || "",
  };

  Object.entries(scalarValues).forEach(([placeholder, value]) => {
    html = html.replaceAll(placeholder, value);
  });

  // Skills
  if (Array.isArray(user.skills) && user.skills.length > 0) {
    const skillsHtml =
      "<ul>" + user.skills.map((s) => `<li>${s.skill}</li>`).join("") + "</ul>";
    html = html.replace("[[SKILLS_SECTION]]", skillsHtml);
  } else {
    html = html.replace("[[SKILLS_SECTION]]", "");
    const regex = new RegExp("Skills", "ig");
    html = html.replace(regex, "");
  }

  // Experience
  if (Array.isArray(user.experience) && user.experience.length > 0) {
    const expHtml = user.experience
      .map(
        (exp) => `
        <div class="experience-item">
          <p>
            <strong>${exp.company}</strong> | <strong>${exp.role}</strong> | <strong>${exp.place}</strong>
          </p>
          <p><strong>${exp.range}</strong></p>
          <p>${exp.roleDescription}</p>
        </div>
      `
      )
      .join("");
    html = html.replace("[[EXPERIENCE_SECTION]]", expHtml);
  } else {
    html = html.replace("[[EXPERIENCE_SECTION]]", "");
    const regex = new RegExp("Experience", "ig");
    html = html.replace(regex, "");
  }

  // Education
  if (Array.isArray(user.education) && user.education.length > 0) {
    const eduHtml = user.education
      .map(
        (e) => `
        <div class="education-item">
          <p>
            <strong>${e.range}</strong> – 
            <strong>${e.qualification}</strong>, ${e.institution}
          </p>
        </div>
      `
      )
      .join("");
    html = html.replace("[[EDUCATION_SECTION]]", eduHtml);
  } else {
    html = html.replace("[[EDUCATION_SECTION]]", "");
    const regex = new RegExp("Education", "ig");
    html = html.replace(regex, "");
  }

  // Projects
  if (Array.isArray(user.projects) && user.projects.length > 0) {
    const projectsHtml = user.projects
      .map(
        (p) => `
        <div class="project-item">
          <h4>${p.title} [${p.range}]</h4>
          <p>${p.description}</p>
        </div>
      `
      )
      .join("");
    html = html.replace("[[PROJECTS_SECTION]]", projectsHtml);
  } else {
    html = html.replace("[[PROJECTS_SECTION]]", "");
    const regex = new RegExp("Projects", "ig");
    html = html.replace(regex, "");
  }

  // Certifications
  if (Array.isArray(user.certifications) && user.certifications.length > 0) {
    const certsHtml = user.certifications
      .map(
        (c) => `
        <div class="cert-item">
          <p><strong>${c.name}</strong> (${c.organization}) [${c.year}]</p>
        </div>
      `
      )
      .join("");
    html = html.replace("[[CERTIFICATIONS_SECTION]]", certsHtml);
  } else {
    html = html.replace("[[CERTIFICATIONS_SECTION]]", "");
    const regex = new RegExp("Certifications", "ig");
    html = html.replace(regex, "");
  }

  // Languages
  if (Array.isArray(user.languages) && user.languages.length > 0) {
    const langsHtml = user.languages
      .map(
        (l) => `
        <div class="lang-item">
          <p><strong>${l.language}</strong> (${l.proficiency})</p>
        </div>
      `
      )
      .join("");
    html = html.replace("[[LANGUAGES_SECTION]]", langsHtml);
  } else {
    html = html.replace("[[LANGUAGES_SECTION]]", "");
    const regex = new RegExp("Languages", "ig");
    html = html.replace(regex, "");
  }

  return html;
}

export default renderTemplateHtml;
