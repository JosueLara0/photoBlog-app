//* libraries
import { useSelector } from "react-redux";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
//* styles
import { BlogLayoutStyles as styles } from "./BlogLayout.styles";
//* components
import { Navbar, Sidebar } from "../components";

const drawerWidth = 240;

export const BlogLayout = ({ children }) => {
  const is600px = useMediaQuery(`(max-width:600px)`);
  const { activeSidebar } = useSelector((state) => state.journal);

  return (
    <Box
      sx={styles.box}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Navbar drawerWidth={drawerWidth} />

      <Sidebar drawerWidth={drawerWidth} />

      {(!activeSidebar || !is600px) && (
        <Box component="main" sx={styles.boxToolbar}>
          <Toolbar />

          {children}
        </Box>
      )}
    </Box>
  );
};
