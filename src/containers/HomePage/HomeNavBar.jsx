import React, { Component } from 'react'
import '../../styles/HomePageStyle.css'
import { Link,withRouter } from 'react-router-dom'
import styled from 'styled-components'
import RightSideNav from "../../components/HomePage/RightSideNav";
import {connect} from "react-redux";


const IconBar = styled('span')`
  width: 22px;
  height: 2px;
  display: block;
  border-radius: 1px;
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
`

const LogoImage = styled('div')`
  background-image: url('assets/images/logo_barbarkos_white.png');
  width: 310px;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 600px) {
    height: 50px;
    width: 50px;
    background-size: cover;
    background-position: left;
  }
`

const Coverer = styled('div')`
    @media only screen and (max-width: 600px) {
       height: 50px;
    }
     width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
`

class HomeNavBar extends Component {
    state = {
        isShowMobileNav:true,
        isScrollOver:false
    };

    toogleMobileNav(){
        this.props.toggleMobile();
    }

    render() {
        return (
            <nav className="nav-before">
                {this.state.isScrollOver?
                    <Coverer id="nav-cover" className="nav-after"></Coverer>:
                    <Coverer id="nav-cover" className="nav-before"></Coverer>
                }

                <div style={{height:"inherit",position:"relative"}}>
                    <LogoImage></LogoImage>
                </div>

                {this.props.isShowMobileNav ?
                    <button className="mobile-show" id="mobile-button" style={{height: "20px"}} onClick={() => this.toogleMobileNav()}>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                    </button>
                    :
                    <button className="mobile-show" id="mobile-button" style={{height: "20px",position:"absolute",right:"25px"}} onClick={() =>this.toogleMobileNav()}>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                    </button>
                }
                {this.props.rightSide}
            </nav>
        )
    }

    onScroll() {
        if (window.scrollY > 0) {
            this.setState(
                {isScrollOver:true}
            )
        } else {
            this.setState(
                {isScrollOver:false}
            )
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this));

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }

}

// export default withRouter(HomeNavBar);

const MapStateToProps = state => {
    return {
        isShowMobileNav : state.isShowMobileNav
    }
}
const MapDispatchToProps = dispatch => {
    return {
        toggleMobile : ()=>dispatch({type : "toggle-mobile"})
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(HomeNavBar);