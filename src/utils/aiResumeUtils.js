import sanitizeHtml from "sanitize-html";

const sanitize = (input) =>
  input ? sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }) : "";

const limitText = (text, limit) =>
  text.length > limit ? text.slice(0, limit) + "..." : text;

export const generateResumePrompt = (userData, resumeCustomiztions) => {
  const {
    selectedLanguage,
    selectedLayout,
    writingStyle,
    fontChoice,
    themeColor,
    optimizeForATS,
  } = resumeCustomiztions;

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

 Writing Style: ${writingStyle}
- If "Professional", use structured, concise, and professional language that emphasizes achievements and impact.
- If "Friendly", use a warm, engaging tone that feels more personal while maintaining professionalism.
- If "Technical", focus on precise, data-driven, and metric-oriented descriptions (ideal for engineers, researchers, or analysts).

 Font Choice: ${fontChoice}
- Use the selected font: "${fontChoice}" across the resume.
- Ensure text is legible with proper contrast.

 Theme Colors: ${themeColor}
- Apply the chosen "${themeColor}" to headings, section dividers, and accents.
- Ensure good contrast for readability.

 Optimize for ATS (Applicant Tracking Systems): ${optimizeForATS}
- If "true", follow these ATS-friendly rules:
  - Avoid tables, images, or excessive formatting.
  - Use standard section headings (e.g., "Experience", "Education").
  - Keep text left-aligned with no unnecessary symbols.
  - Avoid fancy fonts and ensure proper spacing.

  Layout: ${selectedLayout}
- Apply the "${selectedLayout}" layout to structure the resume.

 Single Column Layout:
  - Stack all sections vertically in a linear flow.
  - Ensure clear section separation with distinct headings.
  - Prioritize readability, making each section easy to scan.

 Two Column Layout:
   - Ensure the resume uses a **proper flexbox or CSS grid structure**.
  - Place Personal Information, Skills, and Certifications in the left column.
  - Place Experience, Education, and Projects in the right column.
  - Both columns should be aligned at the top.
  - Use "display: flex" or "grid-template-columns: 1fr 1fr" to ensure proper alignment.
  - Ensure content wraps correctly, preventing one column from shifting below the other.
  - Add a fixed width or min-width for both columns so they stay balanced.

 Compact Layout:
  - Optimize the content to fit within a single page, focusing on key achievements.
  - Use a denser structure with reduced padding and margin spacing.
  - Prioritize short, concise bullet points instead of long descriptions.

 Expanded Layout:
  - Emphasize detailed descriptions for experience, education, and projects.
  - Allow additional spacing for a more open and visually appealing structure.
  - Use section subtitles where necessary to improve readability.

- Regardless of the layout, ensure:
  - A professional and clean structure with consistent alignment.
  - Proper section ordering based on the user's experience level.
  - That no empty sections appear in the final resume.


 Additional Guidelines:
- Highlight key achievements using bullet points.
- Organize the content into sections: "Objective," "Skills," "Education," "Experience," and "Projects" in this order.
- Exclude any section if the user did not provide data (do not show empty sections).
- Translate all content, including section titles, into ${selectedLanguage}.
- Ensure the resume is properly structured, readable, and professional within a single <div> element.

IMPORTANT:
- Only return valid, self-contained HTML.
- Do NOT include explanations, descriptions, or additional text.
- Do NOT wrap the response in triple backticks or any markdown formatting.
- The response should begin immediately with "<div>" and end with "</div>".
`;
};
