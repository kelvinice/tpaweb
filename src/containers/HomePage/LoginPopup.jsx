import React, { Component } from 'react'
import styled,{ keyframes } from 'styled-components'
import {BeautyGreenTitle, BeautyInput, BeautyInputWrapper, BeautyTomatoButton,NavLinkWrapper} from "../../components/BeautyComponent";
import {NavLink} from 'react-router-dom'
import {InnerBeautyLoading} from "../../components/BeautyLoading";
import GoodInput from "../../components/GoodInput";

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
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`
const ButtonEsc = styled('div')`
  text-align: right;
  width: 100%;
  color: gray;
  font-weight: bolder;
  
  ${'div'}{
   cursor: pointer;
  float: right;
  margin: 0;
  
  }
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
  background-image: url("/assets/images/loading.png");
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
    constructor(props) {
        super(props);
    }

    state = {
        popState : null,
        loginError : null,
        redirect : false,

    };

    doLogin(e){
        e.preventDefault();
        this.setState({popState:"loading"})
        let form = e.target;
        let email = form.elements["email"].value;
        let password = form.elements["password"].value;
        let remember = form.elements["remember"].checked;

        const axios = require('axios');

        axios.post("http://localhost:8000/loginguestbyemail",{
            email : email,
            password : password,
            remember : remember,
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
            return <Poper><LoadingImage/></Poper>;
            // return <Poper><InnerBeautyLoading/></Poper>
        }else if(this.state.popState==="success"){
            return <Poper>
                <SuccessImage/>
                <br/>
                <BeautyTomatoButton onClick={this.continueLogin}>Next</BeautyTomatoButton>
            </Poper>;
        }else{
            return <Poper>
                <ButtonEsc><div onClick={()=>this.props.exitCalled()}>×</div></ButtonEsc>

                <form action="" onSubmit={(e)=>this.doLogin(e)}>
                    <BeautyGreenTitle>
                        Login Akun
                    </BeautyGreenTitle>
                    <br/>
                    <BeautyInputWrapper>
                        Email:<br/>
                        <BeautyInput ref={this.focusInput} type={"email"} name="email"></BeautyInput>

                    </BeautyInputWrapper>
                    <br/>
                    <BeautyInputWrapper>
                        Password:<br/>
                        <BeautyInput type="password" name="password"   />
                    </BeautyInputWrapper>
                    <br/>

                    <NavLinkWrapper style={{textAlign:'right',cursor:"pointer"}}>
                        <label htmlFor="remember">Remember Me</label>
                        <input id="remember" type="checkbox" name={"remember"} value={"Remember Me"} />

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
            <WrapperPops className="pop-block" autoFocus={true}>
                {this.popHandler()}
            </WrapperPops>
        )
    }
}

export default LoginPopup;
export {LoadingImage}