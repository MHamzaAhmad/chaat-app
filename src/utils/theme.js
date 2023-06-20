import { createTheme, outlinedInputClasses } from "@mui/material";
import {
  accentColor,
  mainColor,
  secondaryAccentColor,
  secondaryColor,
  textColor,
} from "./colors";

const theme = createTheme({
  typography: {
    fontFamily: "poppins",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        contained: {
          backgroundColor: accentColor,
          fontWeight: "500",
          fontSize: "0.9rem",
          padding: "1rem 5rem",
          "&:hover": {
            backgroundColor: secondaryAccentColor,
            color: textColor,
          },
          "&.Mui-disabled": {
            backgroundColor: "#C4C4C4",
          },
        },
        text: {
          color: accentColor,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: textColor,
          },
          "& label.Mui-focused": {
            color: secondaryAccentColor,
          },
          "& input": {
            color: textColor,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: mainColor,
          color: accentColor,
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: accentColor,
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: secondaryAccentColor,
          },
        },
      },
    },
  },
});

export default theme;
