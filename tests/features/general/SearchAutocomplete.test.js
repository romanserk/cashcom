import React from 'react';
import { shallow } from 'enzyme';
import { SearchAutocomplete } from '../../../src/features/general';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SearchAutocomplete />);
  expect(renderedComponent.find('.general-search-autocomplete').length).toBe(1);
});
