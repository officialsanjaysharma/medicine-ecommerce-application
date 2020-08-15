import React from "react";
import App from "../App";
import Cart from "./Cart";
import Login from "./Login";
// import history from '../history';
import Cookies from "js-cookie";
import AppBar from "../component/AppBar";
import PrivateRoute from "./PrivateRoute";
import { withCookies, } from "react-cookie";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false }
  }

  Authenticated = (username, password) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => { Cookies.get("jwt"); this.setState({ authenticated: true }) })
  }
  componentWillMount() { if (Cookies.get('jwt')) this.setState({ authenticated: true }) }

  isAuthenticated = () => { this.setState({ authenticated: true }) }

  render() {
    return (
      <>

        <BrowserRouter >
          <AppBar authenticated={this.state.authenticated} ></AppBar>
          <Switch>
            <PrivateRoute exact path="/" component={App} />
            <PrivateRoute path="/cart" component={Cart} />
            <Route path="/login" component={Login} >
              {this.state.authenticated ? <Redirect to="/" /> : null}
            </Route>
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default withCookies(AppRouter);