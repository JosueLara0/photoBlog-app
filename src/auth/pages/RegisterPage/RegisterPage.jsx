//* libraries
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, TextField, Typography, Link } from "@mui/material";
import { Alert } from "@mui/material";
//* styles
import { RegisterPageStyles as styles } from "./RegisterPage.styles";
//* layout
import { AuthLayout } from "../../layout/AuthLayout";
//* store
import { startEmailPasswordSignIn, logout } from "../../../store/auth";
//* hooks
import { useForm } from "../../../hooks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "The email should have @."],
  password: [
    (value) => value.length >= 6,
    "The password should have at least six characters.",
  ],
  displayName: [(value) => value.length >= 1, "The name is required."],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);

  // help to disable the buttons while the login credentials are being checked
  const isChecking = useMemo(() => status === "checking", [status]);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startEmailPasswordSignIn(formState));
  };

  // Delete error message if exists
  const onPageChange = () => dispatch(logout());

  return (
    <AuthLayout title="Sign Up">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} sx={styles.gridTxtFld}>
            <TextField
              label="Name"
              type="text"
              placeholder="Put your name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={
                !!displayNameValid && formSubmitted && displayNameValid
              }
            />
          </Grid>

          <Grid item xs={12} sx={styles.gridTxtFld}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@email.com"
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
              placeholder="password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={styles.gridButtons}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isChecking}
                type="submit"
                variant="contained"
                fullWidth
              >
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container sx={styles.gridLink}>
            <Typography sx={styles.typo}>Do you have an account?</Typography>
            <Link
              onClick={onPageChange}
              component={RouterLink}
              sx={styles.link}
              to="/auth/login"
            >
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
