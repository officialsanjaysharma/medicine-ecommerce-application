import React from "react";
import { instanceOf } from "prop-types";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { Table, TableHead, TableCell, TableRow, TableBody } from "@material-ui/core";

class Invoice extends React.Component {
  static propTypes = { cookies: instanceOf(Cookies).isRequired };
  constructor(props) {
    super(props)
    const { cookies } = props;
    this.state = {
      jwt: cookies.get("jwt"),
      email: "",
      redirect: false,
      data: [],
      total: 0
    }
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.data && this.props.location.state.data) {
      this.setState({ data: this.props.location.state.data.items, total: this.props.location.state.data.total })
    } else {
      this.setState({ redirect: true })
    }
  }

  render() {
    return (
      <div>
        {
          (this.state.redirect) ? <Redirect to="/" /> : <></>
        }
        <div style={{ marginTop: 5, width: "100%", height: "85vh" }}>
          <div style={{ position: "relative", textAlign: "center", paddingTop: 30 }}>
            <h2>Invoice</h2>
          </div>
          <Paper style={{ overflow: "auto", height: "70vh" }}>
            <Table>
              <TableHead style={{ background: "#C0C0C0", position: "sticky", top: 0, zIndex: 1 }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Labname</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              {
                this.state.data.length ?
                  <TableBody style={{ overflowY: "scroll", overflowX: "scroll", overflow: "scroll" }}>
                    {
                      (this.state && this.state.data) ? this.state.data.map((item, index) => {
                        return <TableRow>
                          <TableCell>{item.itemName}</TableCell>
                          <TableCell>{(item.labName ? item.labName : "Not Available")}</TableCell>
                          <TableCell>Rs.{item.minPrice}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell >{item.quantity * item.minPrice}</TableCell>
                        </TableRow>
                      }) : <TableRow></TableRow>
                    }
                  </TableBody> : <div></div>
              }
            </Table>
          </Paper>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", background: "#C0C0C0", height: 30, zIndex: 3 }}>
          <div style={{ width: "100%", padding: 2 }}>Total</div>
          <div style={{ padding: 2 }}>Rs.{this.state.total}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
        </div>
      </div>
    )
  }
}
export default withCookies(Invoice);