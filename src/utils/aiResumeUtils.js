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
- Ensure distinct styling between "Modern" and "Classic" templates.

**Modern Template Styling:**
  - Use **sans-serif fonts** for a sleek, contemporary look.
  - Apply **subtle color accents** (e.g., blue, gray) for headings and section dividers.
  - Implement **soft shadows, rounded corners, and minimalistic icons** to enhance aesthetics.
  - Utilize a **two-column layout** (if applicable) to balance sections dynamically.
  - Prioritize **white space and clean section separation** for better readability.

**Classic Template Styling:**
  - Use **serif fonts** (e.g., Times New Roman, Georgia) to reflect a traditional and formal style.
  - Keep it **black-and-white** with a **structured border** around the entire resume.
  - Section headings should be **bold and underlined**, with a **clear hierarchy**.
  - Use **left-aligned, single-column formatting** for a structured, professional layout.
  - Avoid decorative elements—focus on **clarity and readability**.

Additional Guidelines:
- Highlight key achievements using bullet points.
- Organize the content into sections: "Objective," "Skills," "Education," "Experience," and "Projects" in this order.
- Exclude any section if the user did not provide data (do not show empty sections).
- Translate all content, including section titles, into ${selectedLanguage}.
- Ensure the resume is formatted for clear readability and professional presentation within a single <div> element.`;
};
