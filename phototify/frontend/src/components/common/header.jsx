import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../Redux/auth/authAction";
import { updateSearchText } from "../../Redux/photo/photoAction";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authClass: "clappsed",
      searchText: ""
    };
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.props.updateSearchText("");
        this.setState({ searchText: "" });
      }
    }
  }

  componentDidMount() {
    console.log("header did mount");
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize = () => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 991.98) {
      this.setState({ authClass: "clappsed" });
    } else {
      this.setState({ authClass: "expanded" });
    }
  };
  logout = e => {
    e.preventDefault();
    this.props.userLogout();
  };
  authClick = () => {};
  headExpandonClick = () => {
    console.log("headr");
  };
  onNavClick = e => {
    let el = event.target;
    this.collapseMenu();
  };
  collapseMenu() {
    var navMain = document.getElementById("navbar-menu-btn");
    navMain.classList.add("collapsed");
    console.log("on nacv click");
    navMain.setAttribute("aria-expanded", false);
    document.getElementById("navbarColor03").className =
      "navbar-collapse collapse";
  }
  rediretoHome = () => {
    const { user } = this.props;
    console.log("redir");

    <Redirect to={`/${user.user.username}`} />;

    // location.reload();
  };
  onSearchTextChange = e => {
    e.preventDefault();
    this.props.updateSearchText(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    this.props.searchTextChange(e.target.value);
  };
  render() {
    const { authClass } = this.state;
    const { isAuthenticated, user } = this.props;

    const AuthComponent = !isAuthenticated ? (
      <div className="logout-menu">
        <Link to="/login">
          <button
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
            onClick={this.authClick()}
            className={
              authClass == "expanded"
                ? "btn my-2 my-sm-0 custom-signin"
                : "btn my-2 my-sm-0"
            }
          >
            Log in
          </button>
        </Link>
        <button
          className={
            authClass == "expanded"
              ? "btn rounded-pill my-2 my-sm-0 custom-signup "
              : "btn rounded-pill my-2 my-sm-0"
          }
        >
          Sign up
        </button>
      </div>
    ) : (
      <div className="login-menu">
        <div className="btn-group">
          <img
            type="button"
            className="dropdown-toggle Avatar"
            data-toggle="dropdown"
            data-display="static"
            src={user.picture}
            alt="Avatar"
          />
          <div className="dropdown-menu dropdown-menu-lg mydropdown-menu">
            <Link
              className="profile-link"
              to={{
                pathname: `/${user.user.username}`,
                state: "reload"
              }}
            >
              <div
                className="dropdown-item mydropdown-item"
                // href={"/#/" + user.user.username}

                onClick={() => {
                  this.collapseMenu(), this.rediretoHome();
                }}
              >
                Profile
              </div>
            </Link>
            <a className="dropdown-item mydropdown-item" onClick={this.logout}>
              Log out
            </a>
          </div>
        </div>
        <i className="far fa-paper-plane fa-2x"></i>
        <i className="far fa-bell fa-2x"></i>
        <Link to="/manage/upload">
          <button
            onClick={() => this.collapseMenu()}
            className="btbtn rounded-pill my-2 my-sm-0 login-upload"
          >
            <i className="fas fa-arrow-up fa-1x"></i>
            <p className="">Upload</p>
          </button>
        </Link>
      </div>
    );
    return (
      <div className="header">
        <nav id="navbarHeader" className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="navbar-header my-navbar-header-top">
              <a className="navbar-brand my-navbar-header-name" href="/">
                Phototify
              </a>
              <button
                id="navbar-menu-btn"
                onClick={this.headExpandonClick}
                className="navbar-toggler navbar-menu-btn"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor03"
                aria-controls="navbarColor03"
                aria-expanded="true"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="my-navbar-header-userfunction">
                <form className="form-inline my-2 my-lg-0">
                  <div className="header-searchbar">
                    <i className="fas fa-search"></i>
                    <input
                      className="header-searchbox"
                      type="text"
                      name="searchText"
                      onChange={this.onSearchTextChange}
                      value={this.state.searchText}
                      placeholder="Search"
                    />
                  </div>
                </form>
                <div className="my-navbar-auth">{AuthComponent}</div>
              </div>
            </div>

            <div className="navbar-collapse collapse" id="navbarColor03">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a
                    onClick={this.onNavClick}
                    className="nav-link "
                    data-toggle="show"
                    data-target=".navbar-collapse"
                    href="/#/homefeeds"
                  >
                    {/* <Link to="/homefeeds"> */}
                    Home <span className="sr-only">(current)</span>
                    {/* </Link> */}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link "
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    href="/"
                  >
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link "
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    href="#"
                  >
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-navbar-auth-2">{AuthComponent}</div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {};
const mapStateToProp = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProp, { userLogout, updateSearchText })(
  Header
);
