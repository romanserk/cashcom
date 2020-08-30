import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  GENERAL_FETCH_CATEGORIES_BEGIN,
  GENERAL_FETCH_CATEGORIES_SUCCESS,
  GENERAL_FETCH_CATEGORIES_FAILURE,
  GENERAL_FETCH_CATEGORIES_DISMISS_ERROR,
} from './constants';
import { client } from '../../../common/api';
import { CATEGORIES } from '../../../common/constants/api';

export function fetchCategories(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: GENERAL_FETCH_CATEGORIES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = client.get(CATEGORIES);

      doRequest.then(
        (res) => {
          dispatch({
            type: GENERAL_FETCH_CATEGORIES_SUCCESS,
            data: res.data.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: GENERAL_FETCH_CATEGORIES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchCategoriesError() {
  return {
    type: GENERAL_FETCH_CATEGORIES_DISMISS_ERROR,
  };
}

export function useFetchCategories() {
  const dispatch = useDispatch();

  const { categories, fetchCategoriesPending, fetchCategoriesError } = useSelector(
    state => ({
      categories: state.general.categories,
      fetchCategoriesPending: state.general.fetchCategoriesPending,
      fetchCategoriesError: state.general.fetchCategoriesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchCategories(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchCategoriesError());
  }, [dispatch]);

  return {
    categories,
    fetchCategories: boundAction,
    fetchCategoriesPending,
    fetchCategoriesError,
    dismissFetchCategoriesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GENERAL_FETCH_CATEGORIES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchCategoriesPending: true,
        fetchCategoriesError: null,
      };

    case GENERAL_FETCH_CATEGORIES_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchCategoriesPending: false,
        fetchCategoriesError: null,
        categories: action.data,
      };

    case GENERAL_FETCH_CATEGORIES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchCategoriesPending: false,
        fetchCategoriesError: action.data.error,
      };

    case GENERAL_FETCH_CATEGORIES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchCategoriesError: null,
      };

    default:
      return state;
  }
}
