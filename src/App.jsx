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
import AdminDashboardPage from "./pages/AdminDashboardPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";
import PremiumPage from "./pages/PremiumPage";
import CheckOutPage from "./pages/CheckOutPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import HistoryPage from "./pages/HistoryPage";


class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/login" component={LoginPage} exact />
                    <Route path="/user/edit-profil" component={EditProfilPage} exact/>
                    <Route path="/user" component={UserPage}  />
                    <Route path="/verifyemail/:id" component={VerifyEmailPage}  />
                    <Route path="/cari" component={CariKostPage}/>
                    <Route path="/admin" component={AdminDashboardPage}/>
                    <Route path="/owner" component={OwnerDashboardPage}/>

                    <Route path="/premium/:id" component={CheckOutPage}/>
                    <Route path="/premium" component={PremiumPage}/>
                    <Route path="/detail/:slug" component={PropertyDetailPage}/>
                    <Route path="/history" component={HistoryPage}/>
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App);
