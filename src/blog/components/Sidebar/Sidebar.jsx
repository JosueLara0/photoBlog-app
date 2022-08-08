//* libraries
import { useSelector } from "react-redux";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
//* styles
import { SidebarStyles as styles } from "./Sidebar.styles";
//* components
import { SidebarItem } from "../";

export const Sidebar = ({ drawerWidth = 240 }) => {
  const is600px = useMediaQuery(`(max-width:600px)`);
  const { displayName } = useSelector((state) => state.auth);
  const { notes, activeSidebar } = useSelector((state) => state.journal);

  return (
    <Box
      component="nav"
      sx={[styles.box, { width: { xs: "100%", sm: drawerWidth } }]}
      display={is600px && !activeSidebar ? "none" : "block"}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "100%", sm: drawerWidth },
            mt: { xs: "56px", sm: 0 },
          },
        }}
      >
        {!is600px && (
          <>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                {displayName}
              </Typography>
            </Toolbar>
            <Divider />
          </>
        )}

        <List>
          {notes.map((note) => (
            <SidebarItem key={note.id} {...note} is600px={is600px} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
