import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/rootReducer';

import './index.scss';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';

let store = createStore(rootReducer, applyMiddleware(reduxLogger, reduxThunk));
store.subscribe(() => {});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
