// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Login, Register } from './';

export default {
  path: 'auth',
  childRoutes: [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
  ],
};
