import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_FETCH_HOME_SECTIONS_BEGIN,
  HOME_FETCH_HOME_SECTIONS_SUCCESS,
  HOME_FETCH_HOME_SECTIONS_FAILURE,
  HOME_FETCH_HOME_SECTIONS_DISMISS_ERROR,
} from './constants';
import { autorizedClient } from '../../../common/api';
import { HOME_SECTIONS } from '../../../common/constants/api';

export function fetchHomeSections(type) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_HOME_SECTIONS_BEGIN,
    });
    const homepageRetailers = [];

    const promise = new Promise((resolve, reject) => {
      const doRequest = autorizedClient.get(HOME_SECTIONS, {
        params: {
          type: type
        }
      });
      doRequest.then(
        (res) => {
          if (res.data && res.data.data) {
            dispatch({
              type: HOME_FETCH_HOME_SECTIONS_SUCCESS,
              data: res.data.data,
            });
          }
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_FETCH_HOME_SECTIONS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchHomeSectionsError() {
  return {
    type: HOME_FETCH_HOME_SECTIONS_DISMISS_ERROR,
  };
}

export function useFetchHomeSections() {
  const dispatch = useDispatch();

  const { fetchHomeSectionsPending, fetchHomeSectionsError, homeSections } = useSelector(
    state => ({
      fetchHomeSectionsPending: state.home.fetchHomeSectionsPending,
      fetchHomeSectionsError: state.home.fetchHomeSectionsError,
      homeSections: state.home.homeSections,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchHomeSections(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchHomeSectionsError());
  }, [dispatch]);

  return {
    fetchHomeSections: boundAction,
    fetchHomeSectionsPending,
    fetchHomeSectionsError,
    homeSections,
    dismissFetchHomeSectionsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_HOME_SECTIONS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchHomeSectionsPending: true,
        fetchHomeSectionsError: null,
      };

    case HOME_FETCH_HOME_SECTIONS_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchHomeSectionsPending: false,
        fetchHomeSectionsError: null,
        homeSections: action.data,
      };

    case HOME_FETCH_HOME_SECTIONS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchHomeSectionsPending: false,
        fetchHomeSectionsError: action.data.error,
      };

    case HOME_FETCH_HOME_SECTIONS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchHomeSectionsError: null,
      };

    default:
      return state;
  }
}
