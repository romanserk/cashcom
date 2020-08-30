import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import history from './history';
import homeReducer from '../features/home/redux/reducer';
import generalReducer from '../features/general/redux/reducer';
import examplesReducer from '../features/examples/redux/reducer';
import authReducer from '../features/auth/redux/reducer';
import dashboardReducer from '../features/dashboard/redux/reducer';
import retailerReducer from '../features/retailer/redux/reducer';
import modalReducer from '../features/modal/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter(history),
  home: homeReducer,
  general: generalReducer,
  examples: examplesReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  retailer: retailerReducer,
  modal: modalReducer,
};

export default combineReducers(reducerMap);
