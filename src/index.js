import React from 'react';
import ReactDOM from 'react-dom';
import fastclick from 'fastclick';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './router/router';
import reducer from './redux/reducers';
import './css/mui.min.css';
import './css/app.css';

fastclick.attach(document.body);

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
