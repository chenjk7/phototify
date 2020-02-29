import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../Redux/auth/authAction";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.userLogin(this.state.username, this.state.password);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    document.body.style = "background: #F7F8FA;";
    return (
      <div className="login">
        <form>
          <fieldset>
            <legend>Login</legend>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
                id="username"
                value={username}
                name="username"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
            </div>

            <button
              onClick={this.onSubmit}
              className="btn btn-primary btn-block"
            >
              Submit
            </button>
            <p>
              {/* Don't have accounts? <Link to="/register">Register</Link> */}
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProp = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProp, { userLogin })(Login);
