import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './reducers/store';
import './styles/styles.scss';
import App from './App';

ReactDOM.render(
        <Provider store={createStore}>
             <App />
        </Provider>,document.getElementById('root'))
