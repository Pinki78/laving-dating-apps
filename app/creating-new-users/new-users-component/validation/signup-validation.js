import * as Yup from "yup";

export const signupValidation = Yup.object({
  fullName: Yup.string()
    .min(3, "Name too short")
    .required("Full name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  gender: Yup.string()
    .required("Gender required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone required"),

  dob: Yup.string()
    .required("Date of birth required"),

  password: Yup.string()
    .min(6, "Password must be 6 characters")
    .required("Password required"),
});