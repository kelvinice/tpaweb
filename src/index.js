import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Reducer from "./components/General/SuperGlobal";
import {BrowserRouter} from "react-router-dom";


// const Reducers2 = combineReducers({
//     key1:Reducer
// })
const store = createStore(Reducer);

const GlobalWrapper =(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>
)
window.store = store;

ReactDOM.render(GlobalWrapper , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
