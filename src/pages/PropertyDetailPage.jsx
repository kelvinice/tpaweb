import React, {Component} from 'react';
import styled from 'styled-components'
import {BACKENDLINK} from "../Define";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import UserVerificator from "../components/General/UserVerificator";
import HouseContentDetail from "../containers/PropertyDetail/HouseContentDetail";
import ApartementContentDetail from "../containers/PropertyDetail/ApartementContentDetail";
import Footer from "../containers/HomePage/Footer";
import {BigGreyText, MidButtonWrapper, PopHolder, PurePopMessager} from "../components/General/CustomComponent";
import {InnerBeautyLoading} from "../components/General/BeautyLoading";
import {BeautyTomatoButton} from "../components/General/BeautyComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

const AllWrapper  =styled('div')`
width: 100%;
height: 100%;
`

const HeaderWrapper = styled('div')`
height: 68vh;
width: 100%;
display: flex;
flex-direction: column;
@media (max-width: 900px){
  height: 50vh;
}

 ${'#map'}{
      width:100%;
      height: 100%;
      z-index:1;
      @media (max-width: 900px){
        width: 100%;
        height:300px;
      }
      margin: 0 auto;
  }
`

const BigPicture = styled('div')`
width: 100%;
height: 100%;
background-color: #e2e2e2;
background-image:${props => props.pictures_id == null ? "url('/assets/images/house-grey.svg');" : "url(" + BACKENDLINK + "storage/images/" + props.pictures_id + ");"};
background-repeat: no-repeat;
//background-size: cover;
background-position: center;
`

const BanWrapper = styled('div')`
  font-size: 160px;
  color: red;
  margin:0 auto;
`

const MiddleContentWrapper =styled('div')`
@media (min-width: 900px){
padding: 50px 100px;
}
`

const MenuButton = styled('div')`
display: flex;
justify-content: center;
width: 100%;
`

const CustomBlackButton = styled('button')`
width: 200px;
height: 50px;
outline: none;
color: white;
text-align: center;
font-size: 20px;
box-shadow: none;
&:hover{
background-color: #3b9123;
}
cursor: pointer;
background-color: #57b739;
border-radius:  0  0 10px 10px;
border: none;
margin: 0 10px;
@media (max-width: 900px){
margin: 0 2px;
width: 100%;
}
`

class PropertyDetailPage extends Component {
    state={
        data :{},
        target:null,
        showMap:false,
    }

    fetchData(){
        const axios = require('axios');
        axios.get(`${BACKENDLINK}propertiesBySlug/${this.props.match.params.slug}`).then(response=>{
            // console.log(response.data)

            this.setState({data: response.data.property})

        }).catch(err=>{
            console.log(err.response)
            if(err.response.status===404){
                this.props.history.push("/")
            }
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    handlePropertyType(){
        if(this.state.data.house!= null){
            return <HouseContentDetail data={this.state.data} setTarget={(target)=>this.setTarget(target)}/>
        }else if(this.state.data.apartement!= null){
            return <ApartementContentDetail data={this.state.data} setTarget={(target)=>this.setTarget(target)}/>
        }else{
            return null;
        }
    }

    setTarget(target){
        this.setState({target:target});
    }

    banProperty(){
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');
        let id = this.state.data.id;

        let data = {"token":token,"id" : id, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.post(`${BACKENDLINK}ban-property/${id}`,data).then(response=>{
            console.log(response);
            if(response.data.message==="success") {
                this.setState({
                    target: null,
                }, () => this.fetchData());
            }

        }).catch(error => {
            console.log(error.response);
        })
    }

    handlePop(){
        if(this.state.data.status === 1){
            return <PopHolder>
                <PurePopMessager>
                    <BigGreyText>This Property already Been Banned!</BigGreyText>
                    <BanWrapper><FontAwesomeIcon icon={faTimesCircle}/></BanWrapper>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={()=>this.props.history.goBack()}>Okay...</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PurePopMessager>
            </PopHolder>
        }else if (this.state.target == null) return null;
        else if (this.state.target === "loading") {
            return <PopHolder>
                <PurePopMessager>
                    <InnerBeautyLoading/>
                </PurePopMessager>
            </PopHolder>
        } else if (this.state.target === "banned") {
            return <PopHolder>
                <PurePopMessager>
                    <BigGreyText>Are you sure want to ban this Property?</BigGreyText>
                    <MidButtonWrapper>
                        <BeautyTomatoButton onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>
                        <BeautyTomatoButton onClick={() => this.banProperty()}>Confirm</BeautyTomatoButton>
                    </MidButtonWrapper>
                </PurePopMessager>
            </PopHolder>
        }
    }

    handleHeader(){
        if(this.state.showMap){
            return <Map id={"map"} center={[this.state.data.latitude,this.state.data.longitude]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={[this.state.data.latitude,this.state.data.longitude]}>
                    <Popup>
                        {this.state.data.address}
                    </Popup>
                </Marker>
            </Map>
        }else{
            return <BigPicture pictures_id={this.state.data.pictures_id}/>
        }
    }


    render() {
        return (
            <AllWrapper>
                {console.log(this.state.data)}
                {this.handlePop()}
                <UserVerificator noRedirect={true}/>
                <UserNavBar/>
                <BreadCrumbs/>
                <HeaderWrapper>
                    {this.handleHeader()}
                    <MenuButton>
                        <CustomBlackButton onClick={()=>this.setState({showMap:false})}>Photo</CustomBlackButton>
                        <CustomBlackButton onClick={()=>this.setState({showMap:true})}>Map</CustomBlackButton>
                    </MenuButton>
                </HeaderWrapper>
                <MiddleContentWrapper>
                    {this.handlePropertyType()}
                </MiddleContentWrapper>
                <Footer/>
            </AllWrapper>
        );
    }
}

export default PropertyDetailPage;

