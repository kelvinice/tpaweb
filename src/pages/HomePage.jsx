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

const Pads = styled('div')`
    @media (max-width: 600px) {
      padding: 0px;
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
        let token = localStorage.getItem('token');
        const axios = require('axios');

        axios.get(`http://localhost:8000/curr?token=${token}`,{
            headers:{
                'token':token
            }
        }).then((response) => {
            if(response.data.message==="success"){
                //console.log(response.data.user);
                this.props.updateUserlogin(response.data.user)
            }else{
                console.log("no login");
            }

        }).catch((error)=>{
            console.log(error.response);
        })
    }


    render() {
        return (
            <div >
                <NavBar position={"fixed"} animatedGreen={true} rightSide={<RightSideNav pencariClick={()=>this.pencariOnClick()} /> }/>

                <PromotionHeading/>
                {this.state.pencariToogle ? <LoginPopup exitCalled={() => this.pencariExitCalled()} /> : null}
                <Pads>
                    Promo <br/>
                    Anggap aja ini slider
                    <br/>
                    <br/>
                    {/*Lokasi favorit kost di ...*/}
                    <br/>
                    {/*<FavouriteKost/>*/}
                    <br/><br/>
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


