import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class PrivateRoute extends Component {
  render() {
    const { path, component } = this.props;
    return this.props.authenticated ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = ({ user }) => ({ authenticated: user.id });

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
