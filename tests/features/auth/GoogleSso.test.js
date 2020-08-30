import React from 'react';
import { shallow } from 'enzyme';
import { GoogleSso } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GoogleSso />);
  expect(renderedComponent.find('.auth-google-sso').length).toBe(1);
});
