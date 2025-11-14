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

  return `Create a professional HTML-based resume in ${selectedLanguage} using ONLY the data provided below.

User Data:
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

IMPORTANT CONTENT RULES:
- Do NOT invent or fabricate any information (no fake jobs, dates, degrees, skills, or projects).
- Only rewrite, refine, and organize what the user provided.
- Exclude any section if the user did not provide data for it.

Writing Style: ${writingStyle}
- If "Professional": use structured, concise, and professional language with a focus on achievements and impact.
- If "Friendly": use a warm, engaging tone that remains professional.
- If "Technical": use precise, data-driven, and metric-oriented descriptions (ideal for engineers, researchers, or analysts).

Font Choice: ${fontChoice}
- Use the selected font "${fontChoice}" for all text.
- Ensure text is legible with proper contrast.

Theme Colors: ${themeColor}
- Apply the chosen theme color "${themeColor}" to headings, section dividers, and subtle accents.
- Ensure good contrast and accessibility for readability.

Optimize for ATS (Applicant Tracking Systems): ${optimizeForATS}
- If "true":
  - ALWAYS use a single-column layout, even if a different layout was selected.
  - Avoid tables, images, icons, or decorative symbols.
  - Use standard section headings such as "Summary", "Skills", "Experience", "Projects", "Education", "Certifications", "Languages".
  - Keep text left-aligned with simple, minimal formatting.
  - Use simple fonts and minimal inline styling.

Layout: ${selectedLayout}
- If optimizeForATS is "false", apply the selected layout:

Single Column:
- Stack all sections vertically in a linear flow.
- Ensure clear section separation with distinct headings.

Two Column:
- Use a proper flexbox or CSS grid structure with two columns.
- Left column: Personal Information, Skills, Certifications, Languages.
- Right column: Summary/Objective, Experience, Education, Projects.
- Use "display: flex" or "grid-template-columns: 1fr 1fr".
- Ensure content wraps correctly without columns dropping below each other.

Compact Layout:
- Fit the resume within a single page by prioritizing key achievements.
- Use shorter bullet points (1–2 lines each) and tighter spacing.
- Max 3 bullet points per position.

Expanded Layout:
- Allow more detailed descriptions for experience, education, and projects.
- Use additional spacing for readability.
- Up to 5 bullet points per position.

Section Structure & Order:
- Use this section order when data is available:
  1. Summary (from "Summary" if provided; otherwise you may generate a short Objective based on the user's profile if appropriate)
  2. Skills
  3. Experience
  4. Projects
  5. Education
  6. Certifications
  7. Languages
- Do NOT show any section that has no data.
- Use bullet points to highlight key achievements and responsibilities.

Language & Translation:
- Translate section headings and any non-${selectedLanguage} content into ${selectedLanguage}.
- Preserve the meaning of user-provided content; do not change factual details.

HTML & STRUCTURE:
- The entire resume must be contained within a SINGLE <div> element.
- Do NOT include <html>, <head>, or <body> tags.
- Use semantic structure with headings (e.g., <h1>, <h2>, <h3>) and <p> or <ul>/<li> for text.
- Use minimal inline CSS for layout and styling. No external stylesheets.
- Ensure a clean, professional look with consistent spacing and alignment.
- Ensure there are no empty sections, empty headings, or placeholder text.

RESPONSE FORMAT:
- Only return valid, self-contained HTML.
- Do NOT include explanations, comments, or additional text.
- Do NOT wrap the response in backticks or markdown.
- The response must start with "<div>" and end with "</div>".`;
};
