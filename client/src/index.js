import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "./theme";

// Why cookie, how cookie, refer https://medium.com/@rossbulat/using-cookies-in-react-redux-and-react-router-4-f5f6079905dc
import { CookiesProvider } from "react-cookie";

import AppRouter from "./router/AppRouter";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <MuiThemeProvider theme={defaultTheme}>
    <CookiesProvider>
      <AppRouter />
    </CookiesProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
