import React, { Component } from 'react'
import '../../styles/HomePageStyle.css'
// import logo from '../../assets/images/logo_barbarkos_white.png'
import { Link } from 'react-router-dom'
import * as PropTypes from "prop-types";


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

class NavBar extends Component {

    state = {
        isSetMasuk: false,
        isSetCari: false,
        isShowMobileNav:false
    };

    toogleMobileNav(){
        this.setState({ isShowMobileNav: !this.state.isShowMobileNav });
    }

    render() {
        return (
            <nav className="nav-before">
                <div>
                    <img src="assets/images/logo_barbarkos_white.png" alt="" width="200vw" height="100%"/>
                </div>
                <button id="mobile-button" style={{height: "20px"}} onClick={() => this.toogleMobileNav()}>O</button>
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
        if(this.state.isSetCari){
            document.getElementById("cari-wrapper").classList.remove("pop-block");
            document.getElementById("cari-wrapper").classList.add("pop-hide");
            this.setState({ isSetCari: false });
        }
        
    }

    onScroll() {
        if (window.scrollY > 0) {
            let nav = document.getElementsByTagName("nav")[0];
            nav.classList.add('nav-after');
            nav.classList.remove('nav-before');
        } else {
            let nav = document.getElementsByTagName("nav")[0];
            nav.classList.add('nav-before')
            nav.classList.remove('nav-after');
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        document.getElementById("button-masuk").addEventListener('click', this.onClickMasuk.bind(this));
        document.getElementById("button-cari").addEventListener('click', this.onClickCari.bind(this));
    }

}

export default NavBar;