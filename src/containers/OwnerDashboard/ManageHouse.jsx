import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {BeautyTomatoButton, CustomButtonWrapper} from "../../components/General/BeautyComponent";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import HouseOnManage from "../../components/OwnerManagePage/HouseOnManage";
import {
    BigGreyText,
    HeaderWrapper,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";

class ManageHouse extends Component {
    constructor(props){
        super(props);
        this.scrollFunction = this.scrollFunction.bind(this); //bind function once
    }

    state = {
        houses : [],
        popState : null,
        target : null,
        link : "http://localhost:8000/ownedHouse",
        isLoading : false,
        innerLoading : false,
        errors: {},
    }

    setTarget(target){
        this.setState({target:target});
    }

    deleteHouse(){
        const id = this.state.target.house.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.delete(`http://localhost:8000/delete-house/${id}`,data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link:"http://localhost:8000/ownedHouse",
                    houses:[],
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
                        <BigGreyText>Are you sure want to delete {this.state.target.house.name}?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={() => this.deleteHouse()}>Confirm</BeautyTomatoButton>
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
            if(this.state.houses=== undefined || this.state.houses===null)
                this.setState({
                    houses:response.data.houses.data,
                    link:response.data.houses.next_page_url,
                    isLoading : false
                });
            else{
                this.setState({
                    houses:this.state.houses.concat(response.data.houses.data),
                    link:response.data.houses.next_page_url,
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
        this.setState({isLoading:true});
        this.fetchMore();
        window.addEventListener("scroll",this.scrollFunction);
    }

    render() {
        return (
            <Fragment>
                {this.handlePop()}
                <HeaderWrapper>
                    <CustomButtonWrapper>
                        <Link to={"/owner/manage-house/add-house"}>
                            <button>Add New Kost</button>
                        </Link>
                    </CustomButtonWrapper>
                </HeaderWrapper>
                {this.state.houses.map(
                    (item,key) => <HouseOnManage key={item.id} data={item} setTarget={(target)=>this.setTarget(target)}/>
                )}
                {this.state.isLoading &&
                <InnerBeautyLoading style={{backgroundColor:"blue"}}/>
                }
            </Fragment>
        );
    }
}

export default ManageHouse;