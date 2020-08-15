import React from 'react';
import './App.css';
import Cards from "./component/Cards";
import SearchIcon from "@material-ui/icons/SearchOutlined"
import { instanceOf } from 'prop-types';
import { Paper, IconButton, InputBase, CircularProgress } from '@material-ui/core';
import Cookies from "js-cookie";
import { withCookies } from 'react-cookie';
class App extends React.Component {
  static propTypes = { cookies: instanceOf(Cookies).isRequired };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      items: [], search: "",
      immutableItems: [],
      jwt: cookies.get("jwt"),
      email: ""
    }
  }
  async componentWillMount() {
    // To get the list of all items in database
    console.log("flag", this.state.jwt)
    await fetch("http://localhost:3000/items", {
      method: "GET",
      redirect: 'follow',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.jwt}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ items: res, immutableItems: res })
      });
    //  To verify if the token is verified and return token
    await fetch("http://localhost:3000/users/protected", {
      method: "GET",
      redirect: 'follow',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.jwt}`
      }
    })
      .then(res => res.json())
      .then(res => { if (res.data.email) this.setState({ email: res.data.email }); });
  }

  searchInput = (e) => {
    if (e.target.value.length === 0) this.setState({ items: this.state.immutableItems });
    this.setState({ search: e.target.value });
  }
  //  Executes on click of search button
  search = () => {
    var tempitems = this.state.items;
    tempitems = tempitems.filter(i => i.itemName.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()));
    this.setState({ items: tempitems })
  }
  // When we want to search using Enter or discard using ESC
  searchKeyboardPress = (e) => {
    if (e.key === 'Enter') {
      var tempitems = this.state.items;
      tempitems = tempitems.filter(i => i.itemName.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()));
      this.setState({ items: tempitems })
    }
    if (e.key === "Escape") this.setState({ search: "", items: this.state.immutableItems })
  }
  render() {
    return (
      this.state.immutableItems.length ?
        <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "row", flexWrap: "wrap" }} >
          <Paper style={{
            background: "#fff",
            width: "100%",
            height: 70,
            display: "flex",
            justifyContent: "center",
            margin: 2
          }} ><InputBase
              placeholder="Search…"
              value={this.state.search}
              onKeyDown={(e) => this.searchKeyboardPress(e)}
              onChange={(e) => this.searchInput(e)}
            />

            <IconButton onClick={() => this.search()} style={{ padding: 20 }}>
              <SearchIcon />
            </IconButton>
          </Paper>
          {
            this.state.items.map((items, index) => {
              return <div key={index} style={{ paddingTop: 50 }}><Cards email={this.state.email} index={index} Items={items} /></div>
            })
          }
        </div> : <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
          <div style={{ paddingTop: "50vh" }}>
            <CircularProgress />
          </div>
        </div>
    );
  }
}

export default withCookies(App);
