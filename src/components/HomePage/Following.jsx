import React, {Component} from 'react';
import styled from "styled-components";
import {BACKENDLINK} from "../../Define";
import ButtonFollow from "../OwnerManagePage/ButtonFollow";
import {Link} from "react-router-dom";

const ThumbnailPicture = styled('div')`
// background-image: ${props=>`url(${BACKENDLINK}storage/images/${props.picture})`};
width: 100%;
height: 100px;
//background-position: center;
//background-repeat: no-repeat;
//background-size: cover;
background-color: green;
position: relative;
`

const AllWrapper = styled('div')`
box-sizing: border-box;
height: 300px;
width: 33.3333%;
//@media (max-width: 900px){
//width: 100%;
//}
border: 3px solid transparent;
position: relative;
break-inside: avoid;
margin-bottom: 2px;
`

const InnerWrapper = styled('div')`
position: relative;
background-color: white;
margin: 0 3px;
width: 100%;
height: 100%;
`

const ContentWrapper = styled('div')`
//padding: 5px;
//background-color: white;
//height: 200px;
//width: 100%;
position: relative;
margin: 13px 15px;
box-sizing: border-box;
`

const ProfilePicture = styled('div')`
 background-image: ${props=> props.picture ? `url(${BACKENDLINK}storage/images/${props.picture})` : `url(/assets/images/default-user-image.png);`};
width: 100px;
height: 100px;

background-size: cover;
background-position: center;
background-repeat: no-repeat;
border-radius: 50%;
margin-top: -55px;
position: relative;
    z-index: 1;
`

const NameDiv= styled('div')`
  position: relative;
  ${'a'}{
  text-decoration: none;
  color: #282c34;
  font-weight: bold;
  &:hover{
  text-decoration: underline;
  }
  }
`

const HeaderWrapper = styled('div')`
display: flex;
justify-content: space-between;
`

class Following extends Component {
    state={
        followers:[],
        isFollow:null,
    }

    fetchFollow(){
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let id = this.props.data.target.id;

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${BACKENDLINK}/get-followers/${id}`,data).then(response=>{
            this.setState({isFollow:response.data.is_follow,followers:response.data.followers});
            // console.log(response.data)
        }).catch(error => {
            console.log(error.response);
        })
    }

    updateFollow(followers,isFollow){
        this.setState({isFollow:isFollow,followers:followers});
    }
    componentDidMount() {
        this.fetchFollow();
    }

    render() {
        return (
            <AllWrapper>
                <InnerWrapper>
                    <ThumbnailPicture/>
                    <ContentWrapper>
                        <HeaderWrapper>
                            <ProfilePicture picture={this.props.data.target.picture_id}/>
                            <ButtonFollow target={this.props.data.target.id} updateFollow={(followers,isFollow)=>this.updateFollow(followers,isFollow)} text={!this.state.isFollow ?
                                "Follow" : "Following"
                            } />
                        </HeaderWrapper>

                        <NameDiv>
                            <Link to={`/seller/${this.props.data.target.id}`}>
                                {this.props.data.target.name}
                            </Link>

                        </NameDiv>
                        <div>
                            Followers : {this.state.followers && this.state.followers.length}
                        </div>
                        {/*{console.log(this.props.data)}*/}

                    </ContentWrapper>
                </InnerWrapper>


            </AllWrapper>
        );
    }
}

export default Following;