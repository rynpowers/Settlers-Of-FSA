import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class AuthRoute extends Component {
  render() {
    const { path, component } = this.props;
    return this.props.authenticated ? (
      <Redirect to="/" />
    ) : (
      <Route path={path} component={component} />
    );
  }
}

const mapStateToProps = ({ user }) => ({ authenticated: user.id });

export default connect(
  mapStateToProps,
  null
)(AuthRoute);
