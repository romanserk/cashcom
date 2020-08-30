import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_LOGIN_SSO_BEGIN,
  AUTH_LOGIN_SSO_SUCCESS,
  AUTH_LOGIN_SSO_FAILURE,
  AUTH_LOGIN_SSO_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  loginSso,
  dismissLoginSsoError,
  reducer,
} from '../../../../src/features/auth/redux/loginSso';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/loginSso', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loginSso succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loginSso())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_LOGIN_SSO_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_LOGIN_SSO_SUCCESS);
      });
  });

  it('dispatches failure action when loginSso fails', () => {
    const store = mockStore({});

    return store.dispatch(loginSso({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_LOGIN_SSO_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_LOGIN_SSO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoginSsoError', () => {
    const expectedAction = {
      type: AUTH_LOGIN_SSO_DISMISS_ERROR,
    };
    expect(dismissLoginSsoError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_LOGIN_SSO_BEGIN correctly', () => {
    const prevState = { loginSsoPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_LOGIN_SSO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginSsoPending).toBe(true);
  });

  it('handles action type AUTH_LOGIN_SSO_SUCCESS correctly', () => {
    const prevState = { loginSsoPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_LOGIN_SSO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginSsoPending).toBe(false);
  });

  it('handles action type AUTH_LOGIN_SSO_FAILURE correctly', () => {
    const prevState = { loginSsoPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_LOGIN_SSO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginSsoPending).toBe(false);
    expect(state.loginSsoError).toEqual(expect.anything());
  });

  it('handles action type AUTH_LOGIN_SSO_DISMISS_ERROR correctly', () => {
    const prevState = { loginSsoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_LOGIN_SSO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginSsoError).toBe(null);
  });
});

