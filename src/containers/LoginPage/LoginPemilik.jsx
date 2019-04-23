import React, {Component} from 'react';
import {
    BeautyInput,
    BeautyInputWrapper,
    BeautyTomatoButton,
    OrangeNavLinkWrapper,
    NavLinkWrapper
} from "../../components/BeautyComponent";

class LoginPemilik extends Component {
    daftarClick(e){
        e.preventDefault();
        this.props.changePage("daftar");
    }

    lupaClick(e){
        e.preventDefault();
        this.props.changePage("lupa");
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <div><b>Login </b></div>
                <div>Pemilik Kos</div>
                <br/>
                <BeautyInputWrapper>
                    <b>No. Handphone</b>
                    <br/>
                    <BeautyInput></BeautyInput>
                </BeautyInputWrapper>
                <br/><br/>
                <BeautyInputWrapper>
                    <b>Password</b>
                    <br/>
                    <BeautyInput></BeautyInput>
                </BeautyInputWrapper>
                <br/>

                <div style={{float:"right"}}>
                    <NavLinkWrapper>
                        <a href="." onClick={(e) => this.lupaClick(e)}>
                            Lupa password?
                        </a>
                    </NavLinkWrapper>
                </div>
                <br/><br/>

                <BeautyTomatoButton style={{padding:"25px"}}>LOGIN</BeautyTomatoButton>
                <br/><br/>
                <div style={{textAlign:"center"}}>
                    <b>
                        Belum punya akun?
                        <OrangeNavLinkWrapper>
                            <a href="." onClick={(e) => this.daftarClick(e)}>
                                Yuk Daftar
                            </a>
                        </OrangeNavLinkWrapper>
                    </b>

                </div>


            </div>
        );
    }
}

export default LoginPemilik;