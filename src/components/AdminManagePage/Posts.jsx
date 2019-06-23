import React, {Component} from 'react';
import styled from 'styled-components'
import {BACKENDLINK} from "../../Define";
import {BeautyTomatoButton} from "../General/BeautyComponent";
import moment from 'moment'
import 'moment/min/locales'
import {TagsWrapper} from "../../containers/AdminDashboard/AddPost";

const AllWrapper = styled('div')`
width: 100%;
background-color: white;
padding: 5px;
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
height: 200px;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`

const ContentWrapper = styled('div')`
    white-space: pre-wrap;      /* CSS3 */   
    white-space: -moz-pre-wrap; /* Firefox */    
    white-space: -o-pre-wrap;   /* Opera 7 */    
    word-wrap: break-word;      /* IE */
`

const TopWrapper = styled('div')`
min-height: 400px;
max-height: 500px;
overflow-y: hidden;
position: relative;
`

const BottomWrapper = styled('div')`
  width: 100%;
  box-sizing: border-box;
  ${BeautyTomatoButton}{
  margin: 0 auto;
  text-align: center;
  }
  position: relative;
  bottom: 0;
`

const ButtonWrapper = styled('div')`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  justify-content: space-between;
  ${BeautyTomatoButton}{
  width: 45%;
  }
`

const GradientPadder = styled('div')`
width: 100%;
height: 150px;
position: absolute;
background: rgb(2,0,36);
bottom: 0;
background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
`

class Posts extends Component {
    render() {
        return (
            <AllWrapper>
                <TopWrapper>
                    <ThumbnailPicture picture={this.props.data.picture}/>
                    <div style={{fontSize:"14px"}}>{moment(this.props.data.created_at,"YYYY-MM-DD hh:mm:ss").fromNow()}</div>
                    <TagsWrapper>
                        {
                            this.props.data.tags.map(
                                (item,key) =>
                                    <div key={item.id}>{item.name}</div>
                            )
                        }
                    </TagsWrapper>
                    <div>{this.props.data.title}</div>
                    <ContentWrapper dangerouslySetInnerHTML={ {__html: this.props.data.content}}/>
                    <GradientPadder/>
                </TopWrapper>
                {/*{console.log(this.props.data)}*/}
                <BottomWrapper>
                    <BeautyTomatoButton>View More</BeautyTomatoButton>
                </BottomWrapper>
                {this.props.setTarget &&

                <ButtonWrapper>
                    <BeautyTomatoButton>Update</BeautyTomatoButton>
                    <BeautyTomatoButton onClick={(target)=>this.props.setTarget({post:this.props.data,type:"delete"})}>Delete</BeautyTomatoButton>
                </ButtonWrapper>
                }

            </AllWrapper>

        );
    }
}

export default Posts;