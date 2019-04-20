import React, {Component} from 'react'
import NavBar from "../containers/HomePage/NavBar";
import PromotionHeading from "../containers/HomePage/PromotionHeading";
import LoginPopup from '../containers/HomePage/LoginPopup';
import Footer from "../containers/HomePage/Footer";

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
            <div>

                <NavBar pencariClick={()=>this.pencariOnClick()}/>

                <PromotionHeading/>
                {this.state.pencariToogle ? <LoginPopup exitCalled={() => this.pencariExitCalled()} /> : null}

                Promo <br/><br/>
                <Footer/>
            </div>
        )
    }
}

export default HomePage;

