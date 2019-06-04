import React, {Component,Fragment} from 'react';
import styled from "styled-components";
import {BeautyTomatoButton, CustomButtonWrapper} from "../../components/General/BeautyComponent";
import {Link} from "react-router-dom";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import ApartementOnManage from "../../components/OwnerManagePage/ApartementOnManage";

const HeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
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
@media (max-width: 900px){
flex-direction: column;
    ${'button'}{
      margin: 5px 0;
    }
}
`

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
                        <Link to={"/owner/add-apartement"}>
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