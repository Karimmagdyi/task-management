import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { signUpWithEmail } from "../../utils/helperFunctions/auth";
import { SignupSchema } from "../../validation/validationSchema";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignup = async (values, { setSubmitting, setStatus }) => {
    try {
      await signUpWithEmail(values.email, values.password);
      console.log("User signed up successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setStatus("Failed to sign up. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Sign Up
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              paragraph
            >
              Create your account for Task Manager
            </Typography>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={handleSignup}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="name"
                    label="Name"
                    error={touched.name && errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="email"
                    label="Email"
                    type="email"
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="password"
                    label="Password"
                    type="password"
                    error={touched.password && errors.password}
                    helperText={touched.password && errors.password}
                  />
                  {status && (
                    <Typography
                      color="error"
                      variant="body2"
                      align="center"
                      sx={{ mt: 2 }}
                    >
                      {status}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
          <CardActions>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ width: "100%" }}
            >
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" variant="body2">
                Log in
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}
