import * as Yup from "yup";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .min(8, "Password must contain more than 8 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one alphabet, one number, and one special character"
    )
    .required("Password is required"),
});

export default LoginSchema;
