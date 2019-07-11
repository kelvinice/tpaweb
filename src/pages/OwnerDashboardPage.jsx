import React, {Component} from 'react';
import {Switch,Route} from "react-router-dom";
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import NotFoundPage from "./NotFoundPage";
import styled from "styled-components";
import OwnerDashboardInformation from "../containers/OwnerDashboard/OwnerDashboardInformation";
import OwnerPanel from "../containers/OwnerDashboard/OwnerPanel";
import ManagePhone from "../containers/OwnerDashboard/ManagePhone";
import BreadCrumbs from "../components/General/BreadCrumbs";
import ManageHouse from "../containers/OwnerDashboard/ManageHouse";
import AddHouse from "../containers/OwnerDashboard/AddHouse";
import ManageApartement from "../containers/OwnerDashboard/ManageApartement";
import OwnerChat from "../containers/OwnerDashboard/OwnerChat";
import HistoryPremium from "../containers/OwnerDashboard/HistoryPremium";
import ChattingComponent from "../containers/HistoryPage/ChattingComponent";
import AddApartement from "../containers/OwnerDashboard/AddApartement";

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

const InnerAllWrapper = styled('div')`
  background-color: #ffbabc;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  
  @media (min-width: 900px){
    box-sizing: border-box;
    padding: 5px;
  }
`


class OwnerDashboardPage extends Component {
    render() {
        return (
            <AllWrapper>
                <UserVerificator roleOnly={2}/>
                <InnerFloater>
                    <UserNavBar />
                    <BreadCrumbs/>
                    <BodyFloater>
                        <OwnerPanel/>
                        <InnerAllWrapper>
                            <Switch>
                                <Route path={`${this.props.match.url}/`} component={OwnerDashboardInformation} exact />
                                <Route path={`${this.props.match.url}/dashboard`} component={OwnerDashboardInformation} exact />
                                <Route path={`${this.props.match.url}/manage-house/add-house`} component={AddHouse} exact />
                                <Route path={`${this.props.match.url}/manage-house`} component={ManageHouse} exact />
                                <Route path={`${this.props.match.url}/manage-apartement/add-apartement`} component={AddApartement} exact />
                                <Route path={`${this.props.match.url}/manage-apartement`} component={ManageApartement} exact />
                                <Route path={`${this.props.match.url}/chat`} component={OwnerChat} exact />
                                <Route path={`${this.props.match.url}/chat/:id`} component={ChattingComponent} exact />
                                {/*<Route path={`${this.props.match.url}/checkout`} component={CheckOutPage} exact />*/}
                                <Route path={`${this.props.match.url}/history-premium`} component={HistoryPremium} exact />
                                <Route path={`${this.props.match.url}/phone`} component={ManagePhone} exact />
                                <Route component={NotFoundPage}/>
                            </Switch>
                        </InnerAllWrapper>
                    </BodyFloater>
                </InnerFloater>
            </AllWrapper>
        );
    }
}

export default OwnerDashboardPage;