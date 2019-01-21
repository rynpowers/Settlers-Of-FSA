import withNavigation, { NavLink, LogoutLink } from './Navigation';
import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { store } from '../store';
import { login, logout } from '../store/actions';
import moxios from 'moxios';
import { Link } from 'react-router-dom';

const wrappedDiv = () => <div />;

const user = { id: 1, email: 'ryn@email.com' };
let wrappedLogoutLink;
let Navigation;
let wrappedNav;
let wrappedNavLink;

describe('<LogoutLink />', () => {
  beforeEach(() => {
    wrappedLogoutLink = shallow(<LogoutLink history={{ push: () => {} }} />);
    moxios.install();
    moxios.stubRequest('/auth/logout', {
      status: 200,
      response: {},
    });
    store.dispatch(login(user));
  });

  afterEach(() => {
    store.dispatch(logout(user));
    moxios.uninstall();
  });

  it('should render an a tag element', () => {
    expect(wrappedLogoutLink.find('a').length).to.equal(1);
  });

  it('should logout a user on click', done => {
    expect(store.getState().user).to.deep.equal(user);
    wrappedLogoutLink.find('a').simulate('click');
    moxios.wait(() => {
      expect(store.getState().user).to.deep.equal({});
      done();
    });
  });
});

describe('<NavLink />', () => {
  it('should render one Link component', () => {
    wrappedNavLink = shallow(<NavLink match={{ path: '/login' }} />);
    expect(wrappedNavLink.find(Link).length).to.equal(1);
  });
  it('should conditionally render the correct link', () => {
    wrappedNavLink = shallow(<NavLink match={{ path: '/login' }} />);
    expect(wrappedNavLink.find(Link).prop('to')).to.equal('/signup');

    wrappedNavLink = shallow(<NavLink match={{ path: '/signup' }} />);
    expect(wrappedNavLink.find(Link).prop('to')).to.equal('/login');

    wrappedNavLink = shallow(<NavLink match={{ path: '/' }} />);
    expect(wrappedNavLink.find(LogoutLink).length).to.equal(1);
  });
});

describe('withNavigation', () => {
  beforeEach(() => {
    Navigation = withNavigation(wrappedDiv);
    wrappedNav = shallow(<Navigation match={{ path: '/login' }} />);
  });
  it('should wrap a component', () => {
    expect(wrappedNav.find(wrappedDiv).length).to.equal(1);
  });
  it('should render 3 links', () => {
    expect(wrappedNav.find(Link).length).to.equal(2);
    expect(wrappedNav.find(NavLink).length).to.equal(1);
  });
});
