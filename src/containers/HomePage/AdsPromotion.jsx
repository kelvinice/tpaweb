import React, {Component} from 'react';
import styled from "styled-components";
import {OrangeOutlineButton} from '../../components/BeautyComponent'

const Centerer = styled('div')`
    text-align: center;
    width: 100%;
    @media only screen and (max-width: 600px){
     div{
     font-size: 14px !important;
     }
     button{
     padding: 12px !important;
     font-size: 12px !important;
     }
    }
`

class AdsPromotion extends Component {
    render() {
        return (
            <Centerer>
                <div style={{fontSize:"23px"}}><b>Apakah Anda pemilik kos kosan?</b></div>
                <div style={{fontSize:"20px"}}>Promosikan kost Anda di Mamikos agar lebih dikenal</div>

                <OrangeOutlineButton style={{fontSize:"16px",marginTop:"10px"}}><b>GRATIS!</b> Promosikan iklan Anda di sini</OrangeOutlineButton>
                <br/> <br/>
            </Centerer>
        );
    }
}

export default AdsPromotion;