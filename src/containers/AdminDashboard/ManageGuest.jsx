import React, {Component} from 'react';
import styled from 'styled-components'
import Guests from "../../components/ManageGuestPage/Guests";


const AllWrapper = styled('div')`
  background-color: #86befb;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  @media (min-width: 900px){
    padding: 5px;
    box-sizing: border-box;
  }
`


class ManageGuest extends Component {
    state = {
        guests : null
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const axios = require('axios');
        axios.get(`http://localhost:8000/getAllGuest?token=${token}`,{

        }).then(response=>{
            console.log(response.data);
            this.setState({guests:response.data.guest});
        }).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            if(error.response != null)
                this.MessageChanger(null,error.response.data.message);
        });
    }

    render() {
        return (
            <AllWrapper>
                {this.state.guests &&
                    this.state.guests.map(
                        (item,key)=><Guests key = {item.id} data = {item}/>
                    )
                }

            </AllWrapper>
        );
    }
}

export default ManageGuest;