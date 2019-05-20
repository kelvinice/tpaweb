import React, { Component } from 'react';
import './App.css';
import { Route,Switch,withRouter} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditProfilPage from "./pages/EditProfilPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import CariKostPage from "./pages/CariKostPage";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMailBulk,
    faMale,
    faTools,
    faUser,
    faMedal,
    faStickyNote,
    faShoppingCart,
    faCompass,
    faTrashAlt, faBan, faRedo
} from '@fortawesome/free-solid-svg-icons'

library.add(faMailBulk);library.add(faMale);library.add(faTools);library.add(faUser);library.add(faUser);library.add(faMedal);library.add(faStickyNote);library.add(faShoppingCart);library.add(faShoppingCart);
library.add(faBan);library.add(faTrashAlt);library.add(faRedo);

class App extends Component {
    render() {
        return (
            <div style={{width:"100vw"}}>
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/login" component={LoginPage} exact />
                    <Route path="/user/edit-profil" component={EditProfilPage} exact/>
                    <Route path="/user" component={UserPage}  />
                    <Route path="/verifyemail/:id" component={VerifyEmailPage}  />
                    <Route path="/cari" component={CariKostPage}></Route>
                    <Route path="/admin" component={AdminDashboard}></Route>
                    <Route path="/owner" component={OwnerDashboard}></Route>
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App);
