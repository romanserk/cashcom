import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Login />);
  expect(renderedComponent.find('.auth-login').length).toBe(1);
});
