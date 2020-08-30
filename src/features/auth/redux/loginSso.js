import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_LOGIN_SSO_BEGIN,
  AUTH_LOGIN_SSO_SUCCESS,
  AUTH_LOGIN_SSO_FAILURE,
  AUTH_LOGIN_SSO_DISMISS_ERROR,
} from './constants';
import { client } from '../../../common/api';
import Cookies from 'js-cookie'
import { TOKEN_COOKIE } from '../../../common/constants/cookies';

export function loginSso(accessToken, userId, url, onSucces) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTH_LOGIN_SSO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
    const doRequest = client.post(url, {
              access_token: accessToken,
              user_id: userId,
          });

        doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_LOGIN_SSO_SUCCESS,
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
            type: AUTH_LOGIN_SSO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoginSsoError() {
  return {
    type: AUTH_LOGIN_SSO_DISMISS_ERROR,
  };
}

export function useLoginSso() {
  const dispatch = useDispatch();

  const { loginSsoPending, loginSsoError } = useSelector(
    state => ({
      loginSsoPending: state.auth.loginSsoPending,
      loginSsoError: state.auth.loginSsoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loginSso(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoginSsoError());
  }, [dispatch]);

  return {
    loginSso: boundAction,
    loginSsoPending,
    loginSsoError,
    dismissLoginSsoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_LOGIN_SSO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loginSsoPending: true,
        loginSsoError: null,
      };

    case AUTH_LOGIN_SSO_SUCCESS:
      // The request is success
      return {
        ...state,
        loginSsoPending: false,
        loginSsoError: null,
        user: action.data,
      };

    case AUTH_LOGIN_SSO_FAILURE:
      // The request is failed
      return {
        ...state,
        loginSsoPending: false,
        loginSsoError: action.data.error,
      };

    case AUTH_LOGIN_SSO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loginSsoError: null,
      };

    default:
      return state;
  }
}
