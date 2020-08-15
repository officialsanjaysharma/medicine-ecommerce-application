import React from "react";
import App from "../App";
import Cart from "./Cart";
import Login from "./Login";
import Cookies from "js-cookie";
import AppBar from "../component/AppBar";
import PrivateRoute from "./PrivateRoute";
import { withCookies, } from "react-cookie";
import PrivateRouteHome from "./PrivateRouteHome";
import { BrowserRouter, Redirect } from "react-router-dom";
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
    }).then(res => { Cookies.get("jwt"); })
  }
  componentWillMount() { if (Cookies.get('jwt')) this.setState({ authenticated: true }) }

  isAuthenticated = () => { this.setState({ authenticated: true }) }

  render() {
    return (
      <>
        <BrowserRouter>
          <AppBar authenticated={this.state.authenticated} ></AppBar>
          <PrivateRoute path="/" component={App} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRouteHome path="/login" component={Login} />
          <Redirect to="/" />
        </BrowserRouter>
      </>
    )
  }
}

export default withCookies(AppRouter);