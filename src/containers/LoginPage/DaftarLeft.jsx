import React, {Component} from 'react';
import {BeautyTomatoButton, OrangeNavLinkWrapper,BeautyInput,BeautyInputWrapper} from "../../components/BeautyComponent";

class DaftarLeft extends Component {
    loginClick(e){
        e.preventDefault();
        this.props.changePage(null);
    }

    daftarSubmit(e){
        e.preventDefault();

        let form = document.getElementById("form-daftar");
        let name = form.elements["name"].value;
        let username = form.elements["username"].value;
        let email = form.elements["email"].value;
        let password = form.elements["password"].value;

        const axios = require('axios');



        axios.post('http://127.0.0.1:8000/registerguest',{
            name:name,
            username:username,
            email:email,
            password:password

        }).then(
            () => {

                console.log(this.props);
                this.props.changeMessage(null,"success");

            }
        );



        return false;
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <div><b>Pasang iklan </b></div>
                <div>Saya ingin memasang iklan</div>
                <br/>
                <form  id="form-daftar" onSubmit={(e)=>this.daftarSubmit(e)}>
                <BeautyInputWrapper>
                    Nama
                    <BeautyInput type="text" name="name" required></BeautyInput>
                </BeautyInputWrapper>
                <br/>
                <BeautyInputWrapper>
                    Username
                    <BeautyInput type="text" name="username" required></BeautyInput>
                </BeautyInputWrapper>
                <br/>
                <BeautyInputWrapper>
                    Email
                    <BeautyInput type="email" name="email" required></BeautyInput>
                </BeautyInputWrapper>
                <br/>
                <BeautyInputWrapper>
                    Password
                    <BeautyInput type="password" name="password" required></BeautyInput>
                </BeautyInputWrapper>
                <br/><br/>

                <BeautyTomatoButton type="submit" style={{padding:"25px"}} >pasang iklan</BeautyTomatoButton>
                </form>
                <br/><br/>
                <div style={{textAlign:"center"}}>
                    <b>
                        Sudah punya akun?
                        <OrangeNavLinkWrapper>
                            <a href="" onClick={(e) => this.loginClick(e)}>
                                Login disini
                            </a>
                        </OrangeNavLinkWrapper>
                    </b>

                </div>




            </div>


        );
    }
}

export default DaftarLeft;