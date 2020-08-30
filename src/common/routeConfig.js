import { App } from '../features/home';
import { PageNotFound } from '../features/general';
import homeRoute from '../features/home/route';
import generalRoute from '../features/general/route';
import examplesRoute from '../features/examples/route';
import _ from 'lodash';
import authRoute from '../features/auth/route';
import dashboardRoute from '../features/dashboard/route';
import retailerRoute from '../features/retailer/route';
import modalRoute from '../features/modal/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  homeRoute,
  generalRoute,
  examplesRoute,
  authRoute,
  dashboardRoute,
  retailerRoute,
  modalRoute,
];

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, (child => child.isIndex));
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
