import React,{Component} from 'react'
import {Link,withRouter} from "react-router-dom";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {BACKENDLINK} from "../../Define";

const SmallProfile = styled('div')`
  background-image: url("/assets/images/ic_akun_user.png");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
`

class RightSideNav extends Component {
    state = {
        isSetMasuk: false,
        isSetCari : false,
        isHome : false,
        user : null
    }

    componentDidMount() {
        document.getElementById("button-masuk").addEventListener('click', this.onClickMasuk.bind(this));
        document.getElementById("button-cari").addEventListener('click', this.onClickCari.bind(this));

        if(this.props.location.pathname==="/")this.setState({isHome:true});
    }

    componentWillUnmount() {
        document.getElementById("button-masuk").removeEventListener('click', this.onClickMasuk.bind(this));
        document.getElementById("button-cari").removeEventListener('click', this.onClickCari.bind(this));
    }

    doLogout(){
        const token = localStorage.getItem('token');
        const axios = require('axios');

        axios.post(`${BACKENDLINK}logout`,{

        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{

        }).catch(error => {
            console.log(error.response)
        });
        localStorage.removeItem('token');
        this.props.updateUserlogin(null);
    }

    navHandler(){
        if(this.props.UserLogin==null){
            return <span>
                <div className="wrapper">
                    <div id="button-masuk">
                        <div id="masuk-title">
                            Masuk &#9662;
                        </div>
                        <div id="login-wrapper" className="child-wrapper">
                            <div className="mobile-nav-item" onClick={()=>this.props.pencariClick()}><span
                                className="mobile-only-show">Masuk</span> Sebagai Pencari</div>
                            <Link to={{
                                pathname:"/login"
                            }}><div id="pemilik-masuk-btn" className="mobile-nav-item"
                                    style={{color: "black"}}><span
                                className="mobile-only-show">Masuk</span> Sebagai Pemilik</div></Link>
                        </div>
                    </div>
                </div>
            </span>
        }else{
            return <span>
                <div className="wrapper">
                    <div id="button-masuk">
                        <div id="masuk-title" style={{width:"100%",boxSizing:"border-box"}}>
                            <SmallProfile/>  <span style={{textOverflow:"ellipsis",overflow:"hidden",maxWidth:"80px"}}>{this.props.UserLogin.name}</span> &#9662;
                        </div>
                        <div id="login-wrapper" className="child-wrapper">
                            {this.props.UserLogin.type===1 && <Link style={{color:"black"}} to="/user"><div className="mobile-nav-item">Halaman Profil</div></Link>}
                            {this.props.UserLogin.type===2 && <Link style={{color:"black"}} to="/user/edit-profil"><div className="mobile-nav-item">Edit Profil</div></Link>}
                            {this.props.UserLogin.type===1 && <Link style={{color:"black"}} to="/following"><div className="mobile-nav-item">Following</div></Link>}
                            {<Link style={{color:"black"}} to="/post"><div className="mobile-nav-item">Post</div></Link>}
                            {this.props.UserLogin.type===3 && <Link style={{color:"black"}} to="/admin"><div className="mobile-nav-item">Admin Dashboard</div></Link>}
                            {this.props.UserLogin.type===2 && <Link style={{color:"black"}} to="/owner"><div className="mobile-nav-item">Owner Dashboard</div></Link>}
                            <div id="pemilik-masuk-btn" className="mobile-nav-item"
                                 style={{color: "black"}} onClick={()=>{this.doLogout()}}>Keluar</div>
                        </div>
                    </div>
                </div>
            </span>
        }
    }

    render() {
        return <div id="right-side" className={this.props.isShowMobileNav ? "mobile-show" : "mobile-hide"}>
            {this.state.isHome &&
                <a href="#app-download">
                    <div className="wrapper hide-on-mobile">
                        <div>Download App</div>
                    </div>
                </a>
            }
            <span>
                <div className="wrapper">
                    <div id="button-cari">
                        <div id="masuk-title">
                            Cari Iklan &#9662;
                        </div>
                        <div id="cari-wrapper" className="child-wrapper">
                            <Link to={"/cari"} style={{color:"black"}}><div className="mobile-nav-item">Cari Kost</div></Link>
                            <div id="pemilik-masuk-btn" className="mobile-nav-item">Cari Apartement</div>
                        </div>
                    </div>
                </div>
            </span>
            <Link to="/premium">
                <div className="wrapper">
                    <div className=" mobile-nav-item">Premium Barbarkos</div>
                </div>
            </Link>
            {(this.props.UserLogin && this.props.UserLogin.type === 1) &&
            <Link to="/history">
                <div className="wrapper">
                    <div className=" mobile-nav-item">History</div>
                </div>
            </Link>
                }
            {this.navHandler()}
        </div>;
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

}
RightSideNav.propTypes = {onClick: PropTypes.func};


const MapStateToProps = state => {
    return {
        isShowMobileNav : state.isShowMobileNav,
        UserLogin : state.UserLogin
    }
}
const MapDispatchToProps = dispatch => {
    return {
        toggleMobile : ()=>dispatch({type : "toggle-mobile"}),
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(RightSideNav));

