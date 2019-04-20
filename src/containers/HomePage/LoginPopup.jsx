import React, { Component } from 'react'
import styled from 'styled-components'
import {BeautyGreenTitle, BeautyInput, BeautyInputWrapper, BeautyTomatoButton,NavLinkWrapper} from "../BeautyComponent";
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



class LoginPopup extends Component{
    render(){
        return(
            <WrapperPops className="pop-block">
                <Poper>
                    <ButtonEsc onClick={()=>this.props.exitCalled()}>×</ButtonEsc>
                    <BeautyGreenTitle>
                        Login Akun
                    </BeautyGreenTitle>
                    <br/>
                    <BeautyInputWrapper>
                        Email:<br/>
                        <BeautyInput type="email"></BeautyInput>
                    </BeautyInputWrapper>
                    <br/>
                    <BeautyInputWrapper>
                        Password:<br/>
                        <BeautyInput type="password"></BeautyInput>
                    </BeautyInputWrapper>
                    <br/>
                    <NavLinkWrapper style={{textAlign:'right'}}>
                        <NavLink tabIndex="-1">Lupa Password</NavLink>
                    </NavLinkWrapper>

                    <BeautyTomatoButton type="submit">LOGIN</BeautyTomatoButton>
                </Poper>
               
            </WrapperPops>
        )
    }

}

export default LoginPopup;