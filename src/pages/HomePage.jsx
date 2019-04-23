import React, {Component} from 'react'
import NavBar from "../containers/HomePage/NavBar";
import PromotionHeading from "../containers/HomePage/PromotionHeading";
import LoginPopup from '../containers/HomePage/LoginPopup';
import Footer from "../containers/HomePage/Footer";
import AppPromotion from "../containers/HomePage/AppPromotion";
import AdsPromotion from "../containers/HomePage/AdsPromotion";
import FavouriteKost from "../containers/HomePage/FavouriteKost";
import styled from 'styled-components'

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

    render() {
        return (
            <div >
                <NavBar pencariClick={()=>this.pencariOnClick()}/>

                <PromotionHeading/>
                {this.state.pencariToogle ? <LoginPopup exitCalled={() => this.pencariExitCalled()} /> : null}
                <Pads>
                    Promo <br/>
                    Anggap aja ini slider
                    <br/>
                    <br/>
                    Lokasi favorit kost di ...
                    <br/>
                    <FavouriteKost/>
                    <br/><br/>
                    <AdsPromotion/>
                    <br/><br/>
                    <AppPromotion />
                </Pads>
                <Footer history={this.props.history}/>
            </div>
        )
    }
}

export default HomePage;

