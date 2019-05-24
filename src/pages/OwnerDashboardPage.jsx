import React, {Component} from 'react';
import {Switch,Route} from "react-router-dom";
import UserVerificator from "../components/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import NotFoundPage from "./NotFoundPage";
import styled from "styled-components";
import OwnerDashboardInformation from "../containers/OwnerDashboard/OwnerDashboardInformation";
import OwnerPanel from "../containers/OwnerDashboard/OwnerPanel";
import ManagePhone from "../containers/OwnerDashboard/ManagePhone";

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


class OwnerDashboardPage extends Component {
    render() {
        return (
            <AllWrapper>
                <UserVerificator roleOnly={2}/>
                <InnerFloater>
                    <UserNavBar />
                    <BodyFloater>
                        <OwnerPanel/>
                        <Switch>
                            <Route path={`${this.props.match.url}/`} component={OwnerDashboardInformation} exact />
                            <Route path={`${this.props.match.url}/dashboard`} component={OwnerDashboardInformation} exact />
                            {/*<Route path={`${this.props.match.url}/manage-house`} component={ManageGuest} exact />*/}
                            {/*<Route path={`${this.props.match.url}/manage-apartement`} component={ManageOwner} exact />*/}
                            {/*<Route path={`${this.props.match.url}/chat`} component={ManagePost} exact />*/}
                            {/*<Route path={`${this.props.match.url}/history-premium`} component={ManageFacility} exact />*/}
                            <Route path={`${this.props.match.url}/phone`} component={ManagePhone} exact />
                            <Route component={NotFoundPage}/>
                        </Switch>
                    </BodyFloater>
                </InnerFloater>
            </AllWrapper>
        );
    }
}

export default OwnerDashboardPage;