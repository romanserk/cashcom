import React from 'react';
import { shallow } from 'enzyme';
import { HomeCategories } from '../../../src/features/home/HomeCategories';

describe('home/HomeCategories', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <HomeCategories {...props} />
    );

    expect(
      renderedComponent.find('.home-home-categories').length
    ).toBe(1);
  });
});
