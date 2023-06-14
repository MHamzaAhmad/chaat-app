import React from "react";
import { Button, TextField, Container, Grid, Typography } from "@mui/material";
import { secondaryColor } from "../../../utils/colors";
import { Field, Form, Formik } from "formik";
import LoginSchema from "../../../validators/loginSchema";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        background: secondaryColor,
        padding: "5rem",
        borderRadius: "0.5rem",
      }}
    >
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
    </Container>
  );
};

export default LoginForm;
