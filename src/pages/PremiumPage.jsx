import React, {Component} from 'react';
import styled,{keyframes} from "styled-components";
import UserNavBar from "../containers/UserPage/UserNavBar";
import UserVerificator from "../components/General/UserVerificator";
import BreadCrumbs from "../components/General/BreadCrumbs";
import {BACKENDLINK} from "../Define";
import PremiumProductCard from "../components/HomePage/PremiumProductCard";

const AllWrapper = styled('div')`
  height: 100%;
  width: 100%;
`

const PremiumsWrapper = styled('div')`
width: 100%;
display: flex;
flex-wrap: wrap;
box-sizing: border-box;
@media (min-width: 1200px){
padding: 10%;
}
`

const RGB = keyframes`
from{
background-color: #b121c1;
}
25%{
background-color: #d94046;
}

50%{
background-color: #e63181;
}
75%{
background-color: #c12a8a;
}
to{
background-color: #b121c1;
}

`


const AttributeWrapper = styled('div')`
background-color: #b121c1;
width: 100%;
height: 100%;
min-height: 89vh;
color: white;
text-align: center;
display: flex;

justify-content: center;
flex-direction: column;
font-weight: bold;
animation: ${RGB} 3s linear infinite;

`

class PremiumPage extends Component {
    state={
        premiums:[],
        isLoading : false,
        best :{}
    }

    componentDidMount() {
        this.setState({
            isLoading : true
        });

        const axios = require('axios');

        axios.get(`${BACKENDLINK}getTrueAllPremiumProducts`).then(response=>{
            this.setState({
                premiums:response.data.premiums,
                isLoading : false,
                best:response.data.best
            });
        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);
        });
    }

    render() {
        return (
            <AllWrapper>
                <UserVerificator noRedirect={true}/>
                <UserNavBar/>
                <BreadCrumbs/>

                <AttributeWrapper>
                    <PremiumsWrapper>
                        {
                            this.state.premiums.map(
                                (item,key) => <PremiumProductCard key={item.id} data={item} best={this.state.best}/>
                            )
                        }
                    </PremiumsWrapper>
                </AttributeWrapper>


            </AllWrapper>
        );
    }
}

export default PremiumPage;