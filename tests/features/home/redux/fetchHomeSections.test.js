import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_HOME_SECTIONS_BEGIN,
  HOME_FETCH_HOME_SECTIONS_SUCCESS,
  HOME_FETCH_HOME_SECTIONS_FAILURE,
  HOME_FETCH_HOME_SECTIONS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchHomeSections,
  dismissFetchHomeSectionsError,
  reducer,
} from '../../../../src/features/home/redux/fetchHomeSections';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchHomeSections', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchHomeSections succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchHomeSections())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_HOME_SECTIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_HOME_SECTIONS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchHomeSections fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchHomeSections({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_HOME_SECTIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_HOME_SECTIONS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchHomeSectionsError', () => {
    const expectedAction = {
      type: HOME_FETCH_HOME_SECTIONS_DISMISS_ERROR,
    };
    expect(dismissFetchHomeSectionsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_HOME_SECTIONS_BEGIN correctly', () => {
    const prevState = { fetchHomeSectionsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_HOME_SECTIONS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchHomeSectionsPending).toBe(true);
  });

  it('handles action type HOME_FETCH_HOME_SECTIONS_SUCCESS correctly', () => {
    const prevState = { fetchHomeSectionsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_HOME_SECTIONS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchHomeSectionsPending).toBe(false);
  });

  it('handles action type HOME_FETCH_HOME_SECTIONS_FAILURE correctly', () => {
    const prevState = { fetchHomeSectionsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_HOME_SECTIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchHomeSectionsPending).toBe(false);
    expect(state.fetchHomeSectionsError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_HOME_SECTIONS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchHomeSectionsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_HOME_SECTIONS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchHomeSectionsError).toBe(null);
  });
});

