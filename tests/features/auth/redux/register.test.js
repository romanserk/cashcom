import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_REGISTER_BEGIN,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  register,
  dismissRegisterError,
  reducer,
} from '../../../../src/features/auth/redux/register';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/register', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when register succeeds', () => {
    const store = mockStore({});

    return store.dispatch(register())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_REGISTER_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_REGISTER_SUCCESS);
      });
  });

  it('dispatches failure action when register fails', () => {
    const store = mockStore({});

    return store.dispatch(register({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_REGISTER_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_REGISTER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRegisterError', () => {
    const expectedAction = {
      type: AUTH_REGISTER_DISMISS_ERROR,
    };
    expect(dismissRegisterError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_REGISTER_BEGIN correctly', () => {
    const prevState = { registerPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_REGISTER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registerPending).toBe(true);
  });

  it('handles action type AUTH_REGISTER_SUCCESS correctly', () => {
    const prevState = { registerPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_REGISTER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registerPending).toBe(false);
  });

  it('handles action type AUTH_REGISTER_FAILURE correctly', () => {
    const prevState = { registerPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_REGISTER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registerPending).toBe(false);
    expect(state.registerError).toEqual(expect.anything());
  });

  it('handles action type AUTH_REGISTER_DISMISS_ERROR correctly', () => {
    const prevState = { registerError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_REGISTER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registerError).toBe(null);
  });
});

