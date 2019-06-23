import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components'
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartBlank}   from '@fortawesome/free-regular-svg-icons'
import {BACKENDLINK} from "../../Define";

const AllWrapper = styled('div')`
width: 100%;
height: 100%;
color: red;
font-size: 30px;
cursor: pointer;
`

class FavoriteButton extends Component {
    state={
        favorite:null,
    }

    refresh(){
        const axios = require('axios');
        let token = localStorage.getItem('token');
        let id = this.props.data.id;

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${BACKENDLINK}getFavorite/${id}`,data).then(response=>{
            this.setState({favorite:response.data.favorite});
        }).catch(error => {
            console.log(error.response);
        })
    }

    componentDidMount() {
        this.refresh();
    }

    handleClick(){
        const axios = require('axios');
        let token = localStorage.getItem('token');
        let id = this.props.data.id;

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.patch(`${BACKENDLINK}toggleFavorite/${id}`,data).then(response=>{
            this.setState({favorite:response.data.favorite})
        }).catch(error => {
            console.log(error.response);
        })
    }

    render() {
        return (
            <AllWrapper onClick={()=>this.handleClick()}>
                {this.state.favorite ?
                <FontAwesomeIcon icon={faHeart}/> :
                <FontAwesomeIcon icon={faHeartBlank} />
                }
            </AllWrapper>
        );
    }
}

export default FavoriteButton;