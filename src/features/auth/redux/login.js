import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_LOGIN_BEGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_DISMISS_ERROR,
} from './constants';
import { client } from '../../../common/api';
import { LOGIN } from '../../../common/constants/api';
import Cookies from 'js-cookie'
import { TOKEN_COOKIE } from '../../../common/constants/cookies';

export function login(userData, onSucces) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTH_LOGIN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = client.post(LOGIN, {
          email: userData.email,
          password: userData.password,
      });

      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            data: res.data && res.data.data,
          });
          if (res.data.data && res.data.data.token) {
            Cookies.set(TOKEN_COOKIE, res.data.data.token);
            if(onSucces) {
              onSucces();
            }
          }
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: AUTH_LOGIN_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoginError() {
  return {
    type: AUTH_LOGIN_DISMISS_ERROR,
  };
}

export function useLogin() {
  const dispatch = useDispatch();

  const { loginPending, loginError } = useSelector(
    state => ({
      loginPending: state.auth.loginPending,
      loginError: state.auth.loginError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(login(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoginError());
  }, [dispatch]);

  return {
    login: boundAction,
    loginPending,
    loginError,
    dismissLoginError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_LOGIN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loginPending: true,
        loginError: null,
      };

    case AUTH_LOGIN_SUCCESS:
      // The request is success
      return {
        ...state,
        loginPending: false,
        loginError: null,
        user: action.data,
      };

    case AUTH_LOGIN_FAILURE:
      // The request is failed
      return {
        ...state,
        loginPending: false,
        loginError: action.data.error,
      };

    case AUTH_LOGIN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loginError: null,
      };

    default:
      return state;
  }
}
