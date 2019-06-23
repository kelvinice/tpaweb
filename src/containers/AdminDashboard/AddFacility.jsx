import React, {Component, Fragment} from 'react';
import {
    BeautyInputOutlined,
    BeautyInputWrapper,
    BeautySelectInput, BeautyTomatoButton
} from "../../components/General/BeautyComponent";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import {
    BigGreyText,
    BoldRed,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";
import {BACKENDLINK} from "../../Define";

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

        axios.post(`${BACKENDLINK}/insert-facility`, formData,config).then(
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

                
            </Fragment>
        );
    }
}

export default AddFacility;