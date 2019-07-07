import React, {Component} from 'react';
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import {BACKENDLINK} from "../Define";
import styled from 'styled-components';
import Following from "../components/HomePage/Following";
import {InnerBeautyLoading} from "../components/General/BeautyLoading";

const WrapperFollowing = styled('div')`
//columns: 100px 3;
//@media (max-width: 1200px){
//columns: 100px 2;
//}
//@media (max-width: 900px){
//columns: 100px 1;
//}
width: 900px;
display: flex;
flex-wrap: wrap;
margin: 0 auto;


`

const AllWrapper = styled('div')`
background-color: #e6ecf0;
`

class FollowingPage extends Component {
    state = {
        followings : [],
        popState : null,
        target : null,
        link : `${BACKENDLINK}getMyFollowing`,
        isLoading : false,
        innerLoading : false,
        errors: {},
    }

    fetchMore(){
        if(this.state.link==null)return;

        this.setState({
            isLoading : true
        });
        const token = localStorage.getItem('token');
        const axios = require('axios');

        axios.get(`${this.state.link}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            // console.log(response.data);
            this.setState({
                followings:this.state.followings.concat(response.data.followings.data),
                link:response.data.followings.next_page_url,
                isLoading : false
            });
        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);
        });
    }

    componentDidMount() {
        this.fetchMore();
        window.addEventListener("scroll",()=>this.scrollFunction());
    }

    scrollFunction(){
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight-100) {
            if(this.state.isLoading===false && this.state.link!= null){
                this.fetchMore();
            }
        }
    }

    render() {
        return (
            <AllWrapper>
                <UserVerificator roleOnly={1}/>
                <UserNavBar/>
                <BreadCrumbs/>
                <WrapperFollowing>

                    {this.state.followings.map(
                        (item,key)=><Following key={item.id} data={item}/>
                    )}
                </WrapperFollowing>
                {this.state.isLoading &&
                <InnerBeautyLoading style={{backgroundColor:"blue"}}/>
                }

            </AllWrapper>
        );
    }
}

export default FollowingPage;