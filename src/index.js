import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './router/router';
import './css/mui.min.css';
import './css/app.css';

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('app'));
