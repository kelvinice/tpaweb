import React, { Component } from 'react'
import '../../styles/HomePageStyle.css'
import styled from 'styled-components'
import {connect} from "react-redux";
import {Link,withRouter} from "react-router-dom";
import SearchBox from "../../components/General/SearchBox";

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
  background-image: url('/assets/images/logo_barbarkos_white.png');
  width: 330px;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 1150px) {
    height: 50px;
    width: 50px;
    background-size: cover;
    background-position: left;
  }
`

const Coverer = styled('div')`
    @media only screen and (max-width: 900px) {
       height: 50px;
    }
     width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
`

const NavWrapper =styled('div')`
  @media (max-width: 900px){
  display: flex;
  }
`


class NavBar extends Component {
    constructor(props){
        super(props);
        this.onScroll = this.onScroll.bind(this); //bind function once
    }

    state = {
        isShowMobileNav:true,
        isScrollOver:false
    };

    toggleMobileNav(){
        this.props.toggleMobile();
    }

    handleNavMobile(){
        if(this.props.isShowMobileNav){
            return "nav-before ultra-height-mobile"
        }else{
            return "nav-before mini-height-mobile"
        }
    }

    render() {
        return (
            <nav className={this.handleNavMobile()}  style={{position:this.props.position}} >
                {this.state.isScrollOver?
                    <Coverer id="nav-cover" className="nav-after"/>:
                    <Coverer id="nav-cover" className="nav-before"/>
                }

                <div style={{height:"inherit",position:"relative"}}>
                    <Link to={"/"}><LogoImage/></Link>
                </div>

                <SearchBox/>

                <NavWrapper>

                {this.props.isShowMobileNav ?
                        <button className="mobile-show" id="mobile-button" style={{height: "20px"}} onClick={() => this.toggleMobileNav()}>
                            <IconBar/>
                            <IconBar/>
                            <IconBar/>
                        </button>
                        :
                        <button className="mobile-show" id="mobile-button" style={{height: "20px",position:"absolute",right:"0px"}} onClick={() =>this.toggleMobileNav()}>
                            <IconBar/>
                            <IconBar/>
                            <IconBar/>
                        </button>
                    }
                    {this.props.rightSide}
                </NavWrapper>
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
        if(this.props.animatedGreen){
            window.addEventListener('scroll', this.onScroll);
        }else{
            this.setState({isScrollOver:true});
        }

    }

    componentWillUnmount() {
        if(this.props.animatedGreen) {
            window.removeEventListener('scroll', this.onScroll);
        }
    }

}

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

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(NavBar));