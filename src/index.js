import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import history from './app/history';
import routes from './routes';
import 'antd/dist/antd.css';
import './index.scss';
import Main from './main';

window.$history = history;

const rootRoute = {
  path: '/',
  component: Main,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/index'),
  },
  childRoutes: [
    ...routes,
    {
      path: '*',
      onEnter: (nextState, replace) => replace('/index'),
    },
  ],
};

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((<Router history={history} routes={rootRoute} />), document.getElementById('main'));
