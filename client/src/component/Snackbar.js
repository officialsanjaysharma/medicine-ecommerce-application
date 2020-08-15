import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default class CustomizedSnackbars extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.setOpen(false)
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Snackbar open={this.props.open} autoHideDuration={6000} message={this.props.message} onClose={() => this.handleClose(false)} />
      </div >
    );
  }
}
