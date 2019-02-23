import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <h1>
          <Link to="/lobby">Lobby</Link>
        </h1>
      </Fragment>
    );
  }
}

export default HomePage;
