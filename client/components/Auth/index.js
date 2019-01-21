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

  async submit({ email, password }) {
    const { path } = this.props.match;
    try {
      const { data } = await axios.post(`/auth${path}`, { email, password });
      this.props.loginThunk(data);
      this.props.history.push('/');
    } catch (err) {
      console.log(err);
    }
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
