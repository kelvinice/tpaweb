import React, {Component} from 'react';
import {
    BeautyInput,
    BeautyInputWrapper,
    BeautyTomatoButton,
    OrangeNavLinkWrapper,
} from "../../components/General/BeautyComponent";

class LoginPemilik extends Component {
    daftarClick(e){
        e.preventDefault();
        this.props.changePage("daftar");
    }

    lupaClick(e){
        e.preventDefault();
        this.props.changePage("lupa");
    }

    doLogin(e){
        e.preventDefault();
        // this.setState({popState:"loading"})
        let form = e.target;
        let phone = form.elements["phone"].value;
        let password = form.elements["password"].value;
        let remember = form.elements["remember"].checked;
        const axios = require('axios');

        axios.post("http://localhost:8000/loginownerbyphone",{
            phone : phone,
            password : password,
            remember : remember,
        }).then((response) => {
            console.log("ini sukses:")
            console.log(response.data);
            localStorage.setItem('token', response.data.token);

            this.props.changeMessage(null,"success-login");

        }).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            if(error.response != null)
                this.props.changeMessage(null,error.response.data.message);
        });
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <div><b>Login </b></div>
                <div>Pemilik Kos</div>
                <br/>
                <form action="" onSubmit={(e)=>this.doLogin(e)}>
                <BeautyInputWrapper>
                    <b>No. Handphone</b>
                    <br/>
                    <BeautyInput type={"text"} name="phone" autoFocus={true}></BeautyInput>
                </BeautyInputWrapper>
                <br/><br/>
                <BeautyInputWrapper>
                    <b>Password</b>
                    <br/>
                    <BeautyInput type={"password"} name="password"></BeautyInput>
                </BeautyInputWrapper>
                <br/>

                <div style={{float:"right"}}>
                    <label htmlFor="remember">Remember Me</label>
                    <input id="remember" type="checkbox" name={"remember"} value={"Remember Me"} />
                </div>
                <br/><br/>

                <BeautyTomatoButton style={{padding:"25px"}} type={"submit"}>LOGIN</BeautyTomatoButton>
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
                </form>

            </div>
        );
    }
}

export default LoginPemilik;