import ReactDOM from 'react-dom';
import React from 'react';
import AppLoader from './component/AppLoader';
const packageVersion = require('../package.json').version;

function start() {
    ReactDOM.render(<AppLoader/>, document.getElementById('root'));
}

start();
