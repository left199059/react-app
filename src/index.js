import React from 'react';
import ReactDOM from 'react-dom';
import fastclick from 'fastclick';
import App from './router/router';
import './css/mui.min.css';
import './css/app.css';

fastclick.attach(document.body);

ReactDOM.render(<App />, document.getElementById('app'));
