import React from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import LoginSchema from "../../../validators/loginSchema";
import { useUserService } from "../../../services/userService";
import { useUser } from "../../../redux/hooks";

const LoginForm = () => {
  const { setIsAuthenticated } = useUser();
  const { userService } = useUserService();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    const isAuthenticated = await userService.signIn(values);
    setIsAuthenticated(isAuthenticated);
    setSubmitting(false);
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in" : "Login"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
