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

export const handleError = (error, setError = () => {}, code = "Error:") => {
  console.error(error.response?.data?.code || code, error);
  if (!error.response) {
    if (!navigator.onLine) {
      const networkError = {
        error: "Network Error",
        message: "You are offline. Please check your internet connection.",
      };
      setError(networkError);
      return;
    }
    setError({
      error: "Internal Server Error",
      message: "Something went wrong on our end. Please try again later.",
    });
    return;
  }
  setError({
    error: error.response.data.error || "An error occurred.",
    message:
      error.response.data.message ||
      "Something went wrong. Please try again later.",
  });
};
