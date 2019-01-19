import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleSubmit({ email, password });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
