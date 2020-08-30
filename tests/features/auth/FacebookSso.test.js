import React from 'react';
import { shallow } from 'enzyme';
import { FacebookSso } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FacebookSso />);
  expect(renderedComponent.find('.auth-facebook-sso').length).toBe(1);
});
