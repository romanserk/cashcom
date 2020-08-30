import React from 'react';
import { shallow } from 'enzyme';
import { Terms } from '../../../src/features/general';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Terms />);
  expect(renderedComponent.find('.common-terms').length).toBe(1);
});
