import React, {Component,Fragment} from 'react';
import styled, {keyframes} from "styled-components";
import {BACKENDLINK} from "../../Define";
import moment from 'moment'

const Flipping = keyframes`
from{
transform: rotateY(0deg);
transform-style: preserve-3d;
}
to{
transform: rotateY(360deg);
transform-style: preserve-3d;
}
`

const AllWrapper = styled('div')`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
`

const FlipCard = styled('div')`
margin: 10px 5px;
box-sizing: border-box;
@media(min-width: 400px){
animation: ${Flipping} linear ${props => 500 - props.count * 30}ms ${props => props.count};
}
color: whitesmoke;
width: 240px;
height: 240px;
@media (max-width: 400px){
width: 100%;
height: 260px;
}
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
${'b'}{
font-size: 30px;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
${'div'}{
font-size: 60px;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
background: linear-gradient(to left top, rgb(255,145,127) 0%/*bottom-right color*/, rgba(255, 0, 255, 0.5) 100%);
`

const SummaryCard = styled('div')`
background-color: rgba(218,8,41,0.5);
font-size: 30px;
color: white;
text-align: center;
font-weight: bold;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
padding: 10px;
margin: 10px;
border-radius: 5px;
@media (max-width: 700px){
font-size: 20px;
}
`

class OwnerDashboardInformation extends Component {
    state={
        done:false,
        data:{},
    }
    componentDidMount() {
        this.fetchMore()
    }

    fetchMore(){
        const token = localStorage.getItem('token');
        const axios = require('axios');

        axios.get(`${BACKENDLINK}getOwnerDashboardInformation`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            // console.log(response.data);
            this.setState({data:response.data,done:true});
        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);
        });
    }

    handleNum(num){
        if(num==0){
            return "NO"
        }else{
            return num;
        }
    }

    handlePremium(){
        if(this.state.data.active_premium){
            return " You have active premium for "+
                moment(this.state.data.active_premium.end_date,"YYYY-MM-DD hh:mm:ss").fromNow()+ " from now";
        }
            else{
           return " You don't have any active premium"
        }

    }

    render() {

        return (
            <Fragment>
                <AllWrapper>
                    <FlipCard count={1}>
                        <b>{this.state.done && "Total House"}</b>
                        <div>{this.state.data.total_houses}</div>
                    </FlipCard>
                    <FlipCard count={2}>
                        <b>{this.state.done && "Total Apartement"}</b>
                        <div>{this.state.data.total_apartements}</div>
                    </FlipCard>
                    <FlipCard count={3}>
                        <b>{this.state.done && "Active Chat"}</b>
                        <div >{this.state.data.active_chat}</div>
                    </FlipCard>
                    <FlipCard count={4}>
                        <b>{this.state.done && "Followers"}</b>
                        <div >{this.state.data.followers}</div>
                    </FlipCard>
                    <FlipCard count={5}>
                        <b>{this.state.done && "Reported Property"}</b>
                        <div >{this.state.data.reports}</div>
                    </FlipCard>
                    {/*<FlipCard count={6}>*/}
                    {/*    <b>{this.state.done && "Total Apartement"}</b>*/}
                    {/*    <div >{this.state.data.total_apartements}</div>*/}
                    {/*</FlipCard>*/}
                    <FlipCard count={6}>
                        <b>{this.state.done && "Active Premium until"}</b>
                        <div style={{fontSize:"30px"}}>{
                            this.state.data.active_premium &&
                            this.state.data.active_premium.end_date
                        }</div>
                    </FlipCard>


                </AllWrapper>
                {this.state.done &&
                <SummaryCard>
                    You have {this.handleNum(this.state.data.total_houses)} Rent Houses, {this.handleNum(this.state.data.total_apartements)} Apartements, {this.handleNum(this.state.data.followers)} Followers, {this.handleNum(this.state.data.active_chat)} Active Chat, {this.handleNum(this.state.data.reports)} Reported Properties, {this.handlePremium()}
                    .
                </SummaryCard>
                }
            </Fragment>

        );
    }
}


export default OwnerDashboardInformation;