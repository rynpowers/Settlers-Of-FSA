import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import Login from './Login';
import LoginForm from './LoginForm';

const render = spy(Login.prototype, 'render');

const event = {
  email: { target: { name: 'email', value: 'ryn@email.com' } },
  password: { target: { name: 'password', value: 'password' } },
};

const handleSubmit = spy();
let wrapped;
let instance;

describe('<Login />', () => {
  beforeEach(() => {
    wrapped = shallow(
      <Login handleSubmit={handleSubmit}>{() => <LoginForm />}</Login>
    );
    instance = wrapped.instance();
  });

  it('should render', () => {
    expect(render.called).to.equal(true);
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
    instance.handleChange(event.email);
    instance.handleChange(event.password);
    instance.handleSubmit({ preventDefault: () => {} });
    expect(
      handleSubmit.calledOnceWith({
        email: event.email.target.value,
        password: event.password.target.value,
      })
    ).to.equal(true);
  });
});
