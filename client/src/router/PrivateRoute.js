import React from "react";
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import { CircularProgress } from '@material-ui/core';

class PrivateRoute extends React.Component {
  static propTypes = { cookies: instanceOf(Cookies).isRequired };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = { authenticated: false, jwt: cookies.get("jwt") }
  }
  async componentWillMount() {
    if (this.state.jwt) {
      console.log('hey', this.state.jwt)
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
          console.log("respones", res)
          if (res.data.email) this.setState({ authenticated: true })
        })
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { authenticated } = this.state;
    console.log("authenticated", authenticated)
    return (
      (this.state.authenticated) ?
        <Route
          {...rest}
          render={({ props }) => (authenticated ? <Component {...props} /> : <Redirect to={{ pathname: "/login", state: { data: props.location } }} />)
          } /> : <div>{
            this.state.jwt ? <div><CircularProgress /></div> : <Redirect to="/login" />
          }</div>
    )
  }
}


PrivateRoute.propTypes = {
  component: PropTypes.any,
}

export default withCookies(PrivateRoute);