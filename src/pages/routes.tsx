import * as React from 'react';
import { Redirect } from 'react-router-dom';

export interface IPage {
  url?: string;
  urls?: string[];
  whenNoAuthenticated: React.LazyExoticComponent<React.FC> | React.FC;
  whenAuthenticated: React.LazyExoticComponent<React.FC> | React.FC;
}

export interface IRoutes {
  pages: IPage[];
}

const Index: React.LazyExoticComponent<React.FC> = React.lazy(() => import('./index'));
const Dashboard: React.LazyExoticComponent<React.FC> = React.lazy(() => import('./dashboard'));

const routes: IRoutes = {
  pages: [
    {
      urls: [
        '/',
        '/index',
        '/inicio',
      ],
      whenAuthenticated: Dashboard,
      whenNoAuthenticated: Index,
    },
    {
      urls: [
        '/dashboard',
        '/me',
      ],
      whenAuthenticated: Dashboard,
      whenNoAuthenticated: () => <Redirect to="/signin" />,
    },
    {
      urls: [
        '/signout',
        '/logout',
        '/salir',
      ],
      whenAuthenticated: React.lazy(() => import('./signout')),
      whenNoAuthenticated: () => <Redirect to="/signin" />,
    }
  ],
};

export default routes;
