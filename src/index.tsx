import React from 'react';
import { render as renderDOM } from 'react-dom';
import Main from './components/main/index';

const render = (Component: React.FC) => renderDOM(<Component />, document.getElementById('nextChat'));

render(Main);

if ((module as any).hot) {
  (module as any).hot.accept('./components/main/index', async () => {
    render((await import('./components/main/index')).default);
  });
}
