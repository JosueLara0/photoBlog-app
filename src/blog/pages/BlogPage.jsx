//* libraries
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
//* styles
import { BlogPageStyles as styles } from "./BlogPage.styles";
//* store
import { startNewNote } from "../../store/journal/thunk";
//* layout
import { BlogLayout } from "../layout/BlogLayout";
//* views
import { NoteView, NothingSelectedView } from "../views";

export const BlogPage = () => {
  const dispatch = useDispatch();

  const { isSaving, active } = useSelector((state) => state.journal);

  const onClickNewNote = () => dispatch(startNewNote());

  return (
    <BlogLayout>
      {active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        size="large"
        sx={styles.iconButton}
        onClick={onClickNewNote}
      >
        <AddOutlined sx={styles.addIcon} />
      </IconButton>
    </BlogLayout>
  );
};
