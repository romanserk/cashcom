import React from 'react';
import { shallow } from 'enzyme';
import { ModalManager } from '../../../src/features/modal/ModalManager';

describe('modal/ModalManager', () => {
  it('renders node with correct class name', () => {
    const props = {
      modal: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ModalManager {...props} />
    );

    expect(
      renderedComponent.find('.modal-modal-manager').length
    ).toBe(1);
  });
});
