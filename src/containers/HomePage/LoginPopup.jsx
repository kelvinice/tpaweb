import React, { Component } from 'react'
import styled,{ keyframes } from 'styled-components'
import {BeautyGreenTitle, BeautyInput, BeautyInputWrapper, BeautyTomatoButton,NavLinkWrapper} from "../../components/BeautyComponent";
import {NavLink,Redirect} from 'react-router-dom'


const WrapperPops = styled('div')`
    position:fixed;
    text-align: center;
    z-index:2;
    width: 100%;
    background-color: rgba(0,0,0,0.6) !important;
    top: 0;
    height: 100%;
    padding-top: 3%;
`

const Poper = styled('div')`
    background-color:white;
    width:300px;
    margin:auto auto;
    border-radius: 5px;
    line-height: 1.8;
    padding: 20px;
    box-sizing:border-box;
`
const ButtonEsc = styled('div')`
  cursor: pointer;
  display: inline-block;
  float: right;
  color: gray;
  font-weight: bolder;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingImage = styled('div')`
  background-image: url("assets/images/loading.png");
  width: 200px;
  height: 200px;
  margin: 0 auto; 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  animation: ${rotate} 2s linear infinite;
  background-color: transparent;
`

const SuccessImage = styled('div')`
  background-image: url("assets/images/true.png");
  width: 200px;
  height: 200px;
  margin: 0 auto; 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: transparent;
`

class LoginPopup extends Component{
    state = {
        popState : null,
        loginError : null,
        redirect : false
    };

    doLogin(e,thise){
        e.preventDefault();
        this.setState({popState:"loading"})
        let form = e.target;
        let email = form.elements["email"].value;
        let password = form.elements["password"].value;
        const axios = require('axios');

        axios.post("http://localhost:8000/loginguestbyemail",{
            email : email,
            password : password,
            type : 1
        }).then((response) => {
            console.log("ini sukses:")
            console.log(response.data);
            this.setState({popState:"success"})

        }).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            this.setState({popState:null,error:error.response})
        });

    }

    popHandler(){
        if(this.state.popState==="loading"){
            return <Poper><LoadingImage></LoadingImage></Poper>;
        }else if(this.state.popState==="success"){
            return <Poper>
                <SuccessImage></SuccessImage>
                <br/>
                <BeautyTomatoButton onClick={()=> this.setState({redirect:true})}>Next</BeautyTomatoButton>
            </Poper>;
        }else{
            return <Poper>
                <ButtonEsc onClick={()=>this.props.exitCalled()}>×</ButtonEsc>
                <form action="" onSubmit={(e,thise)=>this.doLogin(e,thise)}>
                    <BeautyGreenTitle>
                        Login Akun
                    </BeautyGreenTitle>
                    <br/>
                    <BeautyInputWrapper>
                        Email:<br/>
                        <BeautyInput type="email" name="email"></BeautyInput>
                    </BeautyInputWrapper>
                    <br/>
                    <BeautyInputWrapper>
                        Password:<br/>
                        <BeautyInput type="password" name="password"></BeautyInput>
                    </BeautyInputWrapper>
                    <br/>
                    <NavLinkWrapper style={{textAlign:'right'}}>
                        <NavLink tabIndex="-1" to=".">Lupa Password</NavLink>
                    </NavLinkWrapper>

                    <BeautyTomatoButton type="submit">LOGIN</BeautyTomatoButton>
                </form>
            </Poper>
        }

    }

    render(){
        return(
            <WrapperPops className="pop-block">
                {this.popHandler()}
               
            </WrapperPops>
        )
    }
}

export default LoginPopup;