import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  RETAILER_FETCH_RETAILER_INFO_BEGIN,
  RETAILER_FETCH_RETAILER_INFO_SUCCESS,
  RETAILER_FETCH_RETAILER_INFO_FAILURE,
  RETAILER_FETCH_RETAILER_INFO_DISMISS_ERROR,
} from '../../../../src/features/retailer/redux/constants';

import {
  fetchRetailerInfo,
  dismissFetchRetailerInfoError,
  reducer,
} from '../../../../src/features/retailer/redux/fetchRetailerInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('retailer/redux/fetchRetailerInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchRetailerInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchRetailerInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RETAILER_FETCH_RETAILER_INFO_BEGIN);
        expect(actions[1]).toHaveProperty('type', RETAILER_FETCH_RETAILER_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when fetchRetailerInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchRetailerInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RETAILER_FETCH_RETAILER_INFO_BEGIN);
        expect(actions[1]).toHaveProperty('type', RETAILER_FETCH_RETAILER_INFO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchRetailerInfoError', () => {
    const expectedAction = {
      type: RETAILER_FETCH_RETAILER_INFO_DISMISS_ERROR,
    };
    expect(dismissFetchRetailerInfoError()).toEqual(expectedAction);
  });

  it('handles action type RETAILER_FETCH_RETAILER_INFO_BEGIN correctly', () => {
    const prevState = { fetchRetailerInfoPending: false };
    const state = reducer(
      prevState,
      { type: RETAILER_FETCH_RETAILER_INFO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRetailerInfoPending).toBe(true);
  });

  it('handles action type RETAILER_FETCH_RETAILER_INFO_SUCCESS correctly', () => {
    const prevState = { fetchRetailerInfoPending: true };
    const state = reducer(
      prevState,
      { type: RETAILER_FETCH_RETAILER_INFO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRetailerInfoPending).toBe(false);
  });

  it('handles action type RETAILER_FETCH_RETAILER_INFO_FAILURE correctly', () => {
    const prevState = { fetchRetailerInfoPending: true };
    const state = reducer(
      prevState,
      { type: RETAILER_FETCH_RETAILER_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRetailerInfoPending).toBe(false);
    expect(state.fetchRetailerInfoError).toEqual(expect.anything());
  });

  it('handles action type RETAILER_FETCH_RETAILER_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { fetchRetailerInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: RETAILER_FETCH_RETAILER_INFO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRetailerInfoError).toBe(null);
  });
});

