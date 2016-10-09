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
  CONFIG
} from 'config'
import {
  LS
} from 'login_conf'

const USR = LS.USR
const LOGGEDIN = LS.LOGGEDIN

let loggedIn = localStorage.getItem(LOGGEDIN)
if (loggedIn == null) {
  loggedIn = 0
  localStorage.setItem(LOGGEDIN, loggedIn)
}

export default class Root extends Component {

  state = {}

  componentDidUpdate = () => {}

  componentWillReceiveProps = () => {}

  render() {

    const {
      store,
      history
    } = this.props;

    const devTools = CONFIG.needDevTool && !window.devToolsExtension ? <DevTools /> : null

    return (
      <Provider store={store}>
          <div>
              <Router history={history} routes={routes(loggedIn)} />
              {devTools}
          </div>
      </Provider>
    );
  }
}