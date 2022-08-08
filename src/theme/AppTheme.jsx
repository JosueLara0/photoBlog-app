//* libraries
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
//* themes
import { purpleTheme } from "./purpleTheme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
