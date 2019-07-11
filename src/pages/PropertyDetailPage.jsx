import React, {Component, Fragment} from 'react';
import styled from 'styled-components'
import {BACKENDLINK} from "../Define";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import UserVerificator from "../components/General/UserVerificator";
import HouseContentDetail from "../containers/PropertyDetail/HouseContentDetail";
import ApartementContentDetail from "../containers/PropertyDetail/ApartementContentDetail";
import Footer from "../containers/HomePage/Footer";
import {
    BigGreyText, BoldRed,
    MidButtonWrapper,
    PopHolder,
    PopMessager,
    PurePopMessager
} from "../components/General/CustomComponent";
import {InnerBeautyLoading} from "../components/General/BeautyLoading";
import {BeautyTextAreaOutlined, BeautyTomatoButton, CustomButtonWrapper} from "../components/General/BeautyComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {withRouter} from "react-router-dom";
import StarInput from "../components/General/StarInput";
import Reviews from "../components/General/Reviews";
import Kosts from "../components/CariPage/Kosts";

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

const CustomTextArea = styled('textarea')`
    width: 100%;
    height: 300px;
`

const ReviewWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  ${'div'}{
  text-align: center;
  padding: 10px;
  }
`

const WrapperFavourite = styled('div')`
  width: 100%;
  display: flex;
  overflow: auto;
`

class PropertyDetailPage extends Component {
    state={
        data :{},
        target:null,
        showMap:false,
        cleanliness:0,
        roomFacilities:0,
        publicFacilities:0,
        security:0,
        reviews: [],
        nextPage:null,
        prevPage:null,
        link : `${BACKENDLINK}showReviewBySlug/${this.props.match.params.slug}`,
        errors: [],
        recomends : [],
        tab:1,
    }

    fetchData(slug){
        const axios = require('axios');
        const token = localStorage.getItem('token');

        axios.get(`${BACKENDLINK}propertiesBySlug/${slug}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(response=>{
            console.log(response.data)

            this.setState({
                data: response.data.property,
                reviews:response.data.reviews,
                recomends:response.data.recomends

            },()=>{
                // this.forceUpdate();
            })

        }).catch(err=>{
            console.log(err.response)
            if(err.response.status===404){
                this.props.history.push("/")
            }
        });
    }

    fetchMore(slug){
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
            console.log(response.data);
            this.setState({
                reviews:response.data.reviews.data,
                nextPage:response.data.reviews.next_page_url,
                prevPage:response.data.reviews.prev_page_url,
                link:null
            });

        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);

        });
    }

    componentDidMount() {
        this.fetchData(this.props.match.params.slug);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.fetchData(nextProps.match.params.slug);
    }

    handlePropertyType(data){
        if(data.house!= null){
            return <HouseContentDetail data={data} setTarget={(target)=>this.setTarget(target)}/>
        }else if(data.apartement!= null){
            return <ApartementContentDetail data={data} setTarget={(target)=>this.setTarget(target)}/>
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

    reportProperty(e){
        e.preventDefault();
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');
        let id = this.state.data.id;
        let description = e.target.elements["description"].value;
        console.log(description);
        let data = {
            "token":token,
            "property_id" : id,
            headers: {
                Authorization: `Bearer ${token}`
            },
            "description" : description,
        }
        axios.post(`${BACKENDLINK}report-property`,data).then(response=>{
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
        }else if(this.state.target === "report"){
            return <PopHolder>
                <PurePopMessager>
                    <BigGreyText>Report Property</BigGreyText>
                    <form onSubmit={(e)=>this.reportProperty(e)}>
                        <h3>Description</h3>
                        <div>
                            <CustomTextArea name={"description"}/>
                        </div>

                        <MidButtonWrapper>
                            <BeautyTomatoButton type={"button"} onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </form>
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

    handleSubmit(e){
        e.preventDefault();
        this.setState({target:"loading"});

        let description = e.target.elements["description"].value;
        const axios = require('axios');

        let token = localStorage.getItem('token');

        axios.post(`${BACKENDLINK}reviews`,{
            description:description,
            cleanliness:this.state.cleanliness,
            room_facilities:this.state.roomFacilities,
            public_facilities:this.state.publicFacilities,
            security:this.state.security,
            target:this.state.data.id
        },{headers: {
                Authorization: `Bearer ${token}`
            }}).then(
            (response) => {
                // console.log(response)
                this.setState({target:null});
            }
        ).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            this.setState({
                target: null,
                errors:error.response.data.errors
            });
        });
    }

    handlePageChanger(){
        return <Fragment>

            {this.state.prevPage &&
            <CustomButtonWrapper>
                <button onClick={() => {
                    this.setState({link:this.state.prevPage},
                        ()=>{
                            this.fetchMore();
                        }
                    )
                }}>Prev Page</button>
            </CustomButtonWrapper>
            }
            {
                this.state.nextPage &&
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({link:this.state.nextPage},
                            ()=>{
                                this.fetchMore();
                            }
                        )
                    }}>Next Page</button>
                </CustomButtonWrapper>
            }
            {
                this.state.link &&
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({link:this.state.link},
                            ()=>{
                                this.fetchMore();
                            }
                        )
                    }}>View More</button>
                </CustomButtonWrapper>
            }
        </Fragment>
    }

    render() {
        return (
            <AllWrapper>
                {/*{console.log(this.state.data)}*/}
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
                    {this.handlePropertyType(this.state.data)}
                    <BigGreyText style={{textAlign:"center"}}>Review : {this.state.data.average}  <StarInput value={this.state.data.average} changeValue={(value)=>this.setState({a:value})}/></BigGreyText>
                    {this.state.reviews.map(
                        (item,key)=><Reviews key={item.id} data={item}/>
                    )}
                    {this.handlePageChanger()}

                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                        <div style={{fontWeight:"bold"}}>Add Review</div>
                        <ReviewWrapper>
                            <div>
                                <span>Cleanliness</span>
                                <StarInput value={this.state.cleanliness} changeValue={(value)=>this.setState({cleanliness:value})}/>
                                <BoldRed>{this.state.errors.cleanliness && this.state.errors.cleanliness[0]}</BoldRed>
                            </div>
                            <div>
                                <span>Room Facilities</span>
                                <StarInput value={this.state.roomFacilities} changeValue={(value)=>this.setState({roomFacilities:value})}/>
                                <BoldRed>{this.state.errors.room_facilities && this.state.errors.room_facilities[0]}</BoldRed>
                            </div>
                            <div>
                                <span>Public Facilities</span>
                                <StarInput value={this.state.publicFacilities} changeValue={(value)=>this.setState({publicFacilities:value})}/>
                                <BoldRed>{this.state.errors.public_facilities && this.state.errors.public_facilities[0]}</BoldRed>
                            </div>
                            <div>
                                <span>Security</span>
                                <StarInput value={this.state.security} changeValue={(value)=>this.setState({security:value})}/>
                                <BoldRed>{this.state.errors.security && this.state.errors.security[0]}</BoldRed>
                            </div>
                        </ReviewWrapper>
                        <div>Description</div>
                        {<BeautyTextAreaOutlined name={"description"}/>}
                        <BoldRed>{this.state.errors.description && this.state.errors.description[0]}</BoldRed>
                        {<CustomButtonWrapper>
                            <BeautyTomatoButton>Submit</BeautyTomatoButton>
                        </CustomButtonWrapper>}
                    </form>
                    {<BigGreyText style={{textAlign:"center"}}>Sugested</BigGreyText>}
                    <WrapperFavourite>
                        {this.state.recomends.map(
                            (item,key)=><Kosts key = {item.id} data = {item}/>
                        )
                        }

                    </WrapperFavourite>
                </MiddleContentWrapper>

                <Footer/>
            </AllWrapper>
        );
    }
}

export default withRouter(PropertyDetailPage)  ;

