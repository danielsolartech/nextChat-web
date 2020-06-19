import React from 'react';
import { checkAuthenticated } from '../../data/consts/data';
import { Provider } from 'react-redux';
import store from '../../data/';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigator from '../navigator';
import Routes from '../../pages/routes';
import { Authenticated } from '../../types';
import './index.scss';

const Main: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);

  if (!checked) {
    checkAuthenticated()
      .then((data: Authenticated) => {
        setAuthenticated(data.auth);
        setChecked(true);
      }).catch(() => setChecked(true));

    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Navigator />

          <Switch>
            {Routes.pages.length > 0 && Routes.pages.map((Page, i) =>
              Page.url ? (
                <Route exact path={Page.url} component={isAuthenticated ? Page.whenAuthenticated : Page.whenNoAuthenticated}
                  key={'page_' + (i + 1)} />
              ) : (Page.urls && Page.urls.length > 0) && (Page.urls.map((url, i2) => (
                <Route exact path={url} component={isAuthenticated ? Page.whenAuthenticated : Page.whenNoAuthenticated}
                  key={'page_' + (i + 1) + '_' + (i2 + 1)} />
              )))
            )}
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </Provider>
  );
};

export default Main;
