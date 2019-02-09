import React, { Component } from 'react';

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
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLoginFail } = this;
    this.props.handleSubmit({ email, password, onLoginFail });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  }

  onLoginFail() {
    this.setState({ error: 'Incorrect email or password' });
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

export default Login;
