import React, { Component, Fragment } from 'react';
import { withNavigation } from './Navigation';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <h1>
          <Link to="/about">About Page</Link>
        </h1>
      </Fragment>
    );
  }
}

export default withNavigation(HomePage);
