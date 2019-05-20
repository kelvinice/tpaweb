import {BeautyTomatoButton} from "./BeautyComponent";
import React,{Component} from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

const PopHolder = styled('div')`
width: 100vw;
height: 100vh;
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
  background-image: url("/assets/images/error.png");
  margin:0 auto;
  background-color: rgba(255,192,203,0.44);
  border-radius: 50%;
`

const CorrectImage = styled('div')`
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url("/assets/images/correct.gif");
  margin:0 auto;
  background-color: rgba(255,192,203,0.44);
  border-radius: 50%;
`

const BigGreyText = styled('div')`
  color: #767676;
  font-size: 20px;
`


class SuccessAlert extends Component {
    state = {
        redirect: false
    }

    redirect(){
        if(!this.props.linkTo){
            this.props.onClick();
            return null;
        }
        this.setState({redirect:true},()=>{
            this.props.onClick();
        });

    }
    rendRedirect(){
        if (this.state.redirect) {
            return <Redirect to={this.props.linkTo} />
        }else{
            return null;
        }
    }

    render() {
        return <PopHolder onClick={this.props.onClick}>
            {this.rendRedirect()}
            <PopMessager>
                <div style={{float: "right", cursor: "pointer"}} onClick={this.props.onClick}>X</div>
                <CorrectImage/>
                <div style={{fontSize: "30px"}}><b>Success</b></div>
                <BigGreyText>{this.props.message}</BigGreyText>

                <br/>
                <BeautyTomatoButton onClick={()=>this.redirect()}>Next</BeautyTomatoButton>
            </PopMessager>
        </PopHolder>;
    }
}

SuccessAlert.propTypes = {onClick: PropTypes.func};


class ErrorAlert extends Component {
    render() {
        return <PopHolder onClick={this.props.onClick}>
            <PopMessager>
                <div style={{float: "right", cursor: "pointer"}} onClick={this.props.onClick}>X</div>
                <ErrorImage/>
                <div style={{fontSize: "30px"}}><b>Failed</b></div>
                <BigGreyText>{this.props.message}</BigGreyText>
                <br/>
                <BeautyTomatoButton onClick={this.props.onClick}>Back</BeautyTomatoButton>
            </PopMessager>
        </PopHolder>;
    }
}

ErrorAlert.propTypes = {onClick: PropTypes.func};

export {SuccessAlert,ErrorAlert}