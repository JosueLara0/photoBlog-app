//* libraries
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, TextField, Typography, Link } from "@mui/material";
import { Alert } from "@mui/material";
//* icons
import { Google } from "@mui/icons-material";
//* styles
import { LoginPageStyles as styles } from "./LoginPage.styles";
//* layout
import { AuthLayout } from "../../layout/AuthLayout";
//* store
import {
  startGoogleSignIn,
  startEmailPasswordLogIn,
  logout,
} from "../../../store/auth";
//* hooks
import { useForm } from "../../../hooks";

const formData = {
  email: "user@email.com",
  password: "123456",
};

const formValidations = {
  email: [(value) => value.includes("@"), "The email should have @."],
  password: [
    (value) => value.length >= 6,
    "The password should have at least six characters.",
  ],
};

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);

  // help to disable the buttons while the login credentials are being checked
  const isChecking = useMemo(() => status === "checking", [status]);

  const {
    email,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startEmailPasswordLogIn({ email, password }));
  };

  const onGoogleSignIn = () => dispatch(startGoogleSignIn());

  // Delete error message if exists
  const onPageChange = () => dispatch(logout());

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} sx={styles.gridTxtFld}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={!!emailValid && formSubmitted && emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={styles.gridTxtFld}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              name="password"
              inputProps={{ "data-testid": "password" }}
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={!!passwordValid && formSubmitted && passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={styles.gridButtons}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isChecking}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                aria-label="google-btn"
                disabled={isChecking}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={styles.typo}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container sx={styles.gridLink}>
            <Link
              onClick={onPageChange}
              component={RouterLink}
              sx={styles.link}
              to="/auth/register"
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
