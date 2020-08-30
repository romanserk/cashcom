import { Home } from './';

export default {
  path: '',
  childRoutes: [{ path: 'home', component: Home, isIndex: true, private: true }],
};
