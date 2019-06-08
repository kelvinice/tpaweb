import React, {Component, Fragment} from 'react';
import {
    BeautyInputOutlined,
    BeautyInputWrapper,
    BeautyTomatoButton
} from "../../components/General/BeautyComponent";
import {
    BigGreyText,
    BoldRed, InputInformation,
    LinearWrapper,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import {BACKENDLINK} from "../../Define";

class AddPremiumProduct extends Component {
    state={
        target : null,
        errors: {},
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
                    <BigGreyText>Success Insert New Premium Duration!</BigGreyText>
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

    addSubmit(event){
        event.preventDefault();
        this.setState({target:"loading"})

        const axios = require('axios');
        let token = localStorage.getItem('token');
        let form = event.target;
        let price = form.elements["price"].value;
        let duration = form.elements["duration"].value;

        let formData = new FormData();
        formData.append('duration',duration);
        formData.append('price',price);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.post(`${BACKENDLINK}insert-premium`, formData,config).then(
            (response)=>{
                this.setState({target:"success", errors: {}})
                console.log(response);
            }
        ).catch(error => {

            console.log(error.response.data.errors);
            this.setState({target:"error" ,errors: error.response.data.errors})
            // this.props.MessageChanger(null,error.response)
        }).finally(()=>{
            form.reset();
        });
    }

    render() {
        return (
            <Fragment>
                {this.handlePop()}
                <form action="" onSubmit={(event)=>this.addSubmit(event)}>
                    <BeautyInputWrapper>
                        <span>Duration</span>
                        <LinearWrapper>
                            <BeautyInputOutlined type={"number"} name={"duration"} autoFocus={true} />
                            <InputInformation>Days</InputInformation>
                        </LinearWrapper>

                    </BeautyInputWrapper>
                    {this.state.errors.duration && <BoldRed>{this.state.errors.duration[0]}</BoldRed>}
                    <BeautyInputWrapper>
                        <span>Price</span>

                        <LinearWrapper>
                            <InputInformation>Rp. </InputInformation>
                            <BeautyInputOutlined type={"number"} name={"price"}/>
                        </LinearWrapper>
                    </BeautyInputWrapper>
                    {this.state.errors.price && <BoldRed>{this.state.errors.price[0]}</BoldRed>}
                    <br/>
                    <BeautyTomatoButton>Submit</BeautyTomatoButton>
                </form>
            </Fragment>
        );
    }
}

export default AddPremiumProduct;