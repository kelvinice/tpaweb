import React, {Component} from 'react';
import styled from "styled-components";
import {Switch,Route,Redirect} from "react-router-dom";
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import NotFoundPage from "./NotFoundPage";
import HistoryPanel from "../containers/HistoryPage/HistoryPanel";
import HistoryChat from "../containers/HistoryPage/HistoryChat";
import HistoryView from "../containers/HistoryPage/HistoryView";
import HistoryFavourites from "../containers/HistoryPage/HistoryFavourites";
import ChattingComponent from "../containers/HistoryPage/ChattingComponent";


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
   background-color: #cbeed4;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 5px;
  @media (min-width: 900px){
    box-sizing: border-box;
  }
`

class HistoryPage extends Component {
    render() {
        return (
            <AllWrapper>
                <UserVerificator roleOnly={1}/>
                <InnerFloater>
                    <UserNavBar />
                    <BreadCrumbs/>
                    <BodyFloater>
                        <HistoryPanel/>
                        <InnerAllWrapper>
                            <Switch>
                                <Route path={`${this.props.match.url}/`} render={()=><Redirect to={"history/view"}/>} exact />
                                <Route path={`${this.props.match.url}/chat/:id`} component={ChattingComponent} exact />
                                <Route path={`${this.props.match.url}/chat`} component={HistoryChat} exact />
                                <Route path={`${this.props.match.url}/view`} component={HistoryView} exact />
                                <Route path={`${this.props.match.url}/favourite`} component={HistoryFavourites} exact />
                                <Route component={NotFoundPage}/>
                            </Switch>
                        </InnerAllWrapper>
                    </BodyFloater>
                </InnerFloater>
                
            </AllWrapper>
        );
    }
}

export default HistoryPage;