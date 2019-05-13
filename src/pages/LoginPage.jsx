import React,{Component} from 'react'
import styled from "styled-components";
import LoginPemilik from "../containers/LoginPage/LoginPemilik";
import {Link,Redirect} from 'react-router-dom'
import {GreenNavLinkWrapper} from "../components/BeautyComponent";
import DaftarLeft from "../containers/LoginPage/DaftarLeft";
import {SuccessAlert,ErrorAlert} from "../components/Alerts";

const LoginPageContainer = styled('div')`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  min-height: 100vh;
`

const RightContainer = styled('div')`
  padding: 100px;
  box-sizing: border-box;
  background-color: #00ab40;
  width: 100%;
  
  text-align: center;
  @media only screen and (max-width: 991px){
    display: none;
  }
  position: relative;
`

const Illustration = styled('div')`
  background-image: url("assets/images/Illustration-slide-2.svg");
  margin: 0 auto;
  width: 100%;
  height: 70%;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-top: 49px;
  margin-left: 10px;
  position: relative;
  box-sizing: border-box;
`

const RightText = styled('h3')`
    color:white;
    position:relative;
    margin: 0;
    position: relative;
    line-height: 29px;
    bottom: 84px;
`

const LeftWrapper = styled('div')`
  padding: 20px 80px;
  background-color: white;
  box-sizing: border-box;
  width: 100%;
  @media 
  only screen and (max-width: 500px){
    padding: 20px 25px;
  }
`

const Logo = styled('div')`
  height: 60px;
  width: 60px;
  background-image: url("assets/images/logo.png");
  background-size: cover;
  background-position: center;
  background-color: #dcfdff;
  border-radius: 50%;
`

class LoginPage extends Component{
    state = {
        leftState : null,
        popMessage : null,
        testState : this.props.location
    }

    PageHandler(state){
        if(state === "lupa"){
            return <div>lupa password</div>
        }else if(state === "daftar"){
            return <DaftarLeft changePage={(state)=>this.PageChanger(state)} changeMessage={(event,message)=>this
                .MessageChanger(event,message)} />
        }else{
            return <LoginPemilik changePage={(state)=>this.PageChanger(state)} changeMessage={(event,message)=>this
                .MessageChanger(event,message)}/>
        }
    }

    PageChanger(state){
        this.setState({leftState:state});
    }

    MessageChanger(event,message){
        if(event != null)
            event.preventDefault();
        if(event == null || event.target===event.currentTarget)
            this.setState({popMessage: message});
    }

    MessageHandler(){
        if(this.state.popMessage===null){
            return null;
        }else if(this.state.popMessage==="success-login"){
            return <SuccessAlert message="Success Login" linkTo="/" onClick={(event, message) => this.MessageChanger(event, null)}/>
        }else if(this.state.popMessage==="success-register"){
            return <SuccessAlert message="Success Register" linkTo="/" onClick={(event, message) => this.MessageChanger(event, null)}/>
        }else{
            return <ErrorAlert message={this.state.popMessage} onClick={(event, message) => this.MessageChanger(event, null)}/>
        }
    }

    AuthHandler(){
        if(localStorage.getItem("token") != null){
            return <Redirect to={"/"}></Redirect>
        }else{
            return null;
        }
    }

    render() {
        return(
            <LoginPageContainer>
                {this.AuthHandler()}
                {this.MessageHandler()}
                <LeftWrapper>
                    <GreenNavLinkWrapper><Link to="/"><b>&#8592;Kembali ke Beranda</b></Link></GreenNavLinkWrapper>
                    <br/><br/><br/>
                    <Logo/>
                    <br/>
                    {this.PageHandler(this.state.leftState)}

                </LeftWrapper>
                <RightContainer>
                    <Illustration/>
                    <RightText >
                        Mau iklan mu tampil di atas? <br/>
                        Jadilah <b>Premium Member</b> Barbarkos!
                    </RightText>
                </RightContainer>
            </LoginPageContainer>
        )
    }

}

export default LoginPage;