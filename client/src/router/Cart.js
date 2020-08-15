import React from "react";
import { instanceOf } from "prop-types";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import SnackBar from "../component/Snackbar";
import { withCookies, Cookies } from "react-cookie";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import { Table, TableHead, TableCell, TableRow, TableBody, IconButton, Button } from "@material-ui/core";

class Cart extends React.Component {
  static propTypes = { cookies: instanceOf(Cookies).isRequired };
  constructor(props) {
    super(props)
    const { cookies } = props;
    this.state = {
      jwt: cookies.get("jwt"),
      email: "",
      data: [],
      openSnackbar: false,
      message: "Checkout Successfull",
      redirect: false,
      disabled: true,
      total: 0
    }
  }
  async componentDidMount() {
    await fetch("http://localhost:3000/users/protected", {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.jwt}`,
      }
    })
      .then(res => res.json())
      .then(res => { if (res.data.email) this.setState({ email: res.data.email }); })


    await fetch(`http://localhost:3000/cart?id=${this.state.email}`, {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.jwt}`,
      }
    }).then(res => res.json()).then(res => {
      console.log(res)
      this.setState({ data: res })
      if (res && res.length) {
        this.setState({ disabled: false })
        res.map(item => {
          var total = this.state.total + (item.quantity * item.minPrice)
          this.setState({ total: total })
          return item;
        })
      }
    })
  }

  Discard = () => {
    fetch("http://localhost:3000/cart/empty", {
      method: "DELETE",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.jwt}`,
      },
      body: JSON.stringify({ id: this.state.email })

    }).then(res => { this.setState({ data: [], disabled: true, total: 0 }); });
  }

  checkout = (status) => {
    // To open snackbar
    this.setState({ openSnackbar: status });

    if (status === true)
      setTimeout(() => {
        this.setState({ openSnackbar: true, message: "Redirecting.." })
        setTimeout(() => {
          fetch("http://localhost:3000/cart/empty", {
            method: "DELETE",
            redirect: "follow",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.state.jwt}`,
            },
            body: JSON.stringify({ id: this.state.email })
          }).then(res => {
            this.setState({ data: [], redirect: true, disabled: true, total: 0 });
          })
        }, 1000)
      }, 3000)
  }
  // To remove item from the cart
  removeItem = (index) => {
    fetch("http://localhost:3000/cart/delete", {
      method: "DELETE",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.jwt}`,
      },
      body: JSON.stringify({ id: this.state.email, index: index })
    }).then(res => {
      let temp = this.state.data;
      temp.splice(index, 1);
      this.setState({ data: temp, total: 0 });
      temp.map(item => {
        var total = this.state.total + (item.quantity * item.minPrice);
        this.setState({ total: total });
        return item;
      })
      if (temp.length === 0) this.setState({ disabled: true });
    })
  }

  updateQuantity = (quantity, index) => {
    if (quantity <= 0) this.setState({ disabled: true });
    else this.setState({ disabled: false });
    if (quantity > 0) {
      fetch("http://localhost:3000/cart/quantity", {
        method: "PUT",
        redirect: "follow",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.state.jwt}`,
        },
        body: JSON.stringify({ id: this.state.email, quantity, index })
      }).then(res => {
        var temp = this.state.data;
        temp[index].quantity = quantity;
        this.setState({ data: temp, total: 0 })
        temp.map(item => {
          var total = this.state.total + (item.quantity * item.minPrice);
          this.setState({ total: total });
          return item;
        })
      })
    }
  }
  calculateTotal = (total) => {
    this.setState({ total: total })
  }
  render() {
    return (
      <div>
        {
          (this.state.redirect) ? <Redirect to="/" /> : <></>
        }
        <div style={{ marginTop: 5, width: "100%", height: "85vh" }}>
          <div style={{ position: "relative", textAlign: "center", paddingTop: 30 }}>
            <h2>Cart</h2>
            <SnackBar open={this.state.openSnackbar} setOpen={this.checkout.bind(this)} message={this.state.message} />
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
                  <TableCell></TableCell>
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
                          <TableCell>
                            <TextField
                              id="standard-number"
                              label="Number"
                              type="number"
                              value={item.quantity}
                              onChange={(e => this.updateQuantity(e.target.value, index))}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </TableCell>
                          <TableCell >{item.quantity * item.minPrice}</TableCell>
                          <TableCell><IconButton onClick={() => { this.removeItem(index) }}>
                            <DeleteIcon />
                          </IconButton></TableCell>
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
          <Button disabled={this.state.disabled} onClick={() => this.Discard()}>Discard</Button>
          <Button disabled={this.state.disabled} onClick={() => { this.checkout(true) }}>Checkcout</Button>
        </div>
      </div>
    )
  }
}
export default withCookies(Cart);