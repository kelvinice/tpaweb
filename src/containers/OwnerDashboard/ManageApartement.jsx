import React, {Component,Fragment} from 'react';
import {BeautyTomatoButton, CustomButtonWrapper} from "../../components/General/BeautyComponent";
import {Link} from "react-router-dom";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import ApartementOnManage from "../../components/OwnerManagePage/ApartementOnManage";
import {
    BigGreyText,
    HeaderWrapper,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";

class ManageApartement extends Component {
    state = {
        apartements : [],
        popState : null,
        target : null,
        link : "http://localhost:8000/ownedApartement",
        isLoading : false,
        innerLoading : false,
        errors: {},
    }

    setTarget(target){
        console.log("a")
        this.setState({target:target});
    }

    deleteApartement(){
        const id = this.state.target.apartement.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.delete(`http://localhost:8000/delete-apartement/${id}`,data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link:"http://localhost:8000/ownedApartement",
                    apartements:[],
                    target:null,
                },()=>this.fetchMore());
            }
        }).catch(error => {
            console.log(error.response);
        })
    }

    handlePop() {
        if (this.state.target == null) return null;
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
                        <BigGreyText>Are you sure want to delete {this.state.target.apartement.name}?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={() => this.deleteApartement()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }
        }
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
                apartements:this.state.apartements.concat(response.data.apartements.data),
                link:response.data.apartements.next_page_url,
                isLoading : false
            });

            console.log(response.data);
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
        window.removeEventListener("scroll",()=>this.scrollFunction());
    }

    componentDidMount() {
        this.setState({isLoading:true});
        this.fetchMore();
        window.addEventListener("scroll",()=>this.scrollFunction());
    }

    render() {
        return (
            <Fragment>
                {this.handlePop()}
                <HeaderWrapper>
                    <CustomButtonWrapper>
                        <Link to={"/owner/manage-apartement/add-apartement"}>
                            <button>Add New Apartement</button>
                        </Link>
                    </CustomButtonWrapper>
                </HeaderWrapper>
                {this.state.apartements.map(
                    (item,key) => <ApartementOnManage key={item.id} data={item} setTarget={(target)=>this.setTarget(target)}/>
                )}
                {this.state.isLoading &&
                <InnerBeautyLoading style={{backgroundColor:"blue"}}/>
                }
                
            </Fragment>
        );
    }
}

export default ManageApartement;