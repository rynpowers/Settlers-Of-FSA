import React, { Component } from 'react';
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

export default AboutPage;
