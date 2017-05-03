import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import {
  persistState
} from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

// 调用日志打印方法
const loggerMiddleware = createLogger()

// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware]

// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
const enhancer = compose(
  applyMiddleware(...middleware),
  /*DevTools.instrument(),*/
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  ),
  /*window.devToolsExtension ? window.devToolsExtension() : f => f*/
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}