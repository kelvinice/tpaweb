import React, { Component } from 'react'
import '../../styles/HomePageStyle.css'
import logo from '../../assets/images/logo_barbarkos_white.png'
import { Link } from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <nav className="nav-before">
                <div>
                    <img src={logo} alt="" width="300px" height="100%" />
                </div>
                <div id="right-side">
                    <Link><div className="wrapper"><div>Download App</div></div></Link>
                    <Link><div className="wrapper"><div>Cari Iklan &#9662;</div></div></Link>
                    <Link><div className="wrapper"><div>Promosikan Iklan Anda</div></div></Link>
                    <Link><div className="wrapper">
                        <div>
                            <div id="masuk-title">
                                Masuk
                            </div>
                            <div id="login-child-wrapper">
                                <div>Sebagai Pencari</div>
                                <div>Sebagai Pemilik</div>
                            </div>
                        </div>
                    </div></Link>
                </div>
            </nav>
        )
    }

    onClickMasuk(){
        console.log("a");
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
        window.addEventListener('click',this.onClickMasuk);
    }



}

export default NavBar;