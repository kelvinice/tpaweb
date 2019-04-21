import React,{Component} from 'react'
import styled from "styled-components";
import LoginPemilik from "../containers/LoginPage/LoginPemilik";
import {Link} from 'react-router-dom'
import {BeautyTomatoButton, GreenNavLinkWrapper} from "../components/BeautyComponent";
import DaftarLeft from "../containers/LoginPage/DaftarLeft";

const LoginPageContainer = styled('div')`
  display: flex;
  height: 100%;
  width: 100%;
`

const RightContainer = styled('div')`
  padding: 100px;
  box-sizing: border-box;
  background-color: #00ab40;
  width: 100%;
  height: 100vh;
  text-align: center;
  @media only screen and (max-width: 991px){
    display: none;
  }
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

const PopHolder = styled('div')`
width: 100%;
height: 100%;
position: fixed;
background-color: rgba(178,178,178,0.68);
z-index: 1;
padding: 10px;
display: flex;
align-items: center;
`

const PopMessager = styled('div')`
  width: 500px;
  border-radius: 5px;
  background-color: white;
  overflow-y: auto;
  padding: 20px;
  display: block;
  margin: 0 auto;
  text-align: center;
`

const ErrorImage = styled('div')`
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url("assets/images/error.png");
  margin:0 auto;
  background-color: rgba(255,192,203,0.44);
  border-radius: 50%;
`

const CorrectImage = styled('div')`
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url("assets/images/correct.gif");
  margin:0 auto;
  background-color: rgba(255,192,203,0.44);
  border-radius: 50%;
`

const BigGreyText = styled('div')`
  color: #767676;
  font-size: 20px;
`


class LoginPage extends Component{
    state = {
        leftState : "daftar",
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
            return <LoginPemilik changePage={(state)=>this.PageChanger(state)}/>
        }
    }

    PageChanger(state){
        this.setState({leftState:state});
    }

    MessageChanger(event,message){
        if(event != null)
            event.preventDefault();
        if(event == null || event.target==event.currentTarget)
            this.setState({popMessage: message});
    }

    MessageHandler(){
        if(this.state.popMessage==="login"){
            return <PopHolder>
                <PopMessager>
                    <div style={{float:"right",cursor:"pointer"}} onClick={(event,message)=>this.MessageChanger(event,null)}>X</div>
                    Login Gagal
                    <BeautyTomatoButton>Kembali</BeautyTomatoButton>
                </PopMessager>
            </PopHolder>

        }else if(this.state.popMessage==="register"){
            return <PopHolder onClick={(event,message)=>this.MessageChanger(event,null)}>
                <PopMessager>

                    <div style={{float:"right",cursor:"pointer"}} onClick={(event,message)=>this.MessageChanger(event,null)}>X</div>
                    <ErrorImage/>
                    <div style={{fontSize:"30px"}}><b>Register Gagal</b></div>
                    <BigGreyText>Password telah digunakan oleh user : admin@admin.com</BigGreyText>
                    <BigGreyText>Silahkan gunakan Password lain</BigGreyText>
                    <br/>
                    <BeautyTomatoButton onClick={(event,message)=>this.MessageChanger(event,null)}>Register Kembali</BeautyTomatoButton>
                </PopMessager>
            </PopHolder>
        }else if(this.state.popMessage==="success"){
            return <PopHolder onClick={(event,message)=>this.MessageChanger(event,null)}>
                <PopMessager>

                    <div style={{float:"right",cursor:"pointer"}} onClick={(event,message)=>this.MessageChanger(event,null)}>X</div>
                    <CorrectImage/>
                    <div style={{fontSize:"30px"}}><b>Register Sukses</b></div>
                    <BigGreyText>Sukses Register</BigGreyText>

                    <br/>
                    <BeautyTomatoButton onClick={(event,message)=>this.MessageChanger(event,null)}>Next</BeautyTomatoButton>
                </PopMessager>
            </PopHolder>
        }
    }


    render() {
        return(
            <LoginPageContainer>
                {/*{console.log(this.state.testState)}*/}
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