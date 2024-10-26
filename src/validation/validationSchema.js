import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
        .required("Required"),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });