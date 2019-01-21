import PrivateRoute from './PrivateRoute';
import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import Root, { store } from '../store';
import { spy } from 'sinon';
import { login, logout } from '../store/actions';
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom';

let wrapped;
const user = { email: 'ryn@email.com', id: 1 };
const render = spy(PrivateRoute.prototype, 'render');
const Test = () => <div />;

describe('<PrivateRoute />', () => {
  beforeEach(() => {
    wrapped = mount(
      <Root>
        <Router>
          <PrivateRoute to="/component" component={Test} />
        </Router>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
    store.dispatch(logout(user));
  });

  it('should render', () => {
    expect(render.called).to.equal(true);
  });

  it('should render a <Route /> component if user logged in', () => {
    store.dispatch(login(user));
    wrapped.update();
    expect(wrapped.find(Route).length).to.equal(1);
    expect(wrapped.find(Test).length).to.equal(1);
  });

  it('should render a <Redirect /> component if user not logged in', () => {
    expect(wrapped.find(Redirect).length).to.equal(1);
  });
});
