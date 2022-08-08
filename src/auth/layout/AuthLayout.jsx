//* libraries
import { Grid, Typography } from "@mui/material";
//* styles
import { AuthLayoutStyles as styles } from "./AuthLayout.styles";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid container sx={styles.gridContainer} direction="column">
      <Typography variant="h1" sx={styles.typo}>
        PhotoBlog
      </Typography>

      <Grid item sx={styles.gridItem}>
        <Typography
          variant="h5"
          sx={styles.typoTitle}
          className="animate__animated animate__fadeIn animate__faster"
        >
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
