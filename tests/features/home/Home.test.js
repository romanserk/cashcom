import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../src/features/home/WelcomePage';

describe('home/Home', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(<Home {...props} />);

    expect(renderedComponent.find('.home-welcome-page').length).toBe(1);
  });
});
