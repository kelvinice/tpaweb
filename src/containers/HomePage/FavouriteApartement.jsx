import React, {Component,Fragment} from 'react';
import styled from "styled-components";
import {BACKENDLINK} from "../../Define";
import {BigGreyText} from "../../components/General/CustomComponent";
import Kosts from "../../components/CariPage/Kosts";


const WrapperFavourite = styled('div')`
  width: 100%;
  display: flex;
  overflow: auto;

`

const ContentWrapper = styled('div')`
  padding: 10px;
`

const DummyImage = styled('div')`
    background-image: url("assets/images/dummy.jpg");
    width: 300px;
    height: 250px;
    background-position: 50%;
    background-size: cover;
`

const ContentDecription = styled('div')`
  padding: 13px;
`

class FavouriteApartement extends Component {
    state = {
        properties : [],
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

                axios.post(`${BACKENDLINK}favoriteApartement`, formData,config).then(
                    (response)=>{
                        this.setState({properties:response.data.properties})
                        console.log(response)
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
                {<BigGreyText style={{textAlign:"center"}}>Top 4 Apartement</BigGreyText>}
                <WrapperFavourite>
                    {this.state.properties.map(
                        (item,key)=><Kosts key = {item.id} data = {item}/>
                    )
                    }

                </WrapperFavourite>
            </Fragment>

        );
    }
}



export default FavouriteApartement;