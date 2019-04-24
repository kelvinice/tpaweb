import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux'
import Reducer from "./components/SuperGlobal";

// const Reducers2 = combineReducers({
//     key1:Reducer
// })

const GlobalWrapper =(
    <Provider store={createStore(Reducer)}>
        <App />
    </Provider>
)



ReactDOM.render(GlobalWrapper , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
