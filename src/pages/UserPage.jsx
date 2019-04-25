import React, {Component} from 'react';
import UserNavBar from "../containers/UserPage/UserNavBar";
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import HomePage from "./HomePage";
import {connect} from "react-redux";
import UserVerificator from "../components/UserVerificator";
import styled from 'styled-components'
import {GreenNavLinkWrapper} from "../components/BeautyComponent";
import NotFoundPage from "./NotFoundPage";
import LeftUserProfile from "../containers/UserPage/LeftUserProfile";

class Comp1 extends Component {
    render() {
        return (
            <div>


            </div>
        );
    }
}

class Comp2 extends Component {
    render() {
        return (
            <div>
                ipsum <br/>
                ipsum <br/> ipsum <br/>
                ipsum <br/>
                ipsum <br/>
                ipsum <br/>

            </div>
        );
    }
}

const NavInfo = styled('div')`
  padding: 5px 10px;
  border-bottom: 1px solid darkgrey;
  box-sizing: border-box;
  font-family: "Titillium Web";
`

const UserProfile = styled('div')`
    width: 100%;
    display: flex;
 
`

const RightUserProfile = styled('div')`
  width: 100%;
  background-color: red;
  
`


class UserPage extends Component {
    render() {
        return (
            <div>
                <UserVerificator></UserVerificator>
                <UserNavBar />

                <NavInfo><GreenNavLinkWrapper><Link to="/">Home</Link></GreenNavLinkWrapper> > User</NavInfo>
                <UserProfile>
                    <LeftUserProfile/>
                    <RightUserProfile>
                        <BrowserRouter>
                            <Switch>
                                <Route path={`${this.props.match.url}/`} component={Comp1} exact />
                                <Route path={`${this.props.match.url}/verifikasi-akun`} component={Comp1} exact />

                                <Route component={NotFoundPage}></Route>
                            </Switch>
                        </BrowserRouter>
                    </RightUserProfile>
                </UserProfile>

            </div>
        );
    }
}



export default UserPage;