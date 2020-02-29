import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import HomeFeeds from "../photo/homeFeeds";
import axios from "axios";
import { getConfigHeaderToken } from "./helper";
const isUserTokenValid = () => {
  axios
    .get("/api/auth/isUserTokenValid/", getConfigHeader())
    .then(response => {
      return true;
    })
    .catch(err => {
      return false;
    });
};

async function isauth() {
  let x = await risUserTokenValid;
  return x;
}

const PrivateRoute = ({
  component: Component,
  auth,
  homefeeds,
  fetchUrl,
  userid,
  searchText,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      // axios
      //   .get("/api/auth/isUserTokenValid/", getConfigHeaderToken())
      //   .then(response => {
      //     console.log("redir -> ", response.data);
      //     if (response.data == false) {
      //       return <Redirect to="/login" />;
      //     } else {
      //       return (
      //         <Component
      //           {...props}
      //           fetchUrl={fetchUrl}
      //           homefeeds={homefeeds}
      //           userid={userid}
      //           key={username}
      //         />
      //       );
      //     }
      //   })
      //   .catch(err => {
      //     return <Redirect to="/login" />;
      //   });
      if (auth.loading) {
        return <h2>loading</h2>;
      } else if (auth.isAuthenticated == null) {
        return <h2>loading</h2>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        const { username } = props.match.params;
        return (
          <Component
            {...props}
            fetchUrl={fetchUrl}
            homefeeds={homefeeds}
            userid={userid}
            searchText={searchText}
            key={username}
          />
        );
      }
    }}
  />
);

PrivateRoute.propTypes = {};
const mapStateToProp = (state, ownProps) => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProp)(PrivateRoute);
