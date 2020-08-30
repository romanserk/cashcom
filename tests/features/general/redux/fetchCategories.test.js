import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GENERAL_FETCH_CATEGORIES_BEGIN,
  GENERAL_FETCH_CATEGORIES_SUCCESS,
  GENERAL_FETCH_CATEGORIES_FAILURE,
  GENERAL_FETCH_CATEGORIES_DISMISS_ERROR,
} from '../../../../src/features/general/redux/constants';

import {
  fetchCategories,
  dismissFetchCategoriesError,
  reducer,
} from '../../../../src/features/general/redux/fetchCategories';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('general/redux/fetchCategories', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchCategories succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchCategories())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERAL_FETCH_CATEGORIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERAL_FETCH_CATEGORIES_SUCCESS);
      });
  });

  it('dispatches failure action when fetchCategories fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchCategories({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GENERAL_FETCH_CATEGORIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', GENERAL_FETCH_CATEGORIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchCategoriesError', () => {
    const expectedAction = {
      type: GENERAL_FETCH_CATEGORIES_DISMISS_ERROR,
    };
    expect(dismissFetchCategoriesError()).toEqual(expectedAction);
  });

  it('handles action type GENERAL_FETCH_CATEGORIES_BEGIN correctly', () => {
    const prevState = { fetchCategoriesPending: false };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_CATEGORIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCategoriesPending).toBe(true);
  });

  it('handles action type GENERAL_FETCH_CATEGORIES_SUCCESS correctly', () => {
    const prevState = { fetchCategoriesPending: true };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_CATEGORIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCategoriesPending).toBe(false);
  });

  it('handles action type GENERAL_FETCH_CATEGORIES_FAILURE correctly', () => {
    const prevState = { fetchCategoriesPending: true };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_CATEGORIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCategoriesPending).toBe(false);
    expect(state.fetchCategoriesError).toEqual(expect.anything());
  });

  it('handles action type GENERAL_FETCH_CATEGORIES_DISMISS_ERROR correctly', () => {
    const prevState = { fetchCategoriesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GENERAL_FETCH_CATEGORIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCategoriesError).toBe(null);
  });
});

