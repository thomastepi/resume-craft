import * as Yup from "yup";

const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-={}[\]:;"'<>,.?/`~\\]+$/;

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      usernameRegex,
      "Username can only contain letters, numbers, _, ., and -"
    )
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(passwordRegex, "Password contains invalid characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      usernameRegex,
      "Username can only contain letters, numbers, _, ., and -"
    )
    .test(
      "not-guest",
      "The username 'guest' is reserved. Please choose a different username.",
      (value) => value && value.toLowerCase() !== "guest"
    )
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(passwordRegex, "Password contains invalid characters")
    .required("Password is required"),

  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  mobileNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid phone number format")
    .required("Phone number is required"),

  portfolio: Yup.string().url("Invalid URL format").nullable(),

  summary: Yup.string()
    .trim()
    .min(50, "Summary must be at least 50 characters")
    .max(1000, "Summary must be at most 1000 characters")
    .required("Summary is required"),

  address: Yup.string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be at most 200 characters")
    .required("Address is required"),
});
