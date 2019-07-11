import React, {Component,Fragment} from 'react';
import TextEditor from "../../components/General/TextEditor";
import styled from 'styled-components'
import {
    BeautyInputOutlined,
    BeautyInputWrapper, BeautySelectInputOutlined,
    BeautyTomatoButton
} from "../../components/General/BeautyComponent";
import {
    BigGreyText, BoldRed,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";
import {BACKENDLINK} from "../../Define";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";

const HeaderTitle = styled('div')`
font-weight: bold;
text-align: center;
font-size: 32px;
`

const SimpleButton = styled('button')`
white-space: nowrap;
border: none;
border-radius: 5px;
font-weight: bold;
font-size: 18px;
&:hover{
background-color: #a2a2a2;
}
`

const DropWrapper = styled('div')`
visibility: hidden;
position: absolute;
background-color: white;
width: 100%;
padding: 3px;
white-space: nowrap;
box-sizing: border-box;
border-radius: 5px;
border: 1px solid #35b216;
z-index: 50;
${'div'}{
    &:hover{
      background-color: #67cd00;
    }
    padding: 3px;
    border-radius: 3px;
    cursor: pointer;
}
&:hover{
  visibility: visible;
}
`

const TagSelectorWrapper = styled('div')`
width: 100%;
position: relative;
border-radius: 5px;

&:focus-within{
    ${DropWrapper}{
      visibility: visible;
    }
}
`

const SimpleLinearWrapper = styled('div')`
display: flex;
`

const TagsWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  ${'div'}{
  padding: 3px;
  border-radius: 5px;
  color: white;
  background-color: #299b2d;
  font-weight: bold;
  margin: 3px;
  cursor: pointer;
  }
`

class AddPost extends Component {
    state = {
        title : "",
        content : "",
        availableTags : [],
        tags:[],
        key:"",
        visibility:0,
        thumbnail : null,
        target:null,
        errors: {},
    }

    fetchTags(){
        const token = localStorage.getItem('token');
        const axios = require('axios');

        axios.get(`${BACKENDLINK}get-all-tags`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
           // console.log(response.data.tags)
            this.setState({availableTags:response.data.tags})

        }).catch((error) => {
            console.log("ini error:");
            console.log(error);
        });
    }

    componentDidMount() {
        this.fetchTags()
    }
    updateContent(editor){
        this.setState({content:editor})
    }

    addNewTag(event){
        event.preventDefault();

        const axios = require('axios');
        let token = localStorage.getItem('token');

        let tag = event.target.elements["key"].value

        let formData = new FormData();
        formData.append('tag',tag);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.post(`${BACKENDLINK}add-tag`, formData,config).then(
            (response)=>{
                this.setState({tags:this.state.tags.concat(response.data.tag)});
            }
        ).catch(error => {
            console.log(error.response);
        });

        this.setState({key:""});
    }

    appendTag(tag){
        this.setState({tags:this.state.tags.concat(tag)},()=>{
            let idx = this.state.availableTags.indexOf(tag)
            let available = this.state.availableTags;
            available.splice(idx,1);
            this.setState({availableTags:available});
        })
    }

    returnTag(tag){
        let idx = this.state.tags.indexOf(tag)
        let tags = this.state.tags;
        tags.splice(idx,1);
        this.setState({tags:tags,availableTags:this.state.availableTags.concat(tag)});
    }

    inputChangeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }

    inputFileChanged(e){
        this.setState({[e.target.name]:e.target.files[0]});
    }

    handleSubmit(){
        this.setState({target:"loading"})
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let formData = new FormData();
        formData.append('title',this.state.title);
        formData.append('visibility',this.state.visibility);
        formData.append('tags',JSON.stringify(this.state.tags));
        formData.append('thumbnail',this.state.thumbnail);
        formData.append('content',this.state.content);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }

        axios.post(`${BACKENDLINK}insert-post`, formData,config).then(
            (response)=>{
                this.setState({target:"success", errors: {}})
                console.log(response);
            }
        ).catch(error => {
            console.log(error.response.data.errors);
            this.setState({target:"error" ,errors: error.response.data.errors})
        });

    }

    handlePop() {
        if (this.state.target == null) return null;
        else if (this.state.target === "loading") {
            return <PopHolder>
                <PopMessager>
                    <InnerBeautyLoading/>
                </PopMessager>
            </PopHolder>
        } else if(this.state.target === "success"){
            return <PopHolder>
                <PopMessager>
                    <BigGreyText>Success Insert New Post!</BigGreyText>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={() => this.setState({target:null})}>Okay</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PopMessager>
            </PopHolder>
        }else{
            return <PopHolder>
                <PopMessager>
                    <BigGreyText>Error has occured...</BigGreyText>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={() => this.setState({target:null})}>Okay</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PopMessager>
            </PopHolder>
        }
    }

    render() {
        return (
            <Fragment>
                {this.handlePop()}
                <BeautyInputWrapper>
                    <HeaderTitle>Title</HeaderTitle>
                    <BeautyInputOutlined name={"title"} value={this.state.title} onChange={(e)=>this.inputChangeHandler(e)}/>
                </BeautyInputWrapper>
                {this.state.errors.title && <BoldRed>{this.state.errors.title[0]}</BoldRed>}

                <BeautyInputWrapper>
                    <HeaderTitle>Visibility</HeaderTitle>
                    <BeautySelectInputOutlined name={"visibility"} value={this.state.visibility} onChange={(e)=>this.inputChangeHandler(e)}>
                        <option value={0}>All User</option>
                        <option value={1}>Only Guest</option>
                        <option value={2}>Only Owner</option>
                        <option value={3}>Only Admin</option>
                    </BeautySelectInputOutlined>
                </BeautyInputWrapper>
                {this.state.errors.visibility && <BoldRed>{this.state.errors.visibility[0]}</BoldRed>}
                <BeautyInputWrapper>
                <HeaderTitle>
                    Tag
                </HeaderTitle>
                    <form onSubmit={(event)=>this.addNewTag(event)} >
                    <SimpleLinearWrapper>
                        <TagSelectorWrapper>
                            <BeautyInputOutlined type={"text"} autoComplete="off" name={"key"} value={this.state.key} onChange={(event)=>this.inputChangeHandler(event)}/>
                            <DropWrapper>
                                {
                                    [...this.state.availableTags].map(
                                        (item,key) =>
                                        item.name.toUpperCase().includes(this.state.key.toUpperCase()) &&
                                        <div key={item.id} onClick={()=>this.appendTag(item)}>{item.name}</div>
                                    )
                                }
                            </DropWrapper>
                        </TagSelectorWrapper>
                        <SimpleButton>Add Tag</SimpleButton>
                    </SimpleLinearWrapper>
                    </form>
                </BeautyInputWrapper>
                <TagsWrapper>
                    {
                        this.state.tags.map(
                            (item,key) =>
                                <div key={item.id} onClick={()=>this.returnTag(item)}>{item.name}</div>
                        )
                    }
                </TagsWrapper>
                {this.state.errors.tags && <BoldRed>{this.state.errors.tags[0]}</BoldRed>}

                <BeautyInputWrapper>
                    <HeaderTitle>Thumbnail</HeaderTitle>
                    <BeautyInputOutlined type={"file"} name={"thumbnail"} onChange={(e)=>this.inputFileChanged(e)}/>
                </BeautyInputWrapper>
                {this.state.errors.thumbnail && <BoldRed>{this.state.errors.thumbnail[0]}</BoldRed>}

                <BeautyInputWrapper>

                <HeaderTitle>Content</HeaderTitle>

                <TextEditor updateContent={(editor)=>this.updateContent(editor)}/>
                </BeautyInputWrapper>
                {this.state.errors.content && <BoldRed>{this.state.errors.content[0]}</BoldRed>}
                <br/>
                <BeautyTomatoButton onClick={()=>this.handleSubmit()}>Submit</BeautyTomatoButton>
            </Fragment>
        );
    }
}

export default AddPost;
export {TagsWrapper};