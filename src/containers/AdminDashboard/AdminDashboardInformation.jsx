import React, {Component, Fragment} from 'react';
import {BACKENDLINK} from "../../Define";
import styled,{keyframes} from "styled-components";

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
animation: ${Flipping} linear ${props => 500-props.count*30}ms ${props => props.count};
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
background: linear-gradient(to left top, rgba(0, 255, 255, 1) 0%/*bottom-right color*/, rgba(255, 0, 255, 0.5) 100%);
`

const SummaryCard = styled('div')`
background-color: rgba(218,0,218,0.5);
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

class AdminDashboardInformation extends Component {
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

        axios.get(`${BACKENDLINK}getDashboardInformation`,{
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

    render() {
        return (
                <Fragment>
                    <AllWrapper>
                        <FlipCard count={1}>
                            <b>{this.state.done && "Total User"}</b>
                            <div>{this.state.data.total_user}</div>
                        </FlipCard>
                        <FlipCard count={2}>
                            <b>{this.state.done && "Total Guest"}</b>
                            <div>{this.state.data.guest_count}</div>
                        </FlipCard>
                        <FlipCard count={3}>
                            <b>{this.state.done && "Total Owner"}</b>
                            <div>{this.state.data.owner_count}</div>
                        </FlipCard>
                        <FlipCard count={4}>
                            <b>{this.state.done && "Total Admin"}</b>
                            <div>{this.state.data.admin_count}</div>
                        </FlipCard>
                        <FlipCard count={5}>
                            <b>{this.state.done && "Active Premium Owner"}</b>
                            <div>{this.state.data.premium_user_count}</div>
                        </FlipCard>
                        <FlipCard count={6}>
                            <b>{this.state.done &&" Today Success Transaction"}</b>
                            <div>{this.state.data.transaction_today}</div>
                        </FlipCard>
                        <FlipCard count={7}>
                            <b>{this.state.done &&" Today Total Report"}</b>
                            <div>{this.state.data.report_today}</div>
                        </FlipCard>

                    </AllWrapper>
                    {this.state.done &&
                        <SummaryCard>
                            Today is a good day, there is {this.handleNum(this.state.data.total_user)} Total user, which is consist of {this.handleNum(this.state.data.guest_count)} Guests, {this.handleNum(this.state.data.owner_count)} Owners, {this.handleNum(this.state.data.admin_count)} Admins, we have {this.handleNum(this.state.data.premium_user_count)} current active premium owners, and {this.handleNum(this.state.data.transaction_today)} Success Transactions today, also we have {this.handleNum(this.state.data.report_today)} Report.
                        </SummaryCard>
                    }
                </Fragment>

        );
    }
}

export default AdminDashboardInformation;