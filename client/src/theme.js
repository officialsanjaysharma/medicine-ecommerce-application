import { createMuiTheme } from "@material-ui/core/styles";

// PS: The themes are generated from https://in-your-saas.github.io/material-ui-theme-editor/
const defaultTheme = createMuiTheme({
  "fontFamily": "'Open Sans','Helvetica Neue','Roboto'",
  "typography": {
    "useNextVariants": true,
  },
  "palette": {
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "background": {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "primary": {
      "light": "rgba(0,0,255)",
      "main": "rgba(0,0,155)",
      "dark": "rgba(252, 157, 0, 1)",
      "contrastText": "rgba(255, 255, 255, 1)"
    },
    "secondary": {
      "light": "rgba(186, 219, 154, 1)",
      "main": "rgba(184, 233, 134, 1)",
      "dark": "rgba(98, 165, 30, 1)",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "#f44336",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    },
  },
});

export default defaultTheme;