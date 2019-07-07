import React, {Component,Fragment} from 'react';
import styled from "styled-components";
import {BACKENDLINK} from "../../Define";
import {
    BigGreyText,
    HeaderWrapper,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";
import {BeautyTomatoButton, CustomButtonWrapper} from "../../components/General/BeautyComponent";
import {Link} from "react-router-dom";
import Posts from "../../components/AdminManagePage/Posts";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";

const PostsWrapper = styled('div')`
columns: 100px 4;
@media (max-width: 1200px){
columns: 100px 2;
}
@media (max-width: 900px){
columns: 100px 1;
}
`

class AllPost extends Component {
    state={
        posts:[],
        nextPage:null,
        prevPage:null,
        link:`${BACKENDLINK}getMyPost`,
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
                posts:response.data.posts.data,
                nextPage:response.data.posts.next_page_url,
                prevPage:response.data.posts.prev_page_url
            });
        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);
        });
    }

    componentDidMount() {
        this.fetchMore()
    }

    handlePageChanger(){
        return <Fragment>
            <HeaderWrapper>
                {this.state.prevPage &&
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({link:this.state.prevPage},
                            ()=>{
                                this.fetchMore();
                            }
                        )
                    }}>Prev Page</button>
                </CustomButtonWrapper>
                }
                {this.state.nextPage &&
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({link:this.state.nextPage},
                            ()=>{
                                this.fetchMore();
                            }
                        )
                    }}>Next Page</button>
                </CustomButtonWrapper>
                }
            </HeaderWrapper>
        </Fragment>
    }

    setTarget(target){
        this.setState({target:target});
    }


    handlePop(){
        if(this.state.target==null)return null;
        else if(this.state.target==="loading"){
            return <PopHolder>
                <PopMessager>
                    <InnerBeautyLoading/>
                </PopMessager>
            </PopHolder>
        }
    }

    render() {
        return (

            <Fragment>
            {this.handlePop()}
        <PostsWrapper>
            {
                this.state.posts.map(
                    (item,key)=><Posts key={item.id} data={item} />
                )
            }
        </PostsWrapper>

        {this.handlePageChanger()}
    </Fragment>

        );
    }
}

export default AllPost;
export {PostsWrapper};