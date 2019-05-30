import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import UserOnManages from "../../components/AdminManagePage/UserOnManages";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import FacilitiesOnManages from "../../components/AdminManagePage/FacilitiesOnManages";
import {
    BeautyInputOutlined,
    BeautyInputWrapper,
    BeautySelectInput,
    BeautyTomatoButton
} from "../../components/General/BeautyComponent";
import GoodInput from "../../components/General/GoodInput";

const HeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
`

const CustomButtonWrapper = styled('div')`
  width: 100%;
  margin: 5px;
  box-sizing: border-box;
  
  ${'a'}{
    width: 100%;
  }
  ${'button'}{
    &:hover{
      cursor: pointer;
    }
    background-color: #65ca00;
    border: none;
    width: 100%;
    height: 80px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    &:hover{
      color: #c2ee1a;
      background-color: #499200;
    }
  }
`

const PopHolder = styled('div')`
width: 100%;
height: 100%;
position: fixed;
background-color: rgba(178,178,178,0.68);
z-index: 1;
padding: 10px;
display: flex;
align-items: center;
@media (max-width: 900px){
  padding: 0; 
}
`

const PopMessager = styled('div')`
  width: 500px;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  display: block;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 900px){
    width: 70%;
  }
  @media (max-width: 900px){
    margin: 0 0;
  }
`

const BigGreyText = styled('div')`
  color: #404040;
  font-size: 20px;
  font-weight: bold;
`

const MidButtonWrapper = styled('div')`
width: 100%;
padding: 20px;
box-sizing: border-box;
display: flex;
justify-content: space-around;
font-weight: bold;
${"button"}{
  margin: 0 5px;
}
`

const BoldRed = styled('span')`
    color: red;
    font-weight: bolder;
`

class ManageFacility extends Component {
    state = {
        facilities : null,
        popState : null,
        target : null,
        link : "http://localhost:8000/getAllFacilities",
        isLoading : false,
        innerLoading : false,
        errors: {},
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
            if(this.state.facilities=== undefined || this.state.facilities===null)
                this.setState({
                    facilities:response.data.facilities.data,
                    link:response.data.facilities.next_page_url,
                    isLoading : false
                });
            else{
                this.setState({
                    facilities:this.state.facilities.concat(response.data.facilities.data),
                    link:response.data.facilities.next_page_url,
                    isLoading : false
                });
            }
        }).catch((error) => {
            console.log("ini error:");
            console.log(error);
        });
    }

    scrollFunction(){
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight-100) {
            if(this.state.isLoading===false && this.state.link!= null){
                this.fetchMore();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll",()=>this.scrollFunction());
    }

    componentDidMount() {
        this.fetchMore();
        this.setState({isLoading:true});
        window.addEventListener("scroll",()=>this.scrollFunction());
    }

    setTarget(target){
        this.setState({target:target});
    }

    deleteFacility(){
        const id = this.state.target.facility.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.delete(`http://localhost:8000/delete-facility/${id}`,data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link:"http://localhost:8000/getAllFacilities",
                    facilities:null,
                    target:null,
                },()=>this.fetchMore());
            }
        }).catch(error => {
            console.log(error.response);
        })
    }

    updateFacility(event){
        event.preventDefault();

        this.setState({innerLoading:true})

        const id = this.state.target.facility.id;

        const axios = require('axios');
        let token = localStorage.getItem('token');
        let form = event.target;
        let picture = form.elements["picture"].files[0];
        let name = form.elements["name"].value;
        let group = form.elements["group"].value;

        let formData = new FormData();
        formData.append('picture',picture);
        formData.append('token',token);
        formData.append('name',name);
        formData.append('group',group);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`http://localhost:8000/update-facility/${id}`, formData,config).then(
            (response)=>{
                this.setState({errors: {},innerLoading:false})
                console.log(response);

            }
        ).catch(error => {

            console.log(error.response);
            this.setState({errors: error.response.data.errors,innerLoading:false})
        });
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
                        <BigGreyText>Are you sure want to delete {this.state.target.facility.name}?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target)=>this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={()=>this.deleteFacility()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }else if(this.state.target.type==="update"){
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to update {this.state.target.facility.name}?</BigGreyText>
                        <form action="" onSubmit={(event)=>this.updateFacility(event)}>
                            <BeautyInputWrapper>
                                <span>Name</span>
                                <BeautyInputOutlined name="name" defaultValue={this.state.target.facility.name} autoFocus={true}/>
                            </BeautyInputWrapper>
                            {this.state.errors.name && <BoldRed>{this.state.errors.name[0]}</BoldRed>}
                            <BeautyInputWrapper>
                                <span>Icon</span>
                                <BeautyInputOutlined name={"picture"} type={"file"}/>
                            </BeautyInputWrapper>
                            {this.state.errors.picture && <BoldRed>{this.state.errors.picture[0]}</BoldRed>}
                            <BeautyInputWrapper>
                                Group
                                <BeautySelectInput  name="group" required defaultValue={this.state.target.facility.group} >
                                    <option value="1">PUBLIC FACILITY</option>
                                    <option value="2">ROOM FACILITY</option>
                                </BeautySelectInput >
                            </BeautyInputWrapper>
                            {this.state.errors.group && <BoldRed>{this.state.errors.group[0]}</BoldRed>}
                            <br/>
                            <MidButtonWrapper>
                                <BeautyTomatoButton type={"button"} onClick={(target)=>this.setTarget(null)}>Cancel</BeautyTomatoButton>
                                <BeautyTomatoButton >Confirm</BeautyTomatoButton>
                            </MidButtonWrapper>

                        </form>
                        {this.state.innerLoading && <InnerBeautyLoading/>}

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
                        <Link to={"/admin/add-facility"}>
                            <button>Add New Facility</button>
                        </Link>
                    </CustomButtonWrapper>
                </HeaderWrapper>

                {this.state.facilities &&
                this.state.facilities.map(
                    (item,key)=><FacilitiesOnManages key = {item.id} data = {item} setTarget={(target)=>this.setTarget(target)}/>
                )
                }
                {this.state.isLoading &&
                <InnerBeautyLoading style={{backgroundColor:"blue"}}/>
                }
            </Fragment>
        );
    }
}

export default ManageFacility;