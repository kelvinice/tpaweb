import React, {Component} from 'react';
import styled from "styled-components";
import {BACKENDLINK} from "../../Define";
import Chats from "../../components/HistoryPage/Chats";

const AllWrapper = styled('div')`
  height: 100%;
  width: 100%;
`

class HistoryChat extends Component {
    state={
        channels : [],
    }

    fetchChat(){
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${BACKENDLINK}getAllChannel`,data).then(response=>{
            // console.log(response.data);
            this.setState({channels:response.data.channels})
        }).catch(error => {
            console.log(error.response);
        })
    }

    componentDidMount() {
        this.fetchChat();
    }

    render() {
        return (
            <AllWrapper>
                {this.state.channels.map(
                    (item,key)=><Chats key={item.id} data={item}/>
                )}

            </AllWrapper>
        );
    }
}

export default HistoryChat;