import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {
    BeautyInputOutlined,
    BeautyInputWrapper,
    BeautyTomatoButton,
    CustomButtonWrapper
} from "../../components/General/BeautyComponent";
import {
    BigGreyText, BoldRed,
    HeaderWrapper, InputInformation, LinearWrapper,
    MidButtonWrapper,
    PopHolder,
    PopMessager, SuccessImage
} from "../../components/General/CustomComponent";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import PremiumProductOnManages from "../../components/AdminManagePage/PremiumProductOnManages";
import {BACKENDLINK} from "../../Define";
import {faPercent} from "@fortawesome/free-solid-svg-icons/faPercent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ManagePremium extends Component {
    constructor(props){
        super(props);
        this.scrollFunction = this.scrollFunction.bind(this); //bind function once
    }
    state = {
        premiums : [],
        popState : null,
        target : null,
        nextPage:null,
        prevPage:null,
        link : `${BACKENDLINK}getAllPremiumProducts`,
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
            this.setState({
                premiums:this.state.premiums.concat(response.data.premiums.data),
                link:response.data.premiums.next_page_url,
                isLoading : false
            });

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
        window.removeEventListener("scroll",this.scrollFunction);
    }

    componentDidMount() {
        this.fetchMore();
        this.setState({isLoading:true});
        window.addEventListener("scroll",this.scrollFunction);
    }

    setTarget(target){
        this.setState({target:target});
    }

    deletePremium(){
        const id = this.state.target.premium.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.delete(`${BACKENDLINK}delete-premium/${id}`,data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link:`${BACKENDLINK}getAllPremiumProducts`,
                    premiums:[],
                    target:null,
                },()=>this.fetchMore());
            }
        }).catch(error => {
            console.log(error.response);
        })
    }

    updatePremium(event){
        event.preventDefault();

        this.setState({innerLoading:true})

        const id = this.state.target.premium.id;

        const axios = require('axios');
        let token = localStorage.getItem('token');
        let form = event.target;
        let price = form.elements["price"].value;

        let formData = new FormData();
        formData.append('token',token);
        formData.append('price',price);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`http://localhost:8000/update-premium/${id}`, formData,config).then(
            (response)=>{
                this.setState({errors: {},innerLoading:false,target:"success"})
                // console.log(response);
            }
        ).catch(error => {
            console.log(error.response);
            this.setState({errors: error.response.data.errors,innerLoading:false})
        });
    }

    updatePromo(event){
        event.preventDefault();

        this.setState({innerLoading:true})

        const id = this.state.target.premium.id;

        const axios = require('axios');
        let token = localStorage.getItem('token');
        let form = event.target;
        let promo = form.elements["promo"].value;

        let formData = new FormData();
        formData.append('token',token);
        formData.append('promo',promo);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`http://localhost:8000/update-promo/${id}`, formData,config).then(
            (response)=>{
                this.setState({errors: {},innerLoading:false,target:"success"})
                // console.log(response);
            }
        ).catch(error => {
            console.log(error.response);
            this.setState({errors: error.response.data.errors,innerLoading:false})
        });
    }

    handlePop() {
        if (this.state.target == null) return null;
        else if(this.state.target === "success"){
            return <PopHolder>
                <PopMessager>
                    <SuccessImage/>
                    <br/>
                    <BeautyTomatoButton onClick={()=>this.setState({link:`${BACKENDLINK}getAllPremiumProducts`,
                        premiums:[],
                        target:null,},()=>this.fetchMore())}>Next</BeautyTomatoButton>
                </PopMessager>
            </PopHolder>
        }
        else if (this.state.target === "loading") {
            return <PopHolder>
                <PopMessager>
                    <InnerBeautyLoading/>
                </PopMessager>
            </PopHolder>
        } else {
            if (this.state.target.type === "delete") {
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to delete {this.state.target.premium.duration} days Premium?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={() => this.deletePremium()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }else if(this.state.target.type==="update"){
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to update {this.state.target.premium.duration} days Premium?</BigGreyText>
                        <form action="" onSubmit={(event)=>this.updatePremium(event)}>
                            <BeautyInputWrapper>
                                <span>Price</span>
                                <LinearWrapper>
                                    <InputInformation>Rp. </InputInformation>
                                    <BeautyInputOutlined type={"number"} name={"price"}/>
                                </LinearWrapper>
                            </BeautyInputWrapper>
                            {this.state.errors.price && <BoldRed>{this.state.errors.price[0]}</BoldRed>}

                            <br/>
                            <MidButtonWrapper>
                                <BeautyTomatoButton type={"button"} onClick={(target)=>this.setTarget(null)}>Cancel</BeautyTomatoButton>
                                <BeautyTomatoButton >Confirm</BeautyTomatoButton>
                            </MidButtonWrapper>
                        </form>
                        {this.state.innerLoading && <InnerBeautyLoading/>}
                    </PopMessager>
                </PopHolder>
            }else if(this.state.target.type==="promo"){
                return <PopHolder>
                    <PopMessager style={{backgroundColor: "#5f53f2"}}>
                        <BigGreyText style={{color:"white"}}>Promo of {this.state.target.premium.duration} days Premium</BigGreyText>
                        <form action="" onSubmit={(event)=>this.updatePromo(event)}>
                            {this.state.target.premium.promo !== 0 ?
                                <Fragment>
                                    <BigGreyText style={{color:"white"}}>Discount {this.state.target.premium.promo} <FontAwesomeIcon icon={faPercent}/></BigGreyText>
                                    <BeautyInputOutlined type={"hidden"} name={"promo"} value={0} />
                                    <MidButtonWrapper>
                                        <BeautyTomatoButton type={"button"} onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>

                                        <BeautyTomatoButton>Delete Promo</BeautyTomatoButton>

                                    </MidButtonWrapper>
                                </Fragment> :
                                <Fragment>
                                    <BeautyInputWrapper>
                                        <BigGreyText style={{color:"white"}}>Promo Percentage</BigGreyText>
                                        <LinearWrapper>
                                            <BeautyInputOutlined type={"number"} name={"promo"} autoFocus={true} />
                                            <InputInformation><FontAwesomeIcon icon={faPercent}/></InputInformation>
                                        </LinearWrapper>
                                    </BeautyInputWrapper>
                                    {this.state.errors.promo && <BoldRed>{this.state.errors.promo[0]}</BoldRed>}
                                    <MidButtonWrapper>
                                        <BeautyTomatoButton type={"button"} onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>

                                        <BeautyTomatoButton>Add Promo</BeautyTomatoButton>

                                    </MidButtonWrapper>
                                </Fragment>
                            }
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
                        <Link to={"/admin/add-premium-product"}>
                            <button>Add New Premium Duration</button>
                        </Link>
                    </CustomButtonWrapper>
                </HeaderWrapper>
                {this.state.premiums.map(
                    (item,key)=><PremiumProductOnManages key = {item.id} data = {item} setTarget={(target)=>this.setTarget(target)}/>
                )}
                {this.state.isLoading &&
                <InnerBeautyLoading style={{backgroundColor:"blue"}}/>
                }
            </Fragment>
        );
    }
}

export default ManagePremium;