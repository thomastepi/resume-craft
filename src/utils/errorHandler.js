import { HTTP_ERRORS } from "./constants";

export const getErrorMessage = async (error) => {
  if (!error) return "An unexpected error occurred.";

  if (error instanceof Response) {
    try {
      const errorData = await error.json();
      return {
        error: errorData.error || "Something went wrong.",
        message:
          errorData.message ||
          HTTP_ERRORS[error.status] ||
          "An error occurred. Please try again.",
      };
    } catch {
      return {
        error: "Something went wrong.",
        message:
          HTTP_ERRORS[error.status] || "An error occurred. Please try again.",
      };
    }
  }

  return (
    HTTP_ERRORS[error.status] ||
    error.message ||
    "An unexpected error occurred."
  );
};
