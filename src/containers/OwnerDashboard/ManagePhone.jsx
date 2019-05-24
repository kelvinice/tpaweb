import React, {Component} from 'react';
import styled from "styled-components";
import {BeautyInputOutlined, BeautyTomatoButton} from "../../components/BeautyComponent";
import {connect} from "react-redux";
import GoodInput from "../../components/GoodInput";



const AllWrapper = styled('div')`
  background-color: #ffbabc;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 5px;
  @media (min-width: 900px){
    box-sizing: border-box;
  }
`

const ImagePhone = styled('div')`
  background-image: url("/assets/images/ic_phone_o.svg");
  width: 2.25em;
  height: 1.75em;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Menu = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f28556;
  width: 95%;
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
  width: 95%;
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

class ManagePhone extends Component {
    submitUpdatePhone(event){
        event.preventDefault();
        let form = event.target;
        let phone = form.elements["phone"].value;
        const axios = require('axios');

        let token = localStorage.getItem('token');

        let data = {"token":token,"phone":phone}

        axios.patch('http://localhost:8000/updatephone',data).then(
            (response) => {
                if(response.data.message === "success"){
                    // this.userVerificator.refresh();
                    console.log(response.data.message)
                }else{
                    console.log("ini error:")
                }
            }
        ).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            // if(error.response != null)
            //     this.MessageChanger(null,error.response.data.message);

        });

    }

    render() {
        return (
            <AllWrapper>
                <Menu>
                    <LeftMenu>
                        <ImagePhone/>
                        <DescDiv>
                            <div>Phone</div>
                            <StatusSpan>Belum Verifikasi</StatusSpan>
                        </DescDiv>
                        <GoodInput type={"text"}></GoodInput>
                    </LeftMenu>
                    <ButtonVerifikasi>Verify</ButtonVerifikasi>
                </Menu>
                <form action="" onSubmit={event => this.submitUpdatePhone(event)}>
                <BottomMenu>
                    Update Phone Number
                    {this.props.UserLogin &&
                        <GoodInput value={this.props.UserLogin.phone ? this.props.UserLogin.phone : ""} type="number" name="phone"></GoodInput>
                    }
                    <BeautyTomatoButton>Update</BeautyTomatoButton>
                </BottomMenu>
                </form>


            </AllWrapper>

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