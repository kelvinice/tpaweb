import React, { Component } from 'react'
import styled,{ keyframes } from 'styled-components'
import {BeautyGreenTitle, BeautyInput, BeautyInputWrapper, BeautyTomatoButton,NavLinkWrapper} from "../../components/BeautyComponent";
import {NavLink} from 'react-router-dom'


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

const RedWrap = styled('div')`
    padding:3px;
    color:white;
    font-weight: bolder;
    background-color: #ff4236;
    border-radius: 5px;
    margin: 5px 0;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
`

class LoginPopup extends Component{
    state = {
        popState : null,
        loginError : null,
        redirect : false
    };

    doLogin(e){
        e.preventDefault();
        this.setState({popState:"loading"})
        let form = e.target;
        let email = form.elements["email"].value;
        let password = form.elements["password"].value;
        const axios = require('axios');

        axios.post("http://localhost:8000/loginguestbyemail",{
            email : email,
            password : password,
        }).then((response) => {
            console.log("ini sukses:")
            console.log(response.data);
            localStorage.setItem('token', response.data.token);

            this.setState({popState:"success"})

        }).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            this.setState({popState:null,loginError:error.response})
        });

    }

    continueLogin(){
        let token = localStorage.getItem('token');

        console.log(token)
        window.location.reload();
    }

    popHandler(){
        if(this.state.popState==="loading"){
            return <Poper><LoadingImage></LoadingImage></Poper>;
        }else if(this.state.popState==="success"){
            return <Poper>
                <SuccessImage></SuccessImage>
                <br/>
                <BeautyTomatoButton onClick={this.continueLogin}>Next</BeautyTomatoButton>
            </Poper>;
        }else{
            return <Poper>
                <ButtonEsc onClick={()=>this.props.exitCalled()}>×</ButtonEsc>
                <form action="" onSubmit={(e)=>this.doLogin(e)}>
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

                    <BeautyTomatoButton type="submit" >LOGIN</BeautyTomatoButton>
                    {
                        this.state.loginError ?
                            <RedWrap>Unauthorized</RedWrap>
                            :
                            null
                    }

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