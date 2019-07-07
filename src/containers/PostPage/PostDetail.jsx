import React, {Component} from 'react';
import {BACKENDLINK} from "../../Define";
import {withRouter} from 'react-router-dom';
import styled from "styled-components";
import moment from 'moment'
import 'moment/min/locales'
import {TagsWrapper} from "../AdminDashboard/AddPost";
import Posts from "../../components/AdminManagePage/Posts";
import {PostsWrapper} from "./AllPost";
import {BigGreyText} from "../../components/General/CustomComponent";

const AllWrapper = styled('div')`
width: 100%;
background-color: white;
//padding: 5px;
box-sizing: border-box;
height: auto;
@media (max-width: 900px){
width: 100%;
}
border: 2px solid grey;
position: relative;
break-inside: avoid;
`

const ThumbnailPicture = styled('div')`
background-image: ${props=>`url(${BACKENDLINK}storage/images/${props.picture})`};
width: 100%;
height: 45vh;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`

const ContentWrapper = styled('div')`
    white-space: pre-wrap;      /* CSS3 */   
    white-space: -moz-pre-wrap; /* Firefox */    
    white-space: -o-pre-wrap;   /* Opera 7 */    
    word-wrap: break-word;      /* IE */
    background-color: white;
`

const TopWrapper = styled('div')`
overflow-y: hidden;
position: relative;
`

const TitleDiv = styled('div')`
text-align: center;
font-size: 30px;
font-weight: bold;
`

class PostDetail extends Component {
    state={
        data :{
            tags:[]
        },
        target:null,
        recomends:[],
    }

    componentDidMount() {
        // console.log(this.props.match.params.slug)
        this.fetchData(this.props.match.params.slug)
    }

    fetchData(slug){
        const axios = require('axios');
        const token = localStorage.getItem('token');

        axios.get(`${BACKENDLINK}getPostBySlug/${slug}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(response=>{
            console.log(response.data)
            this.setState({data:response.data.post,recomends:response.data.recomends})

        }).catch(err=>{
            console.log(err.response)
            if(err.response.status===404){
                this.props.history.push("/")
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.fetchData(nextProps.match.params.slug)
    }

    render() {
        return (
            <AllWrapper>

                <ThumbnailPicture picture={this.state.data.picture}/>
                <TopWrapper>

                    <TitleDiv>{this.state.data.title}</TitleDiv>
                    <div style={{fontSize:"14px"}}>{this.state.data.created_at} {moment(this.state.data.created_at,"YYYY-MM-DD hh:mm:ss").fromNow()}</div>
                    <TagsWrapper>
                        {
                            this.state.data.tags.map(
                                (item,key) =>
                                    <div key={item.id}>{item.name}</div>
                            )
                        }
                    </TagsWrapper>

                </TopWrapper>
                <ContentWrapper dangerouslySetInnerHTML={ {__html: this.state.data.content}}/>
                {<BigGreyText style={{textAlign:"center"}}>Recomended Post</BigGreyText>}
                <PostsWrapper>
                    {
                        this.state.recomends.map(
                            (item,key)=><Posts key={item.id} data={item} />
                        )
                    }
                </PostsWrapper>
            </AllWrapper>
        );
    }
}

export default withRouter(PostDetail);