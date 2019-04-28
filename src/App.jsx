import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route,Switch} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditProfilPage from "./pages/EditProfilPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

class App extends Component {
    render() {
        return (

            <div style={{width:"100vw"}}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/login" component={LoginPage} exact />
                        <Route path="/user/edit-profil" component={EditProfilPage} exact/>
                        <Route path="/user" component={UserPage}  />
                        <Route path="/verifyemail/:id" component={VerifyEmailPage}  />

                        <Route component={NotFoundPage} />
                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default App;
