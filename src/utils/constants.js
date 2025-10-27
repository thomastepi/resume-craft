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

export const GUEST_USER = {
  username: "guest",
  password: "SecurePass123",
};

export const templateTourStyles = (tourStepNum, index) => {
  return {
    backgroundColor: `${
      tourStepNum === 1 && index === 0
        ? "black"
        : tourStepNum === 2 && index === 1
        ? "black"
        : ""
    }`,
    opacity: `${
      tourStepNum === 1 && index === 0
        ? 0.8
        : tourStepNum === 2 && index === 1
        ? 0.8
        : 0
    }`,
    color: `${
      tourStepNum === 1 && index === 0
        ? "white"
        : tourStepNum === 2 && index === 1
        ? "white"
        : "black"
    }`,
    fontSize: `${
      tourStepNum === 1 && index === 0
        ? "35px"
        : tourStepNum === 2 && index === 1
        ? "35px"
        : "16px"
    }`,
  };
};
