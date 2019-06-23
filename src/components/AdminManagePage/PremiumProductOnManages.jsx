import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faPercent} from "@fortawesome/free-solid-svg-icons/faPercent";


const AllWrapper = styled('div')`
width: 100%;
height: 80px;

margin-bottom: 5px;

display: flex;
justify-content: flex-end;
//padding-right: 10px;
box-sizing: border-box;
${'div'}{
    height: 100%;
    ${'svg'}{
      margin: 0 auto;
    }
}
@media (max-width: 900px){
  height: 160px;
  flex-direction: column;
  padding-right: 0;
}

&:hover{
  background-color: #4d65fb;
}
`

const AttributeContainer = styled('div')`
  width: 100%;
  color: white;
  //padding: 5px;
  box-sizing: border-box;
  display: flex;
`

const ButtonDelete = styled('div')`
  background-color: black;
  color: white;
  height: 100%;
  width: 80px;
   min-width: 80px;
   display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 900px){
      width: 100%;
    }
`

const ButtonBan = styled('div')`
  background-color: #eb5322;
  color: white;
  height: 100%;
  width: 80px;
  min-width: 80px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 900px){
      width: 100%;
    }
    
`

const ButtonReset = styled('div')`
  background-color: #614ffb;
  color: white;
  height: 100%;
  width: 100%;
  min-width: 80px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    @media (max-width: 900px){
      width: 100%;
    }
    cursor: pointer;
`

const ButtonWrapper = styled('div')`
  display: flex;
  width: unset;
  flex-direction: row;
  @media (max-width: 900px){
      width: 100%;
    }
    cursor: pointer;
`

const TextWrapper = styled('div')`
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-weight: bold;
  width: 100%;
  background-color: #fba078;
  &:hover{
  background-color: #dac6bc;
  color: #d78a72;
  }
  cursor: unset;
`

const PriceWrapper = styled('div')`
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-weight: bold;
  background-color: #61dafb;
  width: 100%;
  &:hover{
   background-color: #90d2fb;
  color: #4d7be2;
  }
`


class PremiumProductOnManages extends Component {
    handlePromo(){
        if(this.props.data.promo===0){
            return <span>Promo : <FontAwesomeIcon icon={faTimes}/></span>
        }else{
            return <span>Promo : {this.props.data.promo} <FontAwesomeIcon icon={faPercent}/></span>
        }
    }

    render() {
        return (
            <AllWrapper>
                <AttributeContainer>
                    <TextWrapper>{this.props.data.duration} Days</TextWrapper>
                    <PriceWrapper>Rp. {this.props.data.price}</PriceWrapper>
                </AttributeContainer>
                <ButtonReset onClick={(target)=>this.props.setTarget({premium:this.props.data,type:"promo"})}>{this.handlePromo()}</ButtonReset>
                <ButtonWrapper>
                    <ButtonBan onClick={(target)=>this.props.setTarget({premium:this.props.data,type:"update"})}><FontAwesomeIcon icon={faRedoAlt}/></ButtonBan>
                    <ButtonDelete onClick={(target)=>this.props.setTarget({premium:this.props.data,type:"delete"})}><FontAwesomeIcon icon={faTrashAlt}/></ButtonDelete>
                </ButtonWrapper>
            </AllWrapper>
        );
    }
}

export default PremiumProductOnManages;