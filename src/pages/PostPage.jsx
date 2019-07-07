import React, {Component} from 'react';
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import NotFoundPage from "./NotFoundPage";
import styled from "styled-components";
import {Switch,Route} from 'react-router-dom';
import AllPost from "../containers/PostPage/AllPost";
import PostDetail from "../containers/PostPage/PostDetail";

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
   background-color: #ccc3ee;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 5px;
  @media (min-width: 900px){
    box-sizing: border-box;
  }
`


class PostPage extends Component {
    render() {
        return (
            <AllWrapper>
                <UserVerificator/>
                <InnerFloater>
                    <UserNavBar />
                    <BreadCrumbs/>
                    <BodyFloater>
                        <InnerAllWrapper>
                            <Switch>
                                <Route path={`${this.props.match.url}/:slug`} component={PostDetail} exact />
                                <Route path={`${this.props.match.url}/`} component={AllPost} exact />
                                <Route component={NotFoundPage}/>
                            </Switch>
                        </InnerAllWrapper>
                    </BodyFloater>
                </InnerFloater>

            </AllWrapper>
        );
    }
}

export default PostPage;