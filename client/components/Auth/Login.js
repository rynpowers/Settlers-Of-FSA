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
    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;
    const signUp = this.props.signUp;
    return this.props.children({
      ...this.props,
      ...this.state,
      handleChange,
      handleSubmit,
      signUp,
    });
  }
}

export default Login;
