import React, {Component, Fragment} from 'react';
import {

    BeautyInputOutlined,
    BeautyInputWrapper,
    BeautySelectInput, BeautyTomatoButton
} from "../../components/General/BeautyComponent";
import styled from "styled-components";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";

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
    //height: 100%;
  }
  @media (max-width: 900px){
    margin: 0 0;
  }
`

const HeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
  ${'form'}{
     width: 100%;
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

class AddFacility extends Component {
    state={
        target : null,
        errors: {},
    }

    addSubmit(event){
        event.preventDefault();
        this.setState({target:"loading"})

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

        axios.post("http://localhost:8000/insert-facility", formData,config).then(
            (response)=>{
                this.setState({target:"success", errors: {}})
                console.log(response);

            }
        ).catch(error => {

            console.log(error.response.data.errors);
            this.setState({target:"error" ,errors: error.response.data.errors})
            // this.props.MessageChanger(null,error.response)
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
                    <BigGreyText>Success Insert New Facilities!</BigGreyText>
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
                <HeaderWrapper>
                    <form action="" onSubmit={(event)=>this.addSubmit(event)}>
                        <BeautyInputWrapper>
                            <span>Name</span>
                            <BeautyInputOutlined name={"name"} autoFocus={true}/>
                        </BeautyInputWrapper>
                        {this.state.errors.name && <BoldRed>{this.state.errors.name[0]}</BoldRed>}
                        <BeautyInputWrapper>
                            <span>Icon</span>
                            <BeautyInputOutlined name={"picture"} type={"file"}/>
                        </BeautyInputWrapper>
                        {this.state.errors.picture && <BoldRed>{this.state.errors.picture[0]}</BoldRed>}
                        <BeautyInputWrapper>
                            Group
                            <BeautySelectInput  name="group" required >
                                <option value="1">PUBLIC FACILITY</option>
                                <option value="2">ROOM FACILITY</option>
                            </BeautySelectInput >
                        </BeautyInputWrapper>
                        {this.state.errors.group && <BoldRed>{this.state.errors.group[0]}</BoldRed>}
                        <br/>
                        <BeautyTomatoButton>Submit</BeautyTomatoButton>

                    </form>
                </HeaderWrapper>
                
            </Fragment>
        );
    }
}

export default AddFacility;