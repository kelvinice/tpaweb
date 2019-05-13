import React, {Component} from 'react';
import NavBar from "../HomePage/NavBar";
import LoginPopup from "../HomePage/LoginPopup";
import RightSideNav from "../../components/HomePage/RightSideNav";
import styled from 'styled-components'

const Padder = styled('div')`
  width: 100%;
  height: 50px;
`

class UserNavBar extends Component {
    state={
        pencariToogle : false
    }
    pencariOnClick(){
        this.setState({pencariToogle : true});
    }

    pencariExitCalled(){
        this.setState({pencariToogle : false});
    }

    render() {
        return (
            <React.Fragment>
                <NavBar position={"fixed"}  rightSide={<RightSideNav pencariClick={()=>this.pencariOnClick()} /> }/>
                <Padder/>
                {this.state.pencariToogle ? <LoginPopup exitCalled={() => this.pencariExitCalled()} /> : null}
            </React.Fragment>
        );
    }
}

export default UserNavBar;