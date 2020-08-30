import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GENERAL_FETCH_AUTOCOMPLETE_BEGIN,
  GENERAL_FETCH_AUTOCOMPLETE_SUCCESS,
  GENERAL_FETCH_AUTOCOMPLETE_FAILURE,
  GENERAL_FETCH_AUTOCOMPLETE_DISMISS_ERROR,
} from '../../../../src/features/general/redux/constants';

import {
  fetchAutocomplete,
  dismissFetchAutocompleteError,
  reducer,
} from '../../../../src/features/general/redux/fetchAutocomplete';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('general/redux/fetchAutocomplete', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchAutocomplete succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchAutocomplete())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERAL_FETCH_AUTOCOMPLETE_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERAL_FETCH_AUTOCOMPLETE_SUCCESS);
      });
  });

  it('dispatches failure action when fetchAutocomplete fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchAutocomplete({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERAL_FETCH_AUTOCOMPLETE_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERAL_FETCH_AUTOCOMPLETE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchAutocompleteError', () => {
    const expectedAction = {
      type: GENERAL_FETCH_AUTOCOMPLETE_DISMISS_ERROR,
    };
    expect(dismissFetchAutocompleteError()).toEqual(expectedAction);
  });

  it('handles action type GENERAL_FETCH_AUTOCOMPLETE_BEGIN correctly', () => {
    const prevState = { fetchAutocompletePending: false };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_AUTOCOMPLETE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAutocompletePending).toBe(true);
  });

  it('handles action type GENERAL_FETCH_AUTOCOMPLETE_SUCCESS correctly', () => {
    const prevState = { fetchAutocompletePending: true };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_AUTOCOMPLETE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAutocompletePending).toBe(false);
  });

  it('handles action type GENERAL_FETCH_AUTOCOMPLETE_FAILURE correctly', () => {
    const prevState = { fetchAutocompletePending: true };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_AUTOCOMPLETE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAutocompletePending).toBe(false);
    expect(state.fetchAutocompleteError).toEqual(expect.anything());
  });

  it('handles action type GENERAL_FETCH_AUTOCOMPLETE_DISMISS_ERROR correctly', () => {
    const prevState = { fetchAutocompleteError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_AUTOCOMPLETE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAutocompleteError).toBe(null);
  });
});

