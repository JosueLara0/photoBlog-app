//* libraries
import { Grid, Typography } from "@mui/material";
//* icons
import { AddPhotoAlternate } from "@mui/icons-material";
//* styles
import { NothingSelectedViewStyles as styles } from "./NothingSelectedView.styles";

export const NothingSelectedView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={0}
      direction="column"
      sx={styles.gridCon}
    >
      <Grid item xs={12}>
        <AddPhotoAlternate sx={styles.starIcon} />
      </Grid>

      <Grid item xs={12}>
        <Typography color="white" variant="h5">
          Select or Create a Note
        </Typography>
      </Grid>
    </Grid>
  );
};
