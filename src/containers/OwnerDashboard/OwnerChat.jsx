import React, {Component} from 'react';
import Chats from "../../components/HistoryPage/Chats";
import {BACKENDLINK} from "../../Define";
import styled from "styled-components";

const AllWrapper = styled('div')`
  height: 100%;
  width: 100%;
`

class OwnerChat extends Component {
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
            console.log(response.data);
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
            <div>
                <AllWrapper>
                    {this.state.channels.map(
                        (item,key)=><Chats key={item.id} data={item} reversed={true}/>
                    )}
                </AllWrapper>
            </div>
        );
    }
}

export default OwnerChat;