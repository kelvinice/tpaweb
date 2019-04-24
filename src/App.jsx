import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from "./pages/UserPage";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/login" component={LoginPage} exact />
                    <Route path="/user" component={UserPage} exact />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
