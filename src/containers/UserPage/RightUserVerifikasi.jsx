import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";


const ImageEmail = styled('div')`
  background-image: url("/assets/images/ic_email_o.svg");
  width: 2.25em;
  height: 1.75em;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const ImagePhone = styled('div')`
  background-image: url("/assets/images/ic_phone_o.svg");
  width: 2.25em;
  height: 1.75em;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const AllWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

const Menu = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const ButtonVerifikasi = styled('button')`
  background-color: #46ab25;
  color: white;
  padding: 6px 10px;
  border-radius: 3px;
  box-sizing: border-box;
  border: none;
  outline: none;
  cursor: pointer;
  height: 2.125em;
  border: 1px solid #007700;
  
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


class RightUserVerifikasi extends Component {

    componentDidMount() {
        // console.log(this.props)
        this.props.setTitle("Email and Phone");
    }

    verifyClick(){
        this.props.MessageChanger(null,"loading")
        let token = localStorage.getItem('token');
        const axios = require('axios');

        axios.post(`http://localhost:8000/sendmail?token=${token}`,{
            headers:{
                'token':token
            },
            'token':token


        }).then((response) => {
            console.log(response.data)
            this.props.MessageChanger(null,response.data.message)

        }).catch((error)=>{
            console.log(error.response)
            this.props.MessageChanger(null,error.response)
        })
    }

    render() {
        return (
            <AllWrapper>
                <Menu>
                    <LeftMenu>
                        <ImageEmail/>
                        <DescDiv>
                            <div>Email</div>
                            {this.props.UserLogin != null && this.props.UserLogin.email_verified_at!=null ? <DoneStatusSpan>Verified at {this.props.UserLogin.email_verified_at}</DoneStatusSpan> :
                                <StatusSpan>Belum Verifikasi</StatusSpan>
                            }

                        </DescDiv>
                    </LeftMenu>
                    {(this.props.UserLogin == null || this.props.UserLogin.email_verified_at == null) &&
                        <ButtonVerifikasi onClick={() => this.verifyClick()}>Verifikasi</ButtonVerifikasi>
                    }
                </Menu>
                <Menu>
                    <LeftMenu>
                        <ImagePhone/>
                        <DescDiv>
                            <div>Phone</div>
                            <StatusSpan>Belum Verifikasi</StatusSpan>
                        </DescDiv>

                    </LeftMenu>
                    <ButtonVerifikasi>Verifikasi</ButtonVerifikasi>
                </Menu>

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

export default connect(MapStateToProps,MapDispatchToProps)(RightUserVerifikasi);