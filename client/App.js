import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getMeThunk } from './store/actions';
import {
  Auth,
  HomePage,
  PrivateRoute,
  Lobby,
  AuthRoute,
  withNavigation,
  Game,
} from './components';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

const AuthWithNavigation = withNavigation(Auth);
const LobbyWithNavigation = withNavigation(Lobby);
const HomePageWithNavigation = withNavigation(HomePage);

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
        <Fragment>
          <Switch>
            <AuthRoute path="/login" component={AuthWithNavigation} />
            <AuthRoute path="/signup" component={AuthWithNavigation} />
            <PrivateRoute path="/game" component={Game} />
            <PrivateRoute path="/lobby" component={LobbyWithNavigation} />
            <PrivateRoute path="/" component={HomePageWithNavigation} />
          </Switch>
        </Fragment>
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
