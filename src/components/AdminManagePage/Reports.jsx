import React, {Component} from 'react';
import 'moment/min/locales'
import {BeautyTomatoButton} from "../General/BeautyComponent";
import styled from "styled-components";
import {withRouter} from 'react-router-dom'

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

const ContentWrapper = styled('div')`
    white-space: pre-wrap;      /* CSS3 */   
    white-space: -moz-pre-wrap; /* Firefox */    
    white-space: -o-pre-wrap;   /* Opera 7 */    
    word-wrap: break-word;      /* IE */
`

const TopWrapper = styled('div')`
min-height: 200px;
max-height: 500px;
overflow-y: hidden;
position: relative;
`

// const BottomWrapper = styled('div')`
//   width: 100%;
//   box-sizing: border-box;
//   ${BeautyTomatoButton}{
//   margin: 0 auto;
//   text-align: center;
//   }
//   position: relative;
//   bottom: 0;
// `

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

class Reports extends Component {
    typeHandler(){
        if(this.props.data.house == null) {
            return <span style={{fontWeight: "bold", color: "blue"}}>Apartement</span>
        }else{
            return <span style={{fontWeight:"bold",color:"green"}}>Kost</span>
        }
    }

    render() {
        return (
            <AllWrapper>
                <TopWrapper>
                    {/*{console.log(this.props.data)}*/}
                    {this.typeHandler()} {this.props.data.property.name}
                    <div style={{fontSize:"14px"}}>{this.props.data.created_at}</div>
                    <ContentWrapper>
                        {this.props.data.description}
                    </ContentWrapper>
                </TopWrapper>
                {/*{console.log(this.props.data)}*/}

                {this.props.setTarget &&
                <ButtonWrapper>
                    <BeautyTomatoButton onClick={()=>this.props.history.push(`/detail/${this.props.data.property.slug}`)}>View More</BeautyTomatoButton>
                    <BeautyTomatoButton onClick={(target)=>this.props.setTarget({post:this.props.data,type:"delete"})}>Delete</BeautyTomatoButton>
                </ButtonWrapper>
                }

            </AllWrapper>

        );
    }
}

export default withRouter(Reports);