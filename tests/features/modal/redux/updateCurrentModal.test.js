import {
  MODAL_UPDATE_CURRENT_MODAL,
} from '../../../../src/features/modal/redux/constants';

import {
  updateCurrentModal,
  reducer,
} from '../../../../src/features/modal/redux/updateCurrentModal';

describe('modal/redux/updateCurrentModal', () => {
  it('returns correct action by updateCurrentModal', () => {
    expect(updateCurrentModal()).toHaveProperty('type', MODAL_UPDATE_CURRENT_MODAL);
  });

  it('handles action type MODAL_UPDATE_CURRENT_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MODAL_UPDATE_CURRENT_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
