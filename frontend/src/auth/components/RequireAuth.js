import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';

export default function RequireAuth(ComposedComponent) {
  class Authentication extends Component {

    UNSAFE_componentWillMount() {
      if (!this.props.authenticated) {
        history.push("/login");
      }
    }

    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push("/login");
      }
    }

    render() {
      return (
        <div>
          {this.props.authenticated ? <ComposedComponent {...this.props} /> : null}
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}