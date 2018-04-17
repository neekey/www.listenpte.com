import App from './app/comp.App';

import HomeRoute from './home/route';
import WFDRoute from './wfd/route';

const rootRoute = {
  path: '/',
  component: App,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/index'),
  },
  childRoutes: [
    HomeRoute,
    WFDRoute,
  ],
};

export default rootRoute;
