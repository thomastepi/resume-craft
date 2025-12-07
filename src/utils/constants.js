export const HTTP_ERRORS = {
  400: "Bad Request: The server could not understand the request.",
  401: "Unauthorized: Please log in to continue.",
  403: "You're exploring as a Guest! While you can browse freely, creating, editing, and deleting content requires an account. Sign up for free to unlock all features!",
  404: "Not Found: The requested resource was not found.",
  409: "Conflict: The request could not be completed due to a conflict.",
  429: "Too Many Requests: You have exceeded the request limit. Try again later.",
  500: "Our servers are currently down. Please try again later.",
  503: "Service Unavailable: The server is temporarily unavailable.",
};

export const fatalCodes = new Set([
  "INVALID_OR_EXPIRED_TOKEN",
  "USER_NOT_FOUND",
  "ACCOUNT_DELETED",
  "UNAUTHORIZED_ACCESS",
  "FORBIDDEN_ACTION",
  "RATE_LIMIT_EXCEEDED",
  "BAD_REQUEST",
  "SERVER_ERROR",
]);

export const GUEST_USER = {
  username: "guest",
  password: "SecurePass123",
};

export const templateTourStyles = (tourStepNum, index) => {
  return {
    backgroundColor: `${tourStepNum === 2 && index === 0 ? "black" : ""}`,
    opacity: `${tourStepNum === 2 && index === 0 ? 0.8 : 0}`,
    color: `${tourStepNum === 2 && index === 0 ? "white" : "black"}`,
    fontSize: `${tourStepNum === 2 && index === 0 ? "35px" : "16px"}`,
  };
};

export const sampleTips = [
  "Quantify your achievements! Use numbers and metrics to show your impact.",
  "Tailor your resume for each job. Highlight skills and experiences relevant to the job description.",
  "Use strong action verbs like 'Managed,' 'Developed,' and 'Achieved' to start your bullet points.",
  "Proofread meticulously! A single typo can make a bad impression.",
  "Keep it concise. Most recruiters spend only seconds scanning a resume.",
];

export const mockDocuments = [
  {
    id: 1,
    title: "Software Engineer Resume",
    lastEdited: "2 days ago",
    icon: "📄",
  },
  {
    id: 2,
    title: "Data Analyst CV (Version 2)",
    lastEdited: "5 days ago",
    icon: "📄",
  },
  {
    id: 3,
    title: "Project Manager Application",
    lastEdited: "1 week ago",
    icon: "📄",
  },
];
