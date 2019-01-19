import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import Login from './Login';
import LoginForm from './LoginForm';

spy(Login.prototype, 'render');

const event = {
  email: { target: { name: 'email', value: 'ryn@email.com' } },
  password: { target: { name: 'password', value: 'password' } },
};

const handleSubmit = spy();

const wrapped = shallow(
  <Login handleSubmit={handleSubmit}>{() => <LoginForm />}</Login>
);

const instance = wrapped.instance();

describe('<Login />', () => {
  it('should render', () => {
    expect(Login.prototype.render).to.have.property('callCount', 1);
  });

  it('should render a <LoginForm /> component', () => {
    expect(wrapped.find(LoginForm).length).to.equal(1);
  });

  it('should update state when handle change method called', () => {
    const { email, password } = event;
    expect(wrapped.state('email')).to.equal('');
    instance.handleChange(email);
    expect(wrapped.state('email')).to.equal(email.target.value);

    expect(wrapped.state('password')).to.equal('');
    instance.handleChange(password);
    expect(wrapped.state('password')).to.equal(password.target.value);
  });

  it('should call handleSubmit from props when handleSubmit method called', () => {
    instance.handleSubmit({ preventDefault: () => {} });
    expect(
      handleSubmit.calledOnceWith({
        email: event.email.target.value,
        password: event.password.target.value,
      })
    ).to.equal(true);
  });
});
