import React, {Component} from 'react';
import {BeautySelectInput, BeautyTomatoButton, OrangeNavLinkWrapper,BeautyInput,BeautyInputWrapper} from "../../components/BeautyComponent";

class DaftarLeft extends Component {
    state = {
        isOwner : false
    }
    loginClick(e){
        e.preventDefault();
        this.props.changePage(null);
    }

    daftarSubmit(e){
        e.preventDefault();

        let form = document.getElementById("form-daftar");
        let name = form.elements["name"].value;
        // let username = form.elements["username"].value;
        let email = form.elements["email"].value;
        let password = form.elements["password"].value;
        let password_confirmation = form.elements["password_confirmation"].value;
        let role = form.elements["role"].value;

        const axios = require('axios');

        if(this.state.isOwner){
            let phone = form.elements["phone"].value;
            axios.post('http://localhost:8000/registerowner',{
                name:name,
                password_confirmation:password_confirmation,
                email:email,
                password:password,
                role:role,
                phone:phone

            }).then(
                (response) => {
                    console.log("ini sukses:")
                    console.log(response.data.name);

                    this.props.changeMessage(null,"success-register");

                }
            ).catch((error) => {
                console.log("ini error:")
                console.log(error.response)
                if(error.response != null)
                    this.props.changeMessage(null,error.response.data.message);

            });


            return false;
        }


        axios.post('http://localhost:8000/registerguest',{
            name:name,
            password_confirmation:password_confirmation,
            email:email,
            password:password,
            role:role

        }).then(
            (response) => {
                console.log("ini sukses:")
                console.log(response.data.name);

                this.props.changeMessage(null,"success-register");

            }
        ).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            if(error.response != null)
                this.props.changeMessage(null,error.response.data.message);

        });

        return false;
    }

    roleChanges(e){
        console.log(e.target.value);
        if(e.target.value==="2"){
            this.setState({isOwner:true});
        }else{
            this.setState({isOwner:false});
        }

    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <div><b>Pasang iklan </b></div>
                <div>Saya ingin memasang iklan</div>
                <br/>
                <form id="form-daftar" onSubmit={(e)=>this.daftarSubmit(e)}>
                <BeautyInputWrapper>
                    Role
                    <BeautySelectInput onChange={(e)=>this.roleChanges(e)} name="role" required >
                        <option value="1">GUEST</option>
                        <option value="2">OWNER</option>
                    </BeautySelectInput>
                </BeautyInputWrapper>
                    <br/>
                <BeautyInputWrapper>
                    Full Name
                    <BeautyInput type="text" name="name" required></BeautyInput>
                </BeautyInputWrapper>
                <br/>

                <BeautyInputWrapper>
                    Email
                    <BeautyInput type="email" name="email" required></BeautyInput>
                </BeautyInputWrapper>
                <br/>
                {
                   this.state.isOwner ?
                       <BeautyInputWrapper>
                           Phone
                           <BeautyInput type="phone" name="phone" required></BeautyInput>
                           <br/>
                       </BeautyInputWrapper>
                        : null

                }

                <BeautyInputWrapper>
                    Password
                    <BeautyInput type="password" name="password" required></BeautyInput>
                </BeautyInputWrapper>
                <br/>
                <BeautyInputWrapper>
                    Confirmation Password
                    <BeautyInput type="password" name="password_confirmation" required></BeautyInput>
                </BeautyInputWrapper>
                <br/><br/>

                <BeautyTomatoButton type="submit" style={{padding:"25px"}} >Daftar Sekarang</BeautyTomatoButton>
                </form>
                <br/><br/>
                <div style={{textAlign:"center"}}>
                    <b>
                        Sudah punya akun?
                        <OrangeNavLinkWrapper>
                            <a href="." onClick={(e) => this.loginClick(e)}>
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