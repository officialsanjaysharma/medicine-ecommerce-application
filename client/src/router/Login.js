import React from "react";
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    }
  }
  authenticate = () => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      redirect: 'follow',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    }).then(res => res.json()).then(res => {
      if (res.user === "unauthorised") alert("Either user does not exist or wrong credentials")
      else {
        this.setState({ redirect: true })
        document.location.href = "/";
      }
    })
  }
  username = (e) => { this.setState({ username: e.target.value }) }
  password = (e) => { this.setState({ password: e.target.value }) }
  render() {
    return (
      <Container component="main" style={{ paddingTop: '25vh' }} maxWidth="xs">
        <CssBaseline />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form styles={{
            width: '100%', // Fix IE 11 issue.
          }} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={e => this.username(e)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={e => this.password(e)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              onClick={() => this.authenticate()}
              variant="contained"
              color="primary"
            >
              Sign In
          </Button>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container >
    )
  }
}
export default Login;