import React, {Component} from 'react'
import NavBar from "../containers/HomePage/NavBar";
import PromotionHeading from "../containers/HomePage/PromotionHeading";
import LoginPopup from '../containers/HomePage/LoginPopup';
import Footer from "../containers/HomePage/Footer";
import AppPromotion from "../containers/HomePage/AppPromotion";
import AdsPromotion from "../containers/HomePage/AdsPromotion";
import FavouriteKost from "../containers/HomePage/FavouriteKost";
import styled from 'styled-components'
import RightSideNav from "../components/HomePage/RightSideNav";
import {connect} from 'react-redux'
import KotaBesar from "../containers/HomePage/KotaBesar";
import UserVerificator from "../components/General/UserVerificator";
import TopFifthCity from "../containers/HomePage/TopFifthCity";
import FavouriteApartement from "../containers/HomePage/FavouriteApartement";

const Pads = styled('div')`
    @media (max-width: 600px) {
      padding: 0;
    }
    padding: 50px;
`

class HomePage extends Component {
    state = {
        pencariToogle : false
    };

    pencariOnClick(){
        this.setState({pencariToogle : true});
    }

    pencariExitCalled(){
        this.setState({pencariToogle : false});
    }

    componentDidMount() {
        if(localStorage.getItem('loginpop') === "yes"){
            this.setState({pencariToogle : true})
            localStorage.removeItem('loginpop')
        }
    }


    render() {
        return (
            <div >
                <UserVerificator noRedirect={true}/>
                <NavBar position={"fixed"} animatedGreen={true} rightSide={<RightSideNav pencariClick={()=>this.pencariOnClick()} /> }/>

                <PromotionHeading/>
                {this.state.pencariToogle ? <LoginPopup exitCalled={() => this.pencariExitCalled()} /> : null}
                <Pads>
                    {<TopFifthCity/>}
                    <br/>
                    <FavouriteKost/>
                    <br/>
                    <FavouriteApartement/>
                    <br/>
                    <KotaBesar/>
                    <AdsPromotion/>
                    <br/>

                    <br/>
                    <AppPromotion />

                </Pads>

                <Footer history={this.props.history}/>
            </div>
        )
    }
}

const MapDispatchToProps = dispatch => {
    return {
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

const MapStateToProps = state => {
    return {
        isShowMobileNav : state.isShowMobileNav,
        UserLogin : state.UserLogin
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(HomePage);


