import React, { Component } from 'react';
import { withNavigation } from './Navigation';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="/about">About Page</Link>
        </h1>
      </div>
    );
  }
}

export default withNavigation(HomePage);
