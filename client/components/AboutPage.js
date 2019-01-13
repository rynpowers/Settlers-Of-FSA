import React, { Component } from 'react';
import { withNavigation } from './Navigation';
import { Link } from 'react-router-dom';

class AboutPage extends Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Home Page</Link>
        </h1>
      </div>
    );
  }
}

export default withNavigation(AboutPage);
