import React, {Component} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {BACKENDLINK} from "../../Define";

const Button = styled('button')`
    min-width: 105px;
    text-align: center;
    box-sizing: border-box;
    color: ${props => props.text !== "Following" ? "#1B95E0" : "white"};
    background-color: ${props => props.text !== "Following" ? "#fff" : "#00abe1"};
    border: 1px solid #1da1f2;
    font-size: 14px;
    line-height: 20px;
    padding: 6px 16px;
    border-radius: 100px;
    box-shadow: none;
    cursor: pointer;
    font-weight: bold;
    white-space: nowrap;
    ${'div'}{
    display: none;
    }
    &:hover{
    border: ${props => props.text !== "Following" ? "1px solid #1da1f2" : "1px solid red"};
    background-color: ${props => props.text !== "Following" ? "#E8F4FB" : "red"};
        ${'span'}{
        display: ${props => props.text === "Following" && "none"};
        }
        ${'div'}{
        display: ${props => props.text === "Following" && "block"};
        }
    }
    
    &:active{
       border-color: #1B95E0;
      color: #1B95E0;
      box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #1B95E0;
    }
    transition: box-shadow .15s ease-in-out;
    outline:none;
    position: relative;
    
    
`

const AllUnfollow = styled('div')`
  color: white;
`

class ButtonFollow extends Component {
    clickFollow(){
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let id = this.props.target;

        let config = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.post(`${BACKENDLINK}follow-user`,{
            "target":id
        },config).then(response=>{
            this.props.updateFollow(response.data.followers,response.data.is_follow);
            // console.log(response.data)
        }).catch(error => {
            console.log(error.response);
        })


    }



    render() {
        return (
            <Button onClick={()=>this.clickFollow()} text={this.props.text}>
                <span>{this.props.text}</span>
                <AllUnfollow>Unfollow</AllUnfollow>
            </Button>
        );
    }
}

const MapDispatchToProps = dispatch => {
    return {
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

const MapStateToProps = state => {
    return {
        UserLogin : state.UserLogin
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(ButtonFollow);