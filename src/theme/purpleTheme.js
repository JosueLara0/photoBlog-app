//* libraries
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#262254',
            white: '#FFFFFF',
        },
        secondary: {
            main: '#543884',
        },
        error: {
            main: red.A400
        }
    }
});