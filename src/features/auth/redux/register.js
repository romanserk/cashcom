import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  AUTH_REGISTER_BEGIN,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_DISMISS_ERROR,
} from './constants';
import { client } from '../../../common/api';
import { REGISTER } from '../../../common/constants/api';
import Cookies from 'js-cookie'
import { TOKEN_COOKIE } from '../../../common/constants/cookies';

export function register(userData, onSucces) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTH_REGISTER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = client.post(REGISTER, {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          phone: "+972523320840"
      });

      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_REGISTER_SUCCESS,
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
          console.log(err);
          dispatch({
            type: AUTH_REGISTER_FAILURE,
            data: { error: err.response.data.data },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissRegisterError() {
  return {
    type: AUTH_REGISTER_DISMISS_ERROR,
  };
}

export function useRegister() {
  const dispatch = useDispatch();

  const { registerPending, registerError } = useSelector(
    state => ({
      registerPending: state.auth.registerPending,
      registerError: state.auth.registerError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(register(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissRegisterError());
  }, [dispatch]);

  return {
    register: boundAction,
    registerPending,
    registerError,
    dismissRegisterError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_REGISTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        registerPending: true,
        registerError: null,
      };

    case AUTH_REGISTER_SUCCESS:
      // The request is success
      return {
        ...state,
        registerPending: false,
        registerError: null,
        user: action.data,
      };

    case AUTH_REGISTER_FAILURE:
      // The request is failed
      return {
        ...state,
        registerPending: false,
        registerError: action.data.error,
      };

    case AUTH_REGISTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        registerError: null,
      };

    default:
      return state;
  }
}
