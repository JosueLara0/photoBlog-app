//* libraries
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ListItem, ListItemButton, ListItemIcon, Grid } from "@mui/material";
import { ListItemText } from "@mui/material";
//* icons
import { TurnedInNot } from "@mui/icons-material";
//* store
import { setActiveNote, renderSidebar } from "../../../store/journal";

export const SidebarItem = ({
  title = "",
  body,
  id,
  date,
  imageUrls = [],
  is600px,
}) => {
  const dispatch = useDispatch();

  // Limit to 17 the number of characters visible in the sidebar for title note
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  });

  // Limit to 20 the number of characters visible in the sidebar for body note
  const newBody = useMemo(() => {
    return body.length > 20 ? body.substring(0, 20) + "..." : body;
  });

  // Select which note will be render an if the sidebar appears or not for small screens
  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    if (is600px) dispatch(renderSidebar());
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
