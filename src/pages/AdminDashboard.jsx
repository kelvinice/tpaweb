import React, {Component} from 'react';
import UserVerificator from "../components/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import NotFoundPage from "./NotFoundPage";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import ManageGuest from "../containers/AdminDashboard/ManageGuest";
import AdminPanel from "../containers/AdminDashboard/AdminPanel";

class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <UserVerificator/>
                <UserNavBar />

                <AdminPanel/>


                <Switch>
                    <Route path={`${this.props.match.url}/`} component={null} exact />
                    <Route path={`${this.props.match.url}/manage-guest`} component={ManageGuest} exact />
                    <Route component={NotFoundPage}></Route>
                </Switch>

            </div>
        );
    }
}

export default AdminDashboard;