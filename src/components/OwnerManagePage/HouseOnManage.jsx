import React, {Component} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {BACKENDLINK} from "../../Define";
import moment from 'moment'
import 'moment/min/locales'

const AllWrapper = styled('div')`
width: 100%;
height: 160px;
background-color: #4f7bde;
margin-bottom: 5px;
cursor: pointer;
display: flex;
justify-content: flex-end;
//padding-right: 10px;
box-sizing: border-box;
${'div'}{
    //height: 100%;
    ${'svg'}{
      margin: 0 auto;
    }
}
@media (max-width: 900px){
  height: 160px;
  //flex-direction: column;
  padding-right: 0;
}
&:hover{
  background-color: #6ca0fb;
}

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
  background-color: #eb4aa4;
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
  flex-direction: column;
  @media (max-width: 900px){
      //width: 100%;
    }
`

const BigProfile = styled('div')`
  background-position: center;
  background-size: cover;
  width: 160px;
   
  height: unset;
  display: inline-block;
  background-image:${props=>props.pictures_id == null ? "url('/assets/images/default-user-image.png');" : "url("+BACKENDLINK+"storage/images/"+props.pictures_id+");"};
@media (max-width: 900px){
    width: 80px;
    height: 80px;
}
`

const TextWrapper = styled('div')`
  //text-align: center;
  //margin: 0 auto;
  display: flex;
  font-weight: bold;
  padding: 3px;
  flex-direction: column;
   
`

const AttributeContainer = styled('div')`
  width: 100%;
  color: white;
  height: 100%;
  //padding: 5px;
  box-sizing: border-box;
  display: flex;
`

class HouseOnManage extends Component {
    genderHandler(){
        if (this.props.data.gender_type===1){
            return <span style={{fontWeight:"bold",color:"#bd12e7"}}>Campur</span>
        }else if(this.props.data.gender_type===2){
            return <span style={{fontWeight:"bold",color:"blue"}}>Putra</span>
        }else if(this.props.data.gender_type===3){
            return <span style={{fontWeight:"bold",color:"red"}}>Putri</span>
        }
    }

    sisaKamarHandler(){
        if (this.props.data.room_left===0){
            return <span style={{fontWeight:"bold",color:"gray"}}>Kamar tidak tersedia</span>
        }else if (this.props.data.room_left===1){
            return <span style={{fontWeight:"bold",color:"red"}}>Tinggal 1 kamar</span>
        }else{
            return <span style={{fontWeight:"bold",color:"#00d91f"}}>Ada {this.props.data.room_left} kamar</span>
        }
    }

    updateHandler(){
        moment.locale('id');
        let datediff = "";
        if(this.props.data.updated_at){
            datediff ="Update "+moment(this.props.data.updated_at,"YYYY-MM-DD hh:mm:ss").fromNow()
        }else if(this.props.data.created_at){
            datediff ="Update "+moment(this.props.data.created_at,"YYYY-MM-DD hh:mm:ss").fromNow()
        }
        return <span style={{fontSize:"13px"}}>{datediff}</span>;
    }

    render() {
        return (
            <AllWrapper>
                <AttributeContainer>
                    <BigProfile pictures_id={this.props.data.pictures_id}/>
                    <TextWrapper>
                        <div>{this.props.data.name}</div>
                        <div>{this.genderHandler()}</div>
                        <div>{this.sisaKamarHandler()}</div>
                        <div>{this.updateHandler()}</div>
                    </TextWrapper>
                </AttributeContainer>
                <ButtonWrapper>
                    <ButtonBan ><FontAwesomeIcon icon={faRedoAlt}/></ButtonBan>
                    <ButtonDelete onClick={(target)=>this.props.setTarget({house:this.props.data,type:"delete"})}><FontAwesomeIcon icon={faTrashAlt}/></ButtonDelete>
                </ButtonWrapper>
            </AllWrapper>
        );
    }
}

export default HouseOnManage;