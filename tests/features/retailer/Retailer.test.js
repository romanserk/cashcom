import React from 'react';
import { shallow } from 'enzyme';
import { Retailer } from '../../../src/features/retailer';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Retailer />);
  expect(renderedComponent.find('.retailer-retailer').length).toBe(1);
});
