import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import LoginForm, { LoginLink } from './LoginForm';

let props = {
  handleSubmit: spy(),
  handleChange: spy(),
  password: '123',
  email: 'ryn@email.com',
  path: '/signup',
};

const wrapperSignup = shallow(<LoginForm {...props} />);
const wrapperLogin = shallow(<LoginForm {...props} path="/login" />);
const wrapperLinkLogin = shallow(<LoginLink path="/login" />);
const wrapperLinkSignup = shallow(<LoginLink path="/signup" />);

describe('<LoginForm />', () => {
  it('should render login form component', () => {
    expect(wrapperSignup.find('form').length).to.equal(1);
    expect(wrapperSignup.find('input').length).to.equal(2);
    expect(wrapperSignup.find('button').length).to.equal(1);
  });
  it('should pass props to input', () => {
    expect(
      wrapperSignup
        .find('input')
        .at(0)
        .html()
    ).to.contain(props.email);

    expect(
      wrapperSignup
        .find('input')
        .at(1)
        .html()
    ).to.contain(props.password);
  });

  it('should pass props to button', () => {
    expect(wrapperSignup.find('button').text()).to.contain('Create Account');
    expect(wrapperLogin.find('button').text()).to.contain('Log in');
  });

  it('it should call handleChange on input change', () => {
    wrapperSignup
      .find('input')
      .at(0)
      .simulate('change');
    expect(props.handleChange.called).to.equal(true);

    wrapperSignup
      .find('input')
      .at(1)
      .simulate('change');
    expect(props.handleChange.called).to.equal(true);
  });

  it('it should call handleSubmit when form submitted', () => {
    wrapperSignup.find('form').simulate('submit');
    expect(props.handleSubmit.called).to.equal(true);
  });
});

describe('<LoginLink>', () => {
  it('should render', () => {
    expect(wrapperLinkLogin.find('p').length).to.equal(1);
    expect(wrapperLinkSignup.find('p').length).to.equal(1);
  });
  it('should receive props', () => {
    expect(wrapperLinkLogin.text()).to.contain("Don't have an account yet?");
    expect(wrapperLinkSignup.text()).to.contain('Already have an account?');
  });
});
