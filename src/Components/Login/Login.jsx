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
import { loginWithEmail } from "../../utils/helperFunctions/auth";
import { LoginSchema } from "../../validation/validationSchema";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      const user = await loginWithEmail(values.email, values.password);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setStatus("Failed to log in. Please check your credentials.");
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
              Login
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              paragraph
            >
              Welcome back to Task Manager
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form>
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
                    {isSubmitting ? "Logging In..." : "Log In"}
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
              Don't have an account?{" "}
              <Link component={RouterLink} to="/signup" variant="body2">
                Sign up
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}
