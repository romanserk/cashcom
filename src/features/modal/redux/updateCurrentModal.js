import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  MODAL_UPDATE_CURRENT_MODAL,
} from './constants';

export function updateCurrentModal(modalName) {
  return {
    type: MODAL_UPDATE_CURRENT_MODAL,
    data: modalName,
  };
}

export function useUpdateCurrentModal() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(updateCurrentModal(...params)), [dispatch]);
  return { updateCurrentModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case MODAL_UPDATE_CURRENT_MODAL:
      return {
        ...state,
        currentModal: action.data,
      };

    default:
      return state;
  }
}
