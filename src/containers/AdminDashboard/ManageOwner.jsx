import React, {Component, Fragment} from 'react';
import UserOnManages from "../../components/AdminManagePage/UserOnManages";
import {BeautyTomatoButton} from "../../components/General/BeautyComponent";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import {BigGreyText, MidButtonWrapper, PopHolder, PopMessager} from "../../components/General/CustomComponent";

class ManageOwner extends Component {
    constructor(props){
        super(props);
        this.scrollFunction = this.scrollFunction.bind(this); //bind function once
    }

    state = {
        owners : null,
        popState : null,
        target : null,
        link : "http://localhost:8000/getAllOwner",
        isLoading : false
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
            if(this.state.owners=== undefined || this.state.owners===null)
                this.setState({
                    owners:response.data.owner.data,
                    link:response.data.owner.next_page_url,
                    isLoading : false
                });
            else{
                this.setState({
                    owners:this.state.owners.concat(response.data.owner.data),
                    link:response.data.owner.next_page_url,
                    isLoading : false
                });
            }
        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);
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

    banned(){
        const id = this.state.target.user.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id}
        axios.patch("http://localhost:8000/banned-user",data).then(response=>{
            // console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link : "http://localhost:8000/getAllOwner",
                    owners:null,
                    target:null,

                },()=>this.fetchMore());
            }
        }).catch(error => {
            console.log(error.response);
        })
    }

    deleteUser(){
        const id = this.state.target.user.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id}
        axios.patch("http://localhost:8000/delete-user",data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link:"http://localhost:8000/getAllOwner",
                    owners:null,
                    target:null,
                },()=>this.fetchMore());
            }
        }).catch(error => {
            console.log(error.response);
        })
    }

    resetUser(){
        const id = this.state.target.user.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id}
        axios.patch("http://localhost:8000/reset-user",data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    target:null,
                });
            }
        }).catch(error => {
            console.log(error.response);
            this.setState({
                target:null,
            });
        })
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
            if(this.state.target.type==="banned"){
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to banned {this.state.target.user.name}?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target)=>this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={()=>this.banned()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }else if(this.state.target.type==="delete"){
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to delete {this.state.target.user.name}?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target)=>this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={()=>this.deleteUser()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }else if(this.state.target.type==="reset"){
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to reset password for {this.state.target.user.name}?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target)=>this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={()=>this.resetUser()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }
        }
    }

    render() {
        return (
            <Fragment>
                {this.handlePop()}
                {this.state.owners &&
                this.state.owners.map(
                    (item,key)=><UserOnManages key = {item.id} data = {item} setTarget={(target)=>this.setTarget(target)}/>
                )
                }
                {this.state.isLoading &&
                <InnerBeautyLoading style={{backgroundColor:"blue"}}/>
                }
            </Fragment>
        );
    }
}

export default ManageOwner;