import React, {Component} from 'react';
import styled from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";

const AllWrapper = styled('div')`
width: 100%;
height: 80px;

margin-bottom: 5px;
cursor: pointer;
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
  background-color: #eb0003;
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
  background-color: #fbb001;
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

const ButtonWrapper = styled('div')`
  display: flex;
  width: unset;
  flex-direction: row;
  @media (max-width: 900px){
      width: 100%;
    }
`

const BigProfile = styled('div')`
  background-position: center;
  background-size: cover;
  width: 80px;
  height: 100%;
  display: inline-block;
`

const TextWrapper = styled('div')`
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-weight: bold;
`


class UserOnManages extends Component {
    handleProfilePicture(){
        if(this.props.data.picture_id != null)
            return  <BigProfile style={{backgroundImage:"url(http://127.0.0.1:8000/storage/images/"+this.props.data.picture_id+")"}}/>;
        else return <BigProfile style={{backgroundImage:"url(/assets/images/default-user-image.png)"}}/>;
    }

    handleColor(){
        if(this.props.data.status === 1){
            return {backgroundColor : "#4d65fb"};
        }else{
            return {backgroundColor : "#eb3935"};
        }
    }

    render() {
        return (
            <AllWrapper style={this.handleColor()}>
                <AttributeContainer>
                    {this.handleProfilePicture()}
                    <TextWrapper>{this.props.data.name}</TextWrapper>
                </AttributeContainer>
                <ButtonWrapper>
                    <ButtonReset onClick={(target)=>this.props.setTarget({user:this.props.data,type:"reset"})}><FontAwesomeIcon icon={faRedo}/></ButtonReset>
                    <ButtonBan onClick={(target)=>this.props.setTarget({user:this.props.data,type:"banned"})}><FontAwesomeIcon icon={faBan}/></ButtonBan>
                    <ButtonDelete onClick={(target)=>this.props.setTarget({user:this.props.data,type:"delete"})}><FontAwesomeIcon icon={faTrashAlt}/></ButtonDelete>
                </ButtonWrapper>

            </AllWrapper>
        );
    }
}

export default UserOnManages;