import React from "react";
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class PrivateRoute extends React.Component {
  static propTypes = { cookies: instanceOf(Cookies).isRequired };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = { authenticated: false, jwt: cookies.get("jwt") }
  }
  async componentWillMount() {
    await fetch("http://localhost:3000/users/protected", {
      method: "GET",
      redirect: 'follow',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.jwt}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.email) this.setState({ authenticated: true })
      })
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest} exact render={(props) => (this.state.authenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
    )
  }
}


PrivateRoute.propTypes = {
  component: PropTypes.any,
}

export default withCookies(PrivateRoute);