import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.scss';

export const LoginLink = ({ path }) => {
  return path === '/signup' ? (
    <p>
      Already have an account? <Link to="/login">Log in</Link>
    </p>
  ) : (
    <p>
      Don't have an account yet? <Link to="/signup">Create account</Link>
    </p>
  );
};

const LoginForm = ({
  handleSubmit,
  handleChange,
  password,
  email,
  path,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        className={error && 'error'}
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
      />
      <input
        className={error && 'error'}
        onChange={handleChange}
        name="password"
        type="password"
        value={password}
        placeholder="password"
      />
      <LoginLink path={path} />
      <button type="submit">
        {path === '/signup' ? 'Create Account' : 'Log in'}
      </button>
      <a href="/auth/google" className="google-login" type="submit">
        Login With Google
      </a>
    </form>
  );
};

export default LoginForm;
