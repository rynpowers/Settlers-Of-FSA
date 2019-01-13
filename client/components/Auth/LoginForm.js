import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.scss';

const LoginLink = ({ path }) => {
  return path === '/signup' ? (
    <p>
      Already have an account? <Link to="/login">Log in</Link>
    </p>
  ) : (
    <p>
      Don't have an acount yet? <Link to="/signup">Create account</Link>
    </p>
  );
};

const LoginForm = ({ handleSubmit, handleChange, password, email, path }) => {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
      />
      <input
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
    </form>
  );
};

export default LoginForm;
