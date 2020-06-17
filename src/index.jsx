import React from 'react';
import { render as renderDOM } from 'react-dom';
import Main from './components/main/index.jsx';

const render = (Component) => renderDOM(<Component />, document.getElementById('nextChat'));

render(Main);

if (module.hot) {
  module.hot.accept('./components/main/index.jsx', async () => {
    render((await import('./components/main/index.jsx')).default);
  });
}
