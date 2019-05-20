import React, {Component} from 'react';
import UserVerificator from "../components/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import NotFoundPage from "./NotFoundPage";
import {Switch,Route} from "react-router-dom";
import ManageGuest from "../containers/AdminDashboard/ManageGuest";
import AdminPanel from "../containers/AdminDashboard/AdminPanel";
import styled from 'styled-components'
import AdminDashboardInformation from "../containers/AdminDashboard/AdminDashboardInformation";

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

class AdminDashboard extends Component {
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
                            <Route path={`${this.props.match.url}/manage-guest`} component={ManageGuest} exact />
                            <Route component={NotFoundPage}/>
                        </Switch>

                    </BodyFloater>

                </InnerFloater>

            </AllWrapper>
        );
    }
}

export default AdminDashboard;