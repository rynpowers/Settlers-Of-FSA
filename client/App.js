import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMeThunk } from './store/actions';
import { Auth, HomePage, PrivateRoute, AboutPage } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    this.props.getMeThunk(() => this.setState({ loaded: true }));
  }

  loadRoutes() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/signup" component={Auth} />
            <PrivateRoute path="/about" component={AboutPage} />
            <PrivateRoute path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }

  render() {
    return this.state.loaded ? this.loadRoutes() : <div>...Loading</div>;
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  { getMeThunk }
)(App);
