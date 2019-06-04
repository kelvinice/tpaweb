import React, {Component} from 'react';
import styled from 'styled-components'
import {BACKENDLINK} from "../../Define";

const AllWrapper =styled('div')`
    width: 90px;
    height: 100px;
    border-radius: 3px;
    border: ${props => props.isActive === -1 ? "1px solid #e47a73" : "1px solid #5e79e4"};
    background-color: ${props => props.isActive === -1 ? "white" : "#324dff"};
    box-sizing: border-box;
    &:hover{
      background-color: rgba(132,164,255,0.47);
      border: 1px solid gray;
    }
    color: #21b437;
    cursor: pointer;
`

const Image = styled('div')`
    background-image: url(${props => BACKENDLINK+"storage/images/"+props.picture_id});
    width: 70px;
    height: 70px;
    background-position: center;
    background-size: cover;
    margin: 0 auto;
`

const TitleWrapper =styled('div')`
  margin: 0 auto;
  text-align: center;
  white-space: nowrap;
`

class FacilityCard extends Component {
    render() {
        return (
            <AllWrapper onClick={(data)=>this.props.onClick(this.props.data)} isActive={this.props.isActive}>
                <TitleWrapper>{this.props.data.name}</TitleWrapper>
                <Image picture_id={this.props.data.picture_id}/>
            </AllWrapper>
        );
    }
}

export default FacilityCard;