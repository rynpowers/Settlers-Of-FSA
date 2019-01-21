import { mount } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { BrowserRouter as Router } from 'react-router-dom';
import Root, { store } from '../../store';
import { logout } from '../../store/actions';
import { spy } from 'sinon';
import Auth from './index';
import Login from './Login';
import LoginForm from './LoginForm';
import moxios from 'moxios';

let wrapped;
const authRender = spy(Auth.prototype, 'render');
const push = spy();
const event = {
  email: { target: { name: 'email', value: 'ryn@email.com' } },
  password: { target: { name: 'password', value: 'password' } },
};
const user = { id: 1, email: event.email.target.value };

describe('<Auth />', () => {
  beforeEach(() => {
    wrapped = mount(
      <Root>
        <Router>
          <Auth history={{ push }} match={{ path: '/login' }} />
        </Router>
      </Root>
    );

    moxios.install();
    moxios.stubRequest('/auth/login', {
      status: 200,
      response: user,
    });
  });

  afterEach(() => {
    wrapped.unmount();
    moxios.uninstall();
    store.dispatch(logout(user));
  });

  it('should render the Auth component', () => {
    expect(authRender.called).to.equal(true);
  });

  it('should render a <Login /> component', () => {
    expect(wrapped.find(Login).length).to.equal(1);
  });

  it('should render a <LoginForm /> component', () => {
    expect(wrapped.find(LoginForm).length).to.equal(1);
  });

  it('should update Login state on input change event', done => {
    wrapped
      .find('input')
      .at(0)
      .simulate('change', event.email);

    wrapped
      .find('input')
      .at(1)
      .simulate('change', event.password);

    wrapped.find('form').simulate('submit');

    moxios.wait(() => {
      expect(store.getState().user).to.deep.equal(user);
      done();
    });
  });
});
