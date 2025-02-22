import { HTTP_ERRORS } from "../constants/httpErrors";

export const getErrorMessage = async (error) => {
  if (!error) return "An unexpected error occurred.";

  if (error instanceof Response) {
    try {
      const errorData = await error.json();
      return (
        errorData.message || HTTP_ERRORS[error.status] || "An error occurred."
      );
    } catch {
      return HTTP_ERRORS[error.status] || "An error occurred.";
    }
  }

  return (
    HTTP_ERRORS[error.status] ||
    error.message ||
    "An unexpected error occurred."
  );
};
