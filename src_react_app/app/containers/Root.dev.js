import React, {
  Component
} from 'react';
import {
  Provider
} from 'react-redux';
import {
  Router
} from 'react-router';

import routes from '../routes';
import DevTools from './DevTools';
import {
  config
} from 'config'

export default class Root extends Component {

  render() {

    const {
      store,
      history
    } = this.props;

    const devTools = config.needDevTool ? <DevTools /> : null

    return (
      <Provider store={store}>
          <div>
            <Router history={history} routes={routes()} />
            {devTools}
          </div>
        </Provider>
    );
  }
}