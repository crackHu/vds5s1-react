import React from 'react';
import {
  render
} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const app = document.createElement('div');
document.body.appendChild(app);

render(
  <Root
      store={ store }
    />,
  app
);

if (module.hot) {
  alert("bbbb")
  module.hot.accept('./containers/Root', () => {
    const RootContainer = require('./containers/Root').default;
    render(
      <RootContainer
          store={ store }
        />,
      app
    );
  });
} else {
  alert("aaaaa")
}