import React, {Component, Fragment} from 'react';
import {
    BeautyTomatoButton,
    CustomButtonWrapper
} from "../../components/General/BeautyComponent";
import {Link} from "react-router-dom";
import {
    BigGreyText,
    HeaderWrapper,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";
import {BACKENDLINK} from "../../Define";
import Posts from "../../components/AdminManagePage/Posts";
import styled from "styled-components";
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

class ManagePost extends Component {
    state={
        posts:[],
        nextPage:null,
        prevPage:null,
        link:`${BACKENDLINK}getAllPost`,
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

    deletePost(){
        const id = this.state.target.post.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.delete(`${BACKENDLINK}delete-post/${id}`,data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link:`${BACKENDLINK}getAllPost`,
                    posts:[],
                    target:null,
                },()=>this.fetchMore());
            }
        }).catch(error => {
            console.log(error.response);
        })
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
        else{
            if(this.state.target.type==="delete"){
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to delete {this.state.target.post.title}?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target)=>this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={()=>this.deletePost()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }else if(this.state.target.type==="update"){
                return <PopHolder>
                    <PopMessager>

                    </PopMessager>
                </PopHolder>
            }
        }
    }


    render() {
        return (
            <Fragment>
                {this.handlePop()}
                <HeaderWrapper>
                    <CustomButtonWrapper>
                        <Link to={"/admin/add-post"}>
                            <button>Add New Post</button>
                        </Link>
                    </CustomButtonWrapper>
                </HeaderWrapper>
                <PostsWrapper>
                    {
                        this.state.posts.map(
                            (item,key)=><Posts key={item.id} data={item} setTarget={(target)=>this.setTarget(target)}/>
                        )
                    }
                </PostsWrapper>

                {this.handlePageChanger()}

            </Fragment>
        );
    }
}

export default ManagePost;