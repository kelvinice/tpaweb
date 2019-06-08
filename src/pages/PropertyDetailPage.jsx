import React, {Component} from 'react';
import styled from 'styled-components'
import {BACKENDLINK} from "../Define";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import UserVerificator from "../components/General/UserVerificator";
import HouseContentDetail from "../containers/PropertyDetail/HouseContentDetail";
import ApartementContentDetail from "../containers/PropertyDetail/ApartementContentDetail";
import Footer from "../containers/HomePage/Footer";

const AllWrapper  =styled('div')`
width: 100%;
height: 100%;
`

const HeaderWrapper = styled('div')`
height: 68vh;
width: 100%;
@media (max-width: 900px){
  height: 50vh;
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

const MiddleContentWrapper =styled('div')`
@media (min-width: 900px){
padding: 50px 100px;
}
`

class PropertyDetailPage extends Component {
    state={
        data :{}
    }

    componentDidMount() {
        const axios = require('axios');
        axios.get(`${BACKENDLINK}propertiesBySlug/${this.props.match.params.slug}`).then(response=>{
            console.log(response.data)
            this.setState({data:response.data.property})
        }).catch(err=>{
            console.log(err.response)
            if(err.response.status===404){
                this.props.history.push("/")
            }
        });
    }

    handlePropertyType(){
        if(this.state.data.house!= null){
            return <HouseContentDetail data={this.state.data}/>
        }else if(this.state.data.apartement!= null){
            return <ApartementContentDetail data={this.state.data}/>
        }else{
            return null;
        }

    }

    render() {
        return (
            <AllWrapper>
                <UserVerificator noRedirect={true}/>
                <UserNavBar/>
                <BreadCrumbs/>
                <HeaderWrapper>
                    <BigPicture pictures_id={this.state.data.pictures_id}/>
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

