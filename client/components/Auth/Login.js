import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLoginFail, onLoginSuccess } = this;
    this.props.handleSubmit({ email, password, onLoginSuccess, onLoginFail });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLoginSuccess() {
    this.setState({ email: '', password: '' });
  }
  onLoginFail(error) {
    this.setState({ error });
  }

  render() {
    return this.props.children({
      ...this.props,
      ...this.state,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    });
  }
}

export default withRouter(Login);
