import React, {Component, Fragment} from 'react';
import {BACKENDLINK} from "../../Define";
import City from "../../components/HomePage/City";
import styled from "styled-components";
import {BigGreyText} from "../../components/General/CustomComponent";

const AllWrapper = styled('div')`
display: flex;
justify-content: center;
flex-wrap: wrap;
`

class TopFifthCity extends Component {
    state = {
        cities : [],
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position) =>{
                // console.log([position.coords.latitude,position.coords.longitude])
                const axios = require('axios');
                let token = localStorage.getItem('token');

                let formData = new FormData();
                formData.append('latitude',position.coords.latitude);
                formData.append('longitude',position.coords.longitude);

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                axios.post(`${BACKENDLINK}nearestCity`, formData,config).then(
                    (response)=>{
                        this.setState({cities:response.data.cities})
                        // console.log(response)
                    }
                ).catch(error => {
                    console.log(error.response);
                });


            },()=>{
                console.log([-6.20,106.78]);  //Default Value kalo gk di enable geo

            })
        }
    }

    render() {
        return (
            <Fragment>
                {<BigGreyText style={{textAlign:"center"}}>Top 5 Nearest City</BigGreyText>}
                <AllWrapper>
                {this.state.cities.map(
                    (item,key)=><City data={item} key={item.name}/>
                )}
                </AllWrapper>
            </Fragment>
        );
    }
}

export default TopFifthCity;