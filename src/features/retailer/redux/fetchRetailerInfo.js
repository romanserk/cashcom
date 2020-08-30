import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  RETAILER_FETCH_RETAILER_INFO_BEGIN,
  RETAILER_FETCH_RETAILER_INFO_SUCCESS,
  RETAILER_FETCH_RETAILER_INFO_FAILURE,
  RETAILER_FETCH_RETAILER_INFO_DISMISS_ERROR,
} from './constants';
import { autorizedClient } from '../../../common/api';
import { RETAILER_INFO } from '../../../common/constants/api';

export function fetchRetailerInfo(retailerId) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: RETAILER_FETCH_RETAILER_INFO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest =  autorizedClient.get(`${RETAILER_INFO}/${retailerId}`);

      doRequest.then(
        (res) => {
          dispatch({
            type: RETAILER_FETCH_RETAILER_INFO_SUCCESS,
            data: res.data && res.data.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: RETAILER_FETCH_RETAILER_INFO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchRetailerInfoError() {
  return {
    type: RETAILER_FETCH_RETAILER_INFO_DISMISS_ERROR,
  };
}

export function useFetchRetailerInfo() {
  const dispatch = useDispatch();

  const { fetchRetailerInfoPending, fetchRetailerInfoError } = useSelector(
    state => ({
      fetchRetailerInfoPending: state.retailer.fetchRetailerInfoPending,
      fetchRetailerInfoError: state.retailer.fetchRetailerInfoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchRetailerInfo(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchRetailerInfoError());
  }, [dispatch]);

  return {
    fetchRetailerInfo: boundAction,
    fetchRetailerInfoPending,
    fetchRetailerInfoError,
    dismissFetchRetailerInfoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case RETAILER_FETCH_RETAILER_INFO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchRetailerInfoPending: true,
        fetchRetailerInfoError: null,
      };

    case RETAILER_FETCH_RETAILER_INFO_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchRetailerInfoPending: false,
        fetchRetailerInfoError: null,
        retailerInfo: action.data,
      };

    case RETAILER_FETCH_RETAILER_INFO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchRetailerInfoPending: false,
        fetchRetailerInfoError: action.data.error,
      };

    case RETAILER_FETCH_RETAILER_INFO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchRetailerInfoError: null,
      };

    default:
      return state;
  }
}
