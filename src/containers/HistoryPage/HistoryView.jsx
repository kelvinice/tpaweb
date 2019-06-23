import React, {Component} from 'react';
import styled from "styled-components";
import {BACKENDLINK} from "../../Define";
import Kosts from "../../components/CariPage/Kosts";

const AllWrapper = styled('div')`
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  ${Kosts} {
    background-color: #f0ffe8;
  }
`



class HistoryView extends Component {
    state={
        histories:[],
    }

    componentDidMount() {
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${BACKENDLINK}getMyHistories`,data).then(response=>{
            this.setState({histories:response.data.histories})

        }).catch(error => {
            console.log(error.response);
        })
    }

    render() {
        return (
            <AllWrapper>
                {
                    this.state.histories.map(
                        (item,key)=><Kosts key={item.id} data={item.property}/>
                    )
                }

            </AllWrapper>
        );
    }
}

export default HistoryView;