import React, { Component } from 'react'
import '../../styles/HomePageStyle.css'
// import logo from '../../assets/images/logo_barbarkos_white.png'
import { Link } from 'react-router-dom'
import * as PropTypes from "prop-types";
import styled from 'styled-components'


class RightSideNav extends Component {
    render() {
        return <div id="right-side" className={this.props.className}>
            <Link>
                <div className="wrapper mobile-nav-item">
                    <div>Download App</div>
                </div>
            </Link>
            <span>
                        <div className="wrapper">
                            <div id="button-cari">
                                <div id="masuk-title">
                                    Cari Iklan &#9662;
                                </div>
                                <div id="cari-wrapper" className="child-wrapper">
                                    <div className="mobile-nav-item">Cari Kost</div>
                                    <div id="pemilik-masuk-btn" className="mobile-nav-item">Cari Apartement</div>
                                </div>
                            </div>
                        </div>
                    </span>
            <Link>
                <div className="wrapper">
                    <div className=" mobile-nav-item">Promosikan Iklan Anda</div>
                </div>
            </Link>
            <span>
                        <div className="wrapper">
                            <div id="button-masuk">
                                <div id="masuk-title">
                                    Masuk
                                </div>
                                <div id="login-wrapper" className="child-wrapper">
                                    <div className="mobile-nav-item" onClick={this.props.onClick}><span
                                        className="mobile-only-show">Masuk</span> Sebagai Pencari</div>
                                    <Link to="/login"><div id="pemilik-masuk-btn" className="mobile-nav-item"
                                                           style={{color: "black"}}><span
                                        className="mobile-only-show">Masuk</span> Sebagai Pemilik</div></Link>
                                </div>
                            </div>
                        </div>
                    </span>
        </div>;
    }
}

RightSideNav.propTypes = {onClick: PropTypes.func};

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
  background-image: url("assets/images/logo_barbarkos_white.png");
  width: 310px;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 600px) {
    //margin: 10px;
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


class NavBar extends Component {
    state = {
        isSetMasuk: false,
        isSetCari: false,
        isShowMobileNav:false,
        isScrollOver:false

    };

    toogleMobileNav(){
        this.setState({ isShowMobileNav: !this.state.isShowMobileNav });
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
                    {/*<img src="assets/images/logo_barbarkos_white.png" alt="" width="200vw" height="100%"/>*/}
                </div>


                {/*{this.state.isShowMobileNav ? <button className="mobile-show" id="mobile-button" style={{height: "20px"}} onClick={() => this.toogleMobileNav()}>O</button> : <button className="mobile-hide" id="mobile-button" style={{height: "20px",position:"absolute",right:"25px"}} onClick={() => this.toogleMobileNav()}>O</button> }*/}
                {this.state.isShowMobileNav ?
                    <button className="mobile-show" id="mobile-button" style={{height: "20px"}} onClick={() => this.toogleMobileNav()}>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                    </button>
                    :
                    <button className="mobile-show" id="mobile-button" style={{height: "20px",position:"absolute",right:"25px"}} onClick={() => this.toogleMobileNav()}>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                        <IconBar></IconBar>
                    </button>
                }


                {this.state.isShowMobileNav ? <RightSideNav className="mobile-show" onClick={() => this.props.pencariClick()}/> : <RightSideNav className="mobile-hide" onClick={() => this.props.pencariClick()}/>}
            </nav>

        )
    }

    onClickCari(event) {
        this.setState({ isSetCari: !this.state.isSetCari });
        if (this.state.isSetCari) {
            document.getElementById("cari-wrapper").classList.add("pop-block");
            document.getElementById("cari-wrapper").classList.remove("pop-hide");
        } else {
            document.getElementById("cari-wrapper").classList.remove("pop-block");
            document.getElementById("cari-wrapper").classList.add("pop-hide");
        }
        if(this.state.isSetMasuk){
            document.getElementById("login-wrapper").classList.remove("pop-block");
            document.getElementById("login-wrapper").classList.add("pop-hide");
            this.setState({ isSetMasuk: false });
        }
    }

    onClickMasuk(event) {
        this.setState({ isSetMasuk: !this.state.isSetMasuk });

        if (this.state.isSetMasuk) {
            document.getElementById("login-wrapper").classList.add("pop-block");
            document.getElementById("login-wrapper").classList.remove("pop-hide");
        } else {
            document.getElementById("login-wrapper").classList.remove("pop-block");
            document.getElementById("login-wrapper").classList.add("pop-hide");
        }
        if(this.state.isSetCari) {
            document.getElementById("cari-wrapper").classList.remove("pop-block");
            document.getElementById("cari-wrapper").classList.add("pop-hide");
            this.setState({isSetCari: false});
        }
    }

    onScroll() {
        if (window.scrollY > 0) {
            // let nav = document.getElementsByTagName("nav")[0];
            // nav.classList.add('nav-after');
            // nav.classList.remove('nav-before');
            // let navCover = document.getElementById('nav-cover');
            // console.log(navCover);
            // navCover.classList.add('nav-after');
            // navCover.classList.remove('nav-before');
            this.setState(
                {isScrollOver:true}
            )
        } else {
            // let nav = document.getElementsByTagName("nav")[0];
            // nav.classList.add('nav-before')
            // nav.classList.remove('nav-after');
            // let navCover = document.getElementById('nav-cover')
            // navCover.classList.add('nav-after');
            // navCover.classList.remove('nav-before');
            this.setState(
                {isScrollOver:false}
            )
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this));
        document.getElementById("button-masuk").addEventListener('click', this.onClickMasuk.bind(this));
        document.getElementById("button-cari").addEventListener('click', this.onClickCari.bind(this));
    }

}

export default NavBar;