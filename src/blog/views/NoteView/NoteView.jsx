//* libraries
import { useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
//* icons
import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { UploadOutlined } from "@mui/icons-material";
//* styles
import { NoteViewStyles as styles } from "./NoteView.styles";
//* components
import { ImageGallery } from "../../components";
//* store
import {
  setActiveNote,
  startSaveNote,
  startUploadingFiles,
  startDeletingNote,
} from "../../../store/journal";
//* hooks
import { useForm } from "../../../hooks";

export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note);

  // Give format to note date
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  // Reference of file input for upload button
  const fileInputRef = useRef();

  // set which note will be render
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  // render success modal if a note is saved
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Updated Note", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => dispatch(startSaveNote());

  const onDeleteNote = () => dispatch(startDeletingNote());

  const onFileInputChange = ({ target }) => {
    if (target.file === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  return (
    <Grid
      container
      sx={styles.gridCon}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography sx={styles.typoDate}>{dateString}</Typography>
      </Grid>

      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={styles.btnSave}
        >
          <SaveOutlined sx={styles.iconSave} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Insert a title"
          label="Title"
          sx={styles.txtFldTitle}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Write note"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />

        <Grid container justifyContent="end">
          <Button onClick={onDeleteNote} sx={styles.btnDelete} color="error">
            <DeleteOutline />
            Delete
          </Button>
        </Grid>

        <ImageGallery images={note.imageUrls} />
      </Grid>
    </Grid>
  );
};
