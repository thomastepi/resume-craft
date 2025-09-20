const WEIGHTS = {
  personalInfo: 25,
  skillsEducation: 25,
  experienceProjects: 30,
  certificationsLanguages: 20,
};

const clamp01 = (n) => Math.max(0, Math.min(1, n));
const emailOk = (v) => !!v && /\S+@\S+\.\S+/.test(v);
const minLen = (v, n = 1) => !!v && String(v).trim().length >= n;
const phoneOk = (v) => !!v && String(v).replace(/[^\d]/g, "").length >= 10;

function isSolidSkill(s) {
  if (!s || typeof s !== "object") return false;
  return minLen(s.skill);
}

function isSolidEducation(e) {
  if (!e || typeof e !== "object") return false;
  const hasSchool = minLen(e.school) || minLen(e.institution);
  const hasDegree =
    minLen(e.degree) || minLen(e.program) || minLen(e.fieldOfStudy);
  return hasSchool && hasDegree;
}

function isSolidExperience(xp) {
  if (!xp || typeof xp !== "object") return false;
  const hasTitle = minLen(xp.title) || minLen(xp.role) || minLen(xp.position);
  const hasCompany =
    minLen(xp.company) || minLen(xp.organization) || minLen(xp.employer);
  const bullets = Array.isArray(xp.bullets)
    ? xp.bullets.filter((b) => minLen(b))
    : [];
  return hasTitle && hasCompany && bullets.length >= 3;
}

function isSolidProject(p) {
  if (!p || typeof p !== "object") return false;
  const hasName = minLen(p.name) || minLen(p.title);
  const hasDesc = minLen(p.description, 50) || minLen(p.summary, 50);
  return hasName && hasDesc;
}

function isSolidCertification(c) {
  if (!c || typeof c !== "object") return false;
  return minLen(c.name) || minLen(c.title);
}

function isSolidLanguage(l) {
  if (!l || typeof l !== "object") return false;
  const hasName = minLen(l.name) || minLen(l.language);
  const hasLevel = minLen(l.level) || minLen(l.proficiency);
  return hasName && hasLevel;
}

// Section scores
function personalInfoScore(u) {
  let score = 0;
  score += minLen(u.firstName) ? 1 : 0;
  score += minLen(u.lastName) ? 1 : 0;
  score += emailOk(u.email) ? 1 : 0;
  score += phoneOk(u.mobileNumber) ? 1 : 0;
  score += minLen(u.address, 5) ? 1 : 0;
  score += minLen(u.summary, 40) ? 1 : 0;

  return clamp01(score / 6);
}

function skillsEducationScore(u) {
  const skillsArr = Array.isArray(u.skills) ? u.skills : [];
  const solidSkills = skillsArr.filter(isSolidSkill).length;
  const skillsPart = solidSkills >= 1 ? 1 : 0;

  const eduArr = Array.isArray(u.education) ? u.education : [];
  const eduPart = eduArr.some(isSolidEducation) ? 1 : 0;

  return (skillsPart + eduPart) / 2;
}

function experienceProjectsScore(u) {
  const expArr = Array.isArray(u.experience) ? u.experience : [];
  const projArr = Array.isArray(u.projects) ? u.projects : [];

  const expSolid = expArr.filter(isSolidExperience).length;
  const projSolid = projArr.filter(isSolidProject).length;

  const expPart = expSolid >= 1 ? 1 : 0;
  const projPart = projSolid >= 1 ? 1 : 0;

  return Math.max(expPart, projPart);
}

function certificationsLanguagesScore(u) {
  const certArr = Array.isArray(u.certifications) ? u.certifications : [];
  const langArr = Array.isArray(u.languages) ? u.languages : [];

  const certSolid = certArr.filter(isSolidCertification).length;
  const langSolid = langArr.filter(isSolidLanguage).length;

  const certPart = certSolid >= 1 ? 1 : 0;
  const langPart = langSolid >= 1 ? 1 : 0;

  return (certPart + langPart) / 2;
}

// Public API

export function calculateProfileCompletion(u = {}) {
  const totalWeight =
    WEIGHTS.personalInfo +
    WEIGHTS.skillsEducation +
    WEIGHTS.experienceProjects +
    WEIGHTS.certificationsLanguages;

  const personal = personalInfoScore(u) * WEIGHTS.personalInfo;
  const skEdu = skillsEducationScore(u) * WEIGHTS.skillsEducation;
  const xpPr = experienceProjectsScore(u) * WEIGHTS.experienceProjects;
  const certLang =
    certificationsLanguagesScore(u) * WEIGHTS.certificationsLanguages;

  let total = (personal + skEdu + xpPr + certLang) / totalWeight;

  // if personal info < 60%, cap overall at 80%
  if (personalInfoScore(u) < 0.6) total = Math.min(total, 0.8);

  return Math.round(clamp01(total) * 100);
}

export function getMissingSections(u = {}) {
  const missing = [];

  // Personal Information
  const personalFields = [
    ["firstName", !!minLen(u.firstName)],
    ["lastName", !!minLen(u.lastName)],
    ["email", !!emailOk(u.email)],
    ["mobileNumber", !!phoneOk(u.mobileNumber)],
    ["address", !!minLen(u.address, 5)],
    ["summary", !!minLen(u.summary, 40)],
  ];
  const personalDone = personalFields.filter(([, ok]) => ok).length;
  if (personalDone < personalFields.length) {
    missing.push({
      section: "Personal Information",
      missingFields: personalFields
        .filter(([, ok]) => !ok)
        .map(([k]) => String(k)),
      completionRate: (personalDone / personalFields.length) * 100,
    });
  }

  // Skills & Education
  const solidSkills = (Array.isArray(u.skills) ? u.skills : []).filter(
    isSolidSkill
  ).length;
  const skillsOk = solidSkills >= 1;
  const eduOk = (Array.isArray(u.education) ? u.education : []).some(
    isSolidEducation
  );

  if (!(skillsOk && eduOk)) {
    const miss = [];
    if (!skillsOk) miss.push("skills (add at least 1)");
    if (!eduOk) miss.push("education (add at least 1 with school + degree)");
    const done = (skillsOk ? 1 : 0) + (eduOk ? 1 : 0);
    missing.push({
      section: "Skills & Education",
      missingFields: miss,
      completionRate: (done / 2) * 100,
    });
  }

  // Experience & Projects
  const expSolid = (Array.isArray(u.experience) ? u.experience : []).filter(
    isSolidExperience
  ).length;
  const projSolid = (Array.isArray(u.projects) ? u.projects : []).filter(
    isSolidProject
  ).length;
  const xpOk = expSolid >= 1;
  const prOk = projSolid >= 1;
  if (!(xpOk || prOk)) {
    const miss = [];
    if (!xpOk) miss.push("experience (1 role with 3+ bullets)");
    if (!prOk)
      miss.push("projects (1 project with 50+ character descriptions)");
    const done = (xpOk ? 1 : 0) + (prOk ? 1 : 0);
    missing.push({
      section: "Experience & Projects",
      missingFields: miss,
      completionRate: (done / 2) * 100,
    });
  }

  // Certifications & Languages
  const certSolid = (
    Array.isArray(u.certifications) ? u.certifications : []
  ).filter(isSolidCertification).length;
  const langSolid = (Array.isArray(u.languages) ? u.languages : []).filter(
    isSolidLanguage
  ).length;
  const certOk = certSolid >= 1;
  const langOk = langSolid >= 1;
  if (!(certOk && langOk)) {
    const miss = [];
    if (!certOk) miss.push("certifications (add 1+)");
    if (!langOk) miss.push("languages (add 1+ with level)");
    const done = (certOk ? 1 : 0) + (langOk ? 1 : 0);
    missing.push({
      section: "Certifications & Languages",
      missingFields: miss,
      completionRate: (done / 2) * 100,
    });
  }

  return missing.sort((a, b) => a.completionRate - b.completionRate);
}

export function modifyHintMessage(id, content) {
  const data = window.bwonboarddata;
  if (!data || !Array.isArray(data.hint)) {
    console.warn("[Guidefox] hint data not ready yet; skipping update");
    return;
  }

  window.bwonboarddata = {
    ...data,
    hint: data.hint.map((h) =>
      Number(h.id) === Number(id) ? { ...h, hintContent: content } : h
    ),
  };

  if (window.bw?.hint?.refresh) {
    window.bw.hint.refresh();
  } else if (window.bw?.hint?.init) {
    window.bw.hint.init();
  }
}

export function waitFor(predicate, { timeout = 8000, interval = 50 } = {}) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      try {
        if (predicate()) return resolve(true);
        if (Date.now() - start >= timeout)
          return reject(new Error("waitFor timeout"));
        setTimeout(tick, interval);
      } catch (e) {
        reject(e);
      }
    };
    tick();
  });
}

export function generateHintMessage(u = {}) {
  const pct = calculateProfileCompletion(u);
  const missing = getMissingSections(u);
  const displayPct = Math.round(pct / 5) * 5;

  if (pct >= 90) {
    modifyHintMessage(
      19,
      "Your profile is almost complete! Add a final touch for sharper AI suggestions."
    );
    return;
  }
  if (missing.length === 0) {
    modifyHintMessage(19, `Your profile is ${displayPct}% complete.`);
    return;
  }

  const top = missing[0];
  if (pct >= 70) {
    modifyHintMessage(
      19,
      `Your profile is ${displayPct}% complete. Add ${top.missingFields.join(
        " and "
      )} to unlock better AI resume suggestions.`
    );
    return;
  }
  if (pct >= 40) {
    const second = missing[1];
    const focus = [top.section, second && second.section]
      .filter(Boolean)
      .map((s) => String(s).toLowerCase())
      .join(" and ");
    modifyHintMessage(
      19,
      `Your profile is ${displayPct}% complete. Fill in your ${focus} so AI can craft better suggestions.`
    );
    return;
  }
  modifyHintMessage(
    19,
    `Your profile is ${displayPct}% complete. Start with ${top.section.toLowerCase()} for the biggest boost.`
  );
}

// Publish progress for Guidefox agent
export function publishProfileProgress(u = {}) {
  const pct = calculateProfileCompletion(u);
  window.__profileProgress = pct;
  window.__profileMissing = getMissingSections(u);
  window.dispatchEvent(
    new CustomEvent("bw-data-change", {
      detail: { scope: "profileProgress", pct },
    })
  );
  return pct;
}
