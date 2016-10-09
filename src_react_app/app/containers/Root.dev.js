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
  CONFIG as LCONFIG
} from 'login_conf'

const USR = LCONFIG.LS.USR
const LOGGEDIN = LCONFIG.LS.LOGGEDIN

let loggedIn = localStorage.getItem(LOGGEDIN)
if (loggedIn == null) {
  loggedIn = LCONFIG.LOGIN_ON
  localStorage.setItem(LOGGEDIN, loggedIn)
}

const devTools = CONFIG.needDevTool && !window.devToolsExtension ? <DevTools /> : null

export default class Root extends Component {

  state = {}

  componentDidUpdate = () => {}

  componentWillReceiveProps = () => {}

  render() {

    const {
      store,
      history
    } = this.props;

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