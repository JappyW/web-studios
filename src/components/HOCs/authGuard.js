import React, { Component } from "react";
import { connect } from "react-redux";
import { JWT_TOKEN } from "../../constants/authActionTypes";

export default OriginalComponent => {
  class MixedComponent extends Component {
    checkAuth() {
      if (!this.props.isAuth && !localStorage.getItem(JWT_TOKEN)) {
        this.props.history.push("/");
      }
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token
    };
  }

  return connect(mapStateToProps)(MixedComponent);
};
