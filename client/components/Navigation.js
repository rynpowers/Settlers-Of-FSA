import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logoutThunk } from '../store/actions';
import store from '../store';
import './Navigation.scss';

export const withNavigation = WrappedComponent => {
  return class Navigation extends Component {
    render() {
      return (
        <Fragment>
          <div className="navigation">
            <h2>App Name</h2>
            <nav>
              <a
                onClick={() => {
                  const { user } = store.getState();
                  store.dispatch(
                    logoutThunk(user, () => this.props.history.push('/login'))
                  );
                }}
              >
                Log out
              </a>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </nav>
          </div>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withNavigation;
