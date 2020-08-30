import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Register />);
  expect(renderedComponent.find('.auth-register').length).toBe(1);
});
