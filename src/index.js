import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter,} from 'react-router-dom';
import {Store,} from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <HashRouter>
        <Store>
            <App />
        </Store>
    </HashRouter>, document.getElementById('root'));