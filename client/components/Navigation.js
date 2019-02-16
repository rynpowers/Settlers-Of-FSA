import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import { logoutThunk } from '../store/actions';
import { store } from '../store';

export const LogoutLink = props => {
  return (
    <a
      onClick={() => {
        const { user } = store.getState();
        store.dispatch(logoutThunk(user, () => props.history.push('/login')));
      }}
    >
      Log out
    </a>
  );
};

export const NavLink = props => {
  switch (props.match.path) {
    case '/login':
      return <Link to="/signup">Sign up</Link>;
    case '/signup':
      return <Link to="/login">Log in</Link>;
    default:
      return <LogoutLink {...props} />;
  }
};

const withNavigation = WrappedComponent => {
  return class Navigation extends Component {
    render() {
      return (
        <Fragment>
          <div className="navigation">
            <h2>App Name</h2>
            <nav>
              <NavLink {...this.props} />
              <Link to="/">Home</Link>
              <Link to="/lobby">Lobby</Link>
            </nav>
          </div>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withNavigation;
