//* libraries
import { useDispatch } from "react-redux";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
//* icons
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
//* styles
import { NavbarStyles as styles } from "./Navbar.styles";
//* store
import { startLogout } from "../../../store/auth";
import { renderSidebar } from "../../../store/journal";

export const Navbar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(startLogout());

  // Open or close sidebar for small screens
  const onMenuClick = () => dispatch(renderSidebar());

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton sx={styles.iconMenu} onClick={onMenuClick}>
          <MenuOutlined />
        </IconButton>

        <Grid container sx={styles.grid}>
          <Typography variant="h6" noWrap component="div">
            PhotoBlog
          </Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
