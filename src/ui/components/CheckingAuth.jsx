//* libraries
import { CircularProgress, Grid } from "@mui/material";
//* styles
import { CheckingAuthStyles as styles } from "./CheckingAuth.styles";

export const CheckingAuth = () => {
  return (
    <Grid container spacing={0} sx={styles.gridContainer}>
      <Grid item>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
