import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import { BeautyTomatoButton} from "../../components/General/BeautyComponent";
import {connect} from "react-redux";
import GoodInput from "../../components/General/GoodInput";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";


const Menu = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f28556;
  width: 100%;
  height: 80px;
`

const ButtonVerifikasi = styled('button')`
  background-color: #46ab25;
  color: white;
  box-sizing: border-box;
  border: none;
  outline: none;
  cursor: pointer;
  height: 100%;
  width: 80px;
  &:hover{
    background-color: #408421;
  }
`

const LeftMenu = styled('div')`
  display: flex;
  box-sizing: border-box;
  padding: 10px;

`

const StatusSpan = styled('span')`
  color: #bfbfbf; 
`

const DoneStatusSpan = styled('span')`
  color: #59bf59;
`

const DescDiv = styled('div')`
  margin-left: 10px;
`

const BottomMenu = styled('div')`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
   background-color: #f28556;
  ${"input"}{
  margin: 20px 0;
  }
`

const InputWrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  @media (max-width: 900px){
    padding: 3px;
    flex-direction: column;
  }
  
`

const CustomBlockInput = styled('input')`
  width: 100%;
  height: 100%;
  background-color: #fffbe0;
  justify-content: center;
  outline: none;
`

const SuperBlackFont = styled('div')`
  font-weight: bold;
  color: black;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin-right: 5px;
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
@media (max-width: 900px){
  padding: 0; 
}
`

const PopMessager = styled('div')`
  width: 500px;
  border-radius: 5px;
  background-color: white;

  padding: 20px;
  display: block;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 900px){
    width: 70%;
    //height: 100%;
  }
  @media (max-width: 900px){
    margin: 0 0;
  }
`

const BigGreyText = styled('div')`
  color: #404040;
  font-size: 20px;
  font-weight: bold;
`

const MidButtonWrapper = styled('div')`
width: 100%;
padding: 20px;
box-sizing: border-box;
display: flex;
justify-content: space-around;
font-weight: bold;
${"button"}{
  margin: 0 5px;
}
`

class ManagePhone extends Component {
    state = {
        message : null
    }

    submitUpdatePhone(event){
        event.preventDefault();
        this.setState({message:"loading"});
        let form = event.target;
        let phone = form.elements["phone"].value;
        const axios = require('axios');

        let token = localStorage.getItem('token');

        let data = {"token":token,"phone":phone}

        axios.patch('http://localhost:8000/updatephone',data).then(
            (response) => {
                if(response.data.message === "success"){
                    console.log(response.data.message)
                    this.setState({message:"update-phone"});
                }else{
                    console.log("ini error:")
                    this.setState({message:response.data.message});
                }
            }
        ).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            this.setState({message:error.response.data.message});
            // if(error.response != null)
            //     this.MessageChanger(null,error.response.data.message);

        });
    }

    onClickSend(){
        this.setState({message:"loading"});

        const axios = require('axios');

        let token = localStorage.getItem('token');

        let data = {"token":token}

        axios.post('http://localhost:8000/sendphonecode',data).then(
            (response) => {
                if(response.data.message === "success"){
                    console.log(response.data.message)
                    this.setState({message:"send"});
                }else{
                    console.log("ini error:")
                    this.setState({message:response.data.message});
                }
            }
        ).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            this.setState({message:error.response.data.message});
        });
    }

    onClickVerify(event){
        event.preventDefault();
        this.setState({message:"loading"});
        let form = event.target;
        let code = form.elements["code"].value;
        const axios = require('axios');

        let token = localStorage.getItem('token');

        let data = {"token":token,"code":code}

        axios.patch('http://localhost:8000/verifyphonecode',data).then(
            (response) => {
                if(response.data.message === "success"){
                    console.log(response.data.message)
                    this.setState({message:"verify-phone"});
                }else{
                    console.log("ini error:")
                    this.setState({message:response.data.message});
                }
            }
        ).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            this.setState({message:error.response.data.message});
            // if(error.response != null)
            //     this.MessageChanger(null,error.response.data.message);

        });
    }

    handlePop(){
        if(this.state.message==null)return null;
        else if(this.state.message==="loading") {
            return <PopHolder>
                <PopMessager>
                    <InnerBeautyLoading/>
                </PopMessager>
            </PopHolder>
        }
        else if(this.state.message==="send"){
            return <PopHolder>
                <PopMessager>
                    <BigGreyText>Verification Code has been send to your email {this.props.UserLogin.email}</BigGreyText>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={()=>this.setState({message:null})}>Okay</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PopMessager>
            </PopHolder>
        }
        else if(this.state.message==="update-phone"){
            return <PopHolder>
                <PopMessager>
                    <BigGreyText>Phone Number has been updated</BigGreyText>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={()=>this.setState({message:null},window.location.reload())}>Okay</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PopMessager>
            </PopHolder>
        } else if(this.state.message==="verify-phone"){
            return <PopHolder>
                <PopMessager>
                    <BigGreyText>Phone Number Success Verified</BigGreyText>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={()=>this.setState({message:null},window.location.reload())}>Okay</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PopMessager>
            </PopHolder>
        }else {
            return <PopHolder>
                <PopMessager>
                    <BigGreyText>Error : {this.state.message}</BigGreyText>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={()=>this.setState({message:null})}>Okay</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PopMessager>
            </PopHolder>
        }

    }

    render() {
        return (
            <Fragment>
                {this.handlePop()}
                <Menu>
                    <LeftMenu>
                        <div>
                            <FontAwesomeIcon icon={faPhone} style={{color:"white"}}/>
                        </div>
                        <DescDiv>
                            <div>Phone</div>
                            {this.props.UserLogin != null && this.props.UserLogin.phone_verified_at!=null ? <DoneStatusSpan>Verified at {this.props.UserLogin.phone_verified_at}</DoneStatusSpan> :
                                <StatusSpan>Belum Verifikasi</StatusSpan>
                            }
                        </DescDiv>
                    </LeftMenu>
                    {(this.props.UserLogin == null || this.props.UserLogin.phone_verified_at == null) &&
                    <ButtonVerifikasi onClick={()=>this.onClickSend()}>Resend Verification Code</ButtonVerifikasi>
                    }

                </Menu>
                {(this.props.UserLogin == null || this.props.UserLogin.phone_verified_at == null) &&
                <form action="" onSubmit={(event)=>this.onClickVerify(event)}>
                    <Menu>
                        <InputWrapper>
                            <SuperBlackFont>
                                Verification Code
                            </SuperBlackFont>
                            <CustomBlockInput name={"code"}/>
                        </InputWrapper>

                        <ButtonVerifikasi>Verify</ButtonVerifikasi>
                    </Menu>
                </form>
                }

                <form action="" onSubmit={event => this.submitUpdatePhone(event)}>
                <BottomMenu>
                    Update Phone Number
                    {this.props.UserLogin &&
                        <GoodInput value={this.props.UserLogin.phone ? this.props.UserLogin.phone : ""} type="number" name="phone"></GoodInput>
                    }
                    <BeautyTomatoButton>Update</BeautyTomatoButton>
                </BottomMenu>
                </form>


            </Fragment>

        );
    }
}

const MapStateToProps = state => {
    return {
        UserLogin : state.UserLogin
    }
}
const MapDispatchToProps = dispatch => {
    return {
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(ManagePhone);