import express from 'express';
import React from 'react';
import {
  renderToString
} from 'react-dom/server';
import {
  RoutingContext,
  match
} from 'react-router';
import {
  Provider
} from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const app = express();

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>
  `;
}

app.use((req, res) => {
  match({
    routes,
    location: req.url
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = configureStore();
      const state = store.getState();

      Promise.all([
          store.dispatch(fetchList()),
          store.dispatch(fetchItem(renderProps.params.id))
        ])
        .then(() => {
          const html = renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps} />
            </Provider>
          );
          res.end(renderFullPage(html, store.getState()));
        });
    } else {
      res.status(404).end('Not found');
    }
  });
});