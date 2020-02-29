import React, { Component } from "react";
import ReactDOM from "react-dom";

import store from "../Redux/store";
import { Provider } from "react-redux";
import Login from "./accounts/login.jsx";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { getUser } from "../Redux/auth/authAction";
import Header from "./common/header";
import Home from "./common/home";

import PrivateRoute from "./common/privateRoute";
import { getHomefeed } from "../Redux/photo/photoAction";
import HomeFeedRoute from "./photo/homeFeedRoute";
import homeFeeds from "./photo/homeFeeds";
import { createBrowserHistory } from "history";
import ProfileHome from "./profile/profileHome";
import PhotoUpload from "./photo/photoUpload";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "none",
      searchText: ""
    };
  }
  async getUserInfo() {
    // fix the problem for refresh, get userinfo before mounting
    await store.dispatch(getUser());
  }

  async componentDidMount() {
    await this.getUserInfo();
    console.log("apps did mount");
  }
  searchTextChange = searchText => {
    this.setState({ searchText });
  };
  render() {
    const customHistory = createBrowserHistory();
    return (
      <Provider store={store}>
        <Router history={customHistory}>
          <div>
            <div className="home-body">
              <div className="appbar">
                <Header searchTextChange={this.searchTextChange} />
              </div>
              <div className="app-body">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute
                    path="/homefeeds"
                    component={homeFeeds}
                    homefeeds="homefeeds"
                    searchText={this.state.searchText}
                    fetchUrl="/api/photo/getFollowingsLatestPhoto/"
                  />
                  <PrivateRoute path="/manage/upload" component={PhotoUpload} />
                  <PrivateRoute
                    path="/:username"
                    searchText={this.state.searchText}
                    component={ProfileHome}
                    // key={Math.random()}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
