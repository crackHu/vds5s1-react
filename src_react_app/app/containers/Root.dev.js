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

export default class Root extends Component {

  state = {
    loggedIn: true
  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate,,', this.state.loggedIn)
  }

  componentWillReceiveProps = () => {
    console.log("componentWillReceiveProps Root,,,,,,,", this.props.data)
  }

  login = (obj) => {
    console.log('login.......', obj)
  }

  render() {

    const {
      store,
      history
    } = this.props;

    const devTools = CONFIG.needDevTool && !window.devToolsExtension ? <DevTools /> : null
    const loggedIn = this.state.loggedIn
    loggedIn ? localStorage.setItem('loggedIn', 1) : localStorage.setItem('loggedIn', 0)

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