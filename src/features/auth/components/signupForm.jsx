import React from "react";
import { Button, TextField, Container, Grid, Typography } from "@mui/material";
import { secondaryColor } from "../../../utils/colors";
import { Field, Form, Formik } from "formik";
import SignupSchema from "../../../validators/signupSchema";
import UserService from "../../../services/userService";

const SignupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await UserService.signUp(values);
    setSubmitting(false);
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
        Signup
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
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
                  type="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing up" : "Signup"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignupForm;
