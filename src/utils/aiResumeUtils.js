import sanitizeHtml from "sanitize-html";

const sanitize = (input) =>
  input ? sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }) : "";

const limitText = (text, limit) =>
  text.length > limit ? text.slice(0, limit) + "..." : text;

export const generateResumePrompt = (userData, style, language) => {
  const allowedLanguages = ["English", "French", "Spanish"];
  const allowedStyles = ["Modern", "Classic"];

  const selectedLanguage = allowedLanguages.includes(language)
    ? language
    : "English";

  const styleToUse = allowedStyles.includes(style) ? style : "Modern";

  const firstName = sanitize(userData.firstName);
  const lastName = sanitize(userData.lastName);
  const email = sanitize(userData.email);
  const portfolio = sanitize(userData.portfolio);
  const mobileNumber = sanitize(userData.mobileNumber);
  const address = sanitize(userData.address);
  const summary = sanitize(limitText(userData.summary || "", 1000));

  const skillsString =
    userData.skills?.length > 0
      ? userData.skills.map((skill) => sanitize(skill.skill)).join(", ")
      : "N/A";

  const educationString =
    userData.education?.length > 0
      ? userData.education
          .map(
            (edu) =>
              `Qualification: ${sanitize(
                edu.qualification
              )}, Institution: ${sanitize(edu.institution)}, Year: ${edu.range}`
          )
          .join(", ")
      : "N/A";

  const certificationsString =
    userData.certifications?.length > 0
      ? userData.certifications
          .map(
            (cert) =>
              `Certification: ${sanitize(cert.name)}, Issuer: ${sanitize(
                cert.organization
              )}, Date: ${sanitize(cert.year)}`
          )
          .join(", ")
      : "N/A";

  const languagesString =
    userData.languages?.length > 0
      ? userData.languages
          .map(
            (lang) =>
              `Language: ${sanitize(lang.language)}, Proficiency: ${sanitize(
                lang.proficiency
              )}`
          )
          .join(", ")
      : "N/A";

  const experienceString =
    userData.experience?.length > 0
      ? userData.experience
          .map(
            (exp) =>
              `Employer: ${sanitize(limitText(exp.company, 100))}, 
              Role: ${sanitize(limitText(exp.role, 100))}, 
              Description: ${sanitize(limitText(exp.roleDescription, 1000))},  
              Place: ${sanitize(limitText(exp.place, 100))}, 
              Duration: ${sanitize(limitText(exp.range, 50))}`
          )
          .join(", ")
      : "N/A";

  const projectsString =
    userData.projects?.length > 0
      ? userData.projects
          .map(
            (proj) =>
              `Projects: ${sanitize(proj.title)}, Description: ${sanitize(
                proj.description
              )}`
          )
          .join(", ")
      : "N/A";

  return `Create a professional HTML-based resume in ${selectedLanguage} with the following details:

- Full Name: ${firstName} ${lastName}
${email ? `- Email: ${email}` : ""}
${mobileNumber ? `- Phone: ${mobileNumber}` : ""}
${address ? `- Address: ${address}` : ""}
${portfolio ? `- Portfolio: ${portfolio}` : ""}
${summary ? `- Summary: ${summary}` : ""}
${skillsString ? `- Skills: ${skillsString}` : ""}
${educationString ? `- Education: ${educationString}` : ""}
${experienceString ? `- Experience: ${experienceString}` : ""}
${projectsString ? `- Projects: ${projectsString}` : ""}
${certificationsString ? `- Certifications: ${certificationsString}` : ""}
${languagesString ? `- Languages: ${languagesString}` : ""}

Requirements:
- Use the "${styleToUse}" template style.
- Do not use class names or external styles. Every style must be applied using inline CSS.
- If the template is "Modern":
  - Use a minimalist design with sans-serif fonts, subtle colors (e.g., gray or blue), and clean lines.
  - Include rounded borders, soft shadows, and prominent headers.
  - Focus on spacing and typography for a sleek appearance.
- If the template is "Classic":
  - Use a traditional design with serif fonts and a simple black-and-white color scheme.
  - Add a border around the entire resume for a structured look.
  - Focus on straightforward readability and avoid complex design elements.

Additional Guidelines:
- Highlight key achievements using bullet points.
- Organize the content into sections: "Objective," "Skills," "Education," "Experience," and "Projects" in this order.
- Exclude any section if the user did not provide data (do not show empty sections).
- Translate all content, including section titles, into ${selectedLanguage}.
- Ensure the output is fully self-contained within a single <div> element, using only inline CSS styles.
- Avoid any references to external stylesheets, classes, IDs, or JavaScript.`;
};
