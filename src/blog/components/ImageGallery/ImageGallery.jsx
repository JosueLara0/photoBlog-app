//* libraries
import { useState, useEffect } from "react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
//* styles
import { ImageGalleryStyles as styles } from "./ImageGallery.styles";

export const ImageGallery = ({ images = [] }) => {
  const is600px = useMediaQuery(`(max-width:600px)`);
  const is900px = useMediaQuery(`(max-width:900px)`);
  const is1200px = useMediaQuery(`(max-width:1200px)`);

  const [columns, setColumns] = useState(1);

  useEffect(() => {
    if (is600px) {
      setColumns(1);
      return;
    }
    if (is900px) {
      setColumns(2);
      return;
    }
    if (is1200px) {
      setColumns(3);
      return;
    }
    setColumns(4);
  }, [is600px, is900px, is1200px]);

  return (
    <ImageList sx={styles.imageList} cols={columns}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Image Note"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
