import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../../store/actions';
import Login from './Login';
import LoginForm from './LoginForm';
import axios from 'axios';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit({ email, password, onLoginFail }) {
    const { path } = this.props.match;
    this.props.loginThunk({ path, email, password, onLoginFail });
  }

  render() {
    const { path } = this.props.match;
    return (
      <Login handleSubmit={this.submit} path={path}>
        {props => <LoginForm {...props} />}
      </Login>
    );
  }
}

export default connect(
  null,
  { loginThunk }
)(Auth);
