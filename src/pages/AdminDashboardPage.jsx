import React, {Component} from 'react';
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import NotFoundPage from "./NotFoundPage";
import {Switch,Route} from "react-router-dom";
import ManageGuest from "../containers/AdminDashboard/ManageGuest";
import AdminPanel from "../containers/AdminDashboard/AdminPanel";
import styled from 'styled-components'
import AdminDashboardInformation from "../containers/AdminDashboard/AdminDashboardInformation";
import ManageOwner from "../containers/AdminDashboard/ManageOwner";
import ManagePost from "../containers/AdminDashboard/ManagePost";
import ManagePremium from "../containers/AdminDashboard/ManagePremium";
import ManageFacility from "../containers/AdminDashboard/ManageFacility";
import ManageTransaction from "../containers/AdminDashboard/ManageTransaction";
import ManageReport from "../containers/AdminDashboard/ManageReport";

const AllWrapper = styled('div')`
  height: 100%;
  width: 100%;
`

const InnerFloater = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const BodyFloater = styled('div')`
  display: flex;
  height: 100%;
`

class AdminDashboardPage extends Component {
    render() {
        return (
            <AllWrapper>
                <UserVerificator roleOnly={3}/>
                <InnerFloater>
                    <UserNavBar />
                    <BodyFloater>
                        <AdminPanel/>
                        <Switch>
                            <Route path={`${this.props.match.url}/`} component={AdminDashboardInformation} exact />
                            <Route path={`${this.props.match.url}/dashboard`} component={AdminDashboardInformation} exact />
                            <Route path={`${this.props.match.url}/manage-guest`} component={ManageGuest} exact />
                            <Route path={`${this.props.match.url}/manage-owner`} component={ManageOwner} exact />
                            <Route path={`${this.props.match.url}/manage-post`} component={ManagePost} exact />
                            <Route path={`${this.props.match.url}/manage-facility`} component={ManageFacility} exact />
                            <Route path={`${this.props.match.url}/manage-premium`} component={ManagePremium} exact />
                            <Route path={`${this.props.match.url}/manage-transaction`} component={ManageTransaction} exact />
                            <Route path={`${this.props.match.url}/manage-report`} component={ManageReport} exact />
                            <Route component={NotFoundPage}/>
                        </Switch>
                    </BodyFloater>
                </InnerFloater>
            </AllWrapper>
        );
    }
}

export default AdminDashboardPage;