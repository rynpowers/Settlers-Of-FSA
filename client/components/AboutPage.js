import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class AboutPage extends Component {
  render() {
    return (
      <Fragment>
        <h1>
          <Link to="/">Home Page</Link>
        </h1>
      </Fragment>
    );
  }
}

export default AboutPage;
