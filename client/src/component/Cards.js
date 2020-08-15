import React from 'react';
import { instanceOf } from 'prop-types';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { CardActionArea } from '@material-ui/core';
import { withCookies, Cookies } from 'react-cookie';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

class ItemCard extends React.Component {
  static propTypes = { cookies: instanceOf(Cookies).isRequired };
  constructor(props) {
    super(props)
    const { cookies } = props;
    this.state = {
      cart: [],
      jwt: cookies.get("jwt"),
      email: "",
    }
  }
  async componentDidMount() {
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
      .then(res => { if (res.data.email) this.setState({ email: res.data.email }) });

    // To fetch the cart items
    await fetch(`http://localhost:3000/cart?id=${this.state.email}`, {
      method: "GET",
      redirect: 'follow',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.jwt}`,
      }
    })
      .then(res => res.json())
      .then(res => { this.setState({ cart: res }); })
      .catch(e => { })
  }

  addToCart = async (sno, items) => {
    await fetch("http://localhost:3000/items", {
      method: "POST",
      redirect: 'follow',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.jwt}`,
      },
      body: JSON.stringify({ id: this.props.email, data: { ...items, quantity: 1 } })
    })
      .then(res => res.json())
      .then(res => {
        var tempCart = this.state.cart;
        tempCart.push(items);
        this.setState({ items: res, immutableItems: res })
        this.setState({ cart: tempCart })
      });
  }

  removeFromCart = (sno) => {
    var index = this.state.cart.findIndex(item => item["S.no"] === sno)
    fetch("http://localhost:3000/cart/delete", {
      method: "DELETE",
      redirect: 'follow',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.jwt}`,
      },
      body: JSON.stringify({ id: this.state.email, index })

    }).then(res => {
      var tempCart = this.state.cart;
      tempCart.splice(index, 1);
      this.setState({ cart: tempCart })
    })
  }

  render() {
    const { Items } = this.props
    return (
      Items ?
        <Card key={Items.itemId} style={{ maxWidth: 1005, width: 400 }} >
          <CardHeader
            key={Items.itemId}
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: red[500] }}>
                {Items.itemName[0]}
              </Avatar>
            }
            title={Items.itemName}
            subheader={Items.labName}
          />
          <CardContent>
            <Typography variant="body2" style={{ textAlign: "center" }} component="p">
              <b>Price:{Items.minPrice}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test Count:{Items.testCount}
            </Typography>
          </CardContent>

          <CardActionArea style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", padding: 10, height: "10vh" }}>
            {

              (Items.Keyword.split(",")).map((keyword, index) => {
                return <Chip
                  key={index}
                  avatar={<Avatar alt={keyword[0]} src="/static/images/avatar/1.jpg" />}
                  label={keyword}
                  style={{ margin: 2 }}
                  variant="outlined"
                />
              })
            }
          </CardActionArea>
          <CardActions style={{ display: "flex", justifyContent: "center" }} disableSpacing>
            {

              (this.state.cart.find(i => {
                return i["S.no"] === Items["S.no"]
              })) ?
                <Button onClick={() => this.removeFromCart(Items["S.no"], Items)}>Remove from Cart</Button> :
                <Button onClick={() => this.addToCart(Items["S.no"], Items)}>Add to Cart</Button>
            }
          </CardActions>
        </Card> : <div></div>
    );
  }
}
export default withCookies(ItemCard);