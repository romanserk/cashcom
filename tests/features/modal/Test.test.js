import React from 'react';
import { shallow } from 'enzyme';
import { Test } from '../../../src/features/modal';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Test />);
  expect(renderedComponent.find('.modal-test').length).toBe(1);
});
