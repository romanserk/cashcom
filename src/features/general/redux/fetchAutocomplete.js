import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  GENERAL_FETCH_AUTOCOMPLETE_BEGIN,
  GENERAL_FETCH_AUTOCOMPLETE_SUCCESS,
  GENERAL_FETCH_AUTOCOMPLETE_FAILURE,
  GENERAL_FETCH_AUTOCOMPLETE_DISMISS_ERROR,
} from './constants';
import { client } from '../../../common/api';
import { SEARCH_AUTOCOMPLETE } from '../../../common/constants/api';

export function fetchAutocomplete(value) {
  console.log(value);
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: GENERAL_FETCH_AUTOCOMPLETE_BEGIN,
    });
    ///reta - working word for checking
    const promise = new Promise((resolve, reject) => {
      const doRequest = client.get(SEARCH_AUTOCOMPLETE, {
        params: {
          term: value
        }
      });

      doRequest.then(
        (res) => {
          dispatch({
            type: GENERAL_FETCH_AUTOCOMPLETE_SUCCESS,
            data: res.data.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: GENERAL_FETCH_AUTOCOMPLETE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchAutocompleteError() {
  return {
    type: GENERAL_FETCH_AUTOCOMPLETE_DISMISS_ERROR,
  };
}

export function useFetchAutocomplete() {
  const dispatch = useDispatch();

  const { fetchAutocompletePending, fetchAutocompleteError } = useSelector(
    state => ({
      fetchAutocompletePending: state.general.fetchAutocompletePending,
      fetchAutocompleteError: state.general.fetchAutocompleteError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchAutocomplete(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchAutocompleteError());
  }, [dispatch]);

  return {
    fetchAutocomplete: boundAction,
    fetchAutocompletePending,
    fetchAutocompleteError,
    dismissFetchAutocompleteError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GENERAL_FETCH_AUTOCOMPLETE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchAutocompletePending: true,
        fetchAutocompleteError: null,
      };

    case GENERAL_FETCH_AUTOCOMPLETE_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchAutocompletePending: false,
        fetchAutocompleteError: null,
        autocompleteList: action.data,
      };

    case GENERAL_FETCH_AUTOCOMPLETE_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchAutocompletePending: false,
        fetchAutocompleteError: action.data.error,
      };

    case GENERAL_FETCH_AUTOCOMPLETE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchAutocompleteError: null,
      };

    default:
      return state;
  }
}
