import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/login" component={LoginPage} exact />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
