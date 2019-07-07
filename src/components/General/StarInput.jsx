import React, {Component} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";

const AllWrapper = styled('div')`
  background-color: transparent;
  color: black;
  font-size: 28px;
  cursor: pointer;
`

class StarInput extends Component {

    handleStar(min){
        if(this.props.value>=min){
            return <FontAwesomeIcon icon={faStar} style={{color:"green"}} onClick={()=>this.props.changeValue(min)}/>
        }else{
            return <FontAwesomeIcon icon={faStar} onClick={()=>this.props.changeValue(min)}/>
        }
    }

    render() {
        return (
            <AllWrapper>
                {this.handleStar(1)}
                {this.handleStar(2)}
                {this.handleStar(3)}
                {this.handleStar(4)}
                {this.handleStar(5)}
            </AllWrapper>
        );
    }
}

export default StarInput;