import React, {Component} from 'react';
import NavBar from "../HomePage/NavBar";
import LoginPopup from "../HomePage/LoginPopup";
import RightSideNav from "../../components/HomePage/RightSideNav";


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
            <div >
                <NavBar position={"sticky"}  rightSide={<RightSideNav pencariClick={()=>this.pencariOnClick()} /> }/>
                {this.state.pencariToogle ? <LoginPopup exitCalled={() => this.pencariExitCalled()} /> : null}
            </div>
        );
    }
}

export default UserNavBar;