import React, {Component, Fragment} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import styled from 'styled-components'
import {connect} from "react-redux";
import {
    BeautyInputOutlined,
    BeautyInputWrapper,
    BeautyTextAreaOutlined,
    BeautyTomatoButton,
    BeautySelectInputOutlined, BeautySelectInput, CustomButtonWrapper
} from "../../components/General/BeautyComponent";
import {Link} from "react-router-dom";

const AllWrapper =styled('div')`
  width: 100%;
  height: 100%;
  ${'#map'}{
      width:80%;
      height:500px;
      z-index:1;
      @media (max-width: 900px){
        width: 100%;
        height:300px;
      }
      margin: 0 auto;
  }
  box-sizing: border-box;
  @media (min-width: 889px){
    padding: 30px;
  }
`

const HeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
`


class AddHouse extends Component {
    state = {
        page:0,
        map:{
            zoom: 13
        },
        mapAddress:"",
        address:"",
        city:"",
        description:"",
        additionalInformation:"",
        roomLeft:1,
        genderType:0,
        name:"",
        parkingFacilities:0,
        pictures:null,
        bannerPicture:null,
        picture360:null,
        video:null,
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position) =>{
                this.props.updateCurrentPosition([position.coords.latitude,position.coords.longitude])
            })
        }
    }

    onMapClick(e){
        this.props.updateCurrentPosition([e.latlng.lat,e.latlng.lng])
        const axios = require('axios');
        axios.get(`https://us1.locationiq.com/v1/reverse.php?key=899758dd3d8f41&lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`)
            .then(response =>{
                this.setState({mapAddress:response.data.display_name})
            })
    }



    inputChanged(e){
        // eslint-disable-next-line default-case
        console.log(e.target)
        switch (e.target.name) {
            case "name":
                this.setState({name:e.target.value});
                break;
            case "address":
                this.setState({address:e.target.value});
                break;
            case "city":
                this.setState({city:e.target.value});
                break;
            case "description":
                this.setState({description:e.target.value});
                break;
            case "additionalInformation":
                this.setState({additionalInformation:e.target.value});
                break;
            case "roomLeft":
                this.setState({roomLeft:e.target.value});
                break;
            case "genderType":
                this.setState({genderType:e.target.value});
                break;
            case "parkingFacilities":
                this.setState({parkingFacilities:e.target.value});
                break;
            case "pictures":
                this.setState({pictures:e.target.files[0]});
                break;
            case "bannerPicture":
                this.setState({bannerPicture:e.target.files[0]});
                break;
            case "picture360":
                this.setState({picture360:e.target.files[0]});
                break;
            case "video":
                this.setState({video:e.target.files[0]});
                break;
        }
    }

    handlePageContent(){
        if(this.state.page===0){
            return <Fragment>
                <Map id={"map"} center={this.props.currentPosition} zoom={this.state.map.zoom} onClick={(e)=>this.onMapClick(e)}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={this.props.currentPosition}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
                <BeautyInputWrapper>
                    Location :
                    <BeautyInputOutlined value={this.state.mapAddress} readOnly={true} style={{backgroundColor:"#d7d7d7"}}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Address
                    <BeautyInputOutlined name={"address"} value={this.state.address} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    City
                    <BeautyInputOutlined name={"city"} value={this.state.city} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>
            </Fragment>
        }else if(this.state.page===1){
           return <Fragment>
               <BeautyInputWrapper>
                   Name
                   <BeautyInputOutlined name={"name"} value={this.state.name} onChange={(e)=>this.inputChanged(e)}/>
               </BeautyInputWrapper>

               <BeautyInputWrapper>
                   Description
                   <BeautyTextAreaOutlined name={"description"} value={this.state.description} onChange={(e)=>this.inputChanged(e)}/>
               </BeautyInputWrapper>

               <BeautyInputWrapper>
                   Additional Information
                   <BeautyInputOutlined name={"additionalInformation"} value={this.state.additionalInformation} onChange={(e)=>this.inputChanged(e)}/>
               </BeautyInputWrapper>

           </Fragment>
        }else if(this.state.page===2){
            return <Fragment>

                <BeautyInputWrapper>
                    Banner Picture
                    <BeautyInputOutlined type={"file"} name={"bannerPicture"} onChange={(e)=>this.inputChanged(e)}/>
                    {/*style={{color:"transparent"}}*/}
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Pictures
                    <BeautyInputOutlined type={"file"} name={"pictures"} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Picture 360
                    <BeautyInputOutlined type={"file"} name={"picture360"} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Video
                    <BeautyInputOutlined type={"file"} name={"video"} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Parking Facilities
                    <BeautySelectInputOutlined name={"parkingFacilities"} value={this.state.parkingFacilities} onChange={(e)=>this.inputChanged(e)}>
                        <option value="0">Mobil dan Motor</option>
                        <option value="1">Mobil</option>
                        <option value="2">Motor</option>
                        <option value="3">Tidak ada</option>
                    </BeautySelectInputOutlined>
                </BeautyInputWrapper>


            </Fragment>
        }else if(this.state.page===3){
            return <Fragment>
                <BeautyInputWrapper>
                    Room Facilities
                    <BeautyInputOutlined />
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Public Facilities
                    <BeautyInputOutlined />
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Room Left
                    <BeautyInputOutlined name={"roomLeft"} value={this.state.roomLeft} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Gender Type
                    <BeautySelectInputOutlined name={"genderType"} value={this.state.genderType} onChange={(e)=>this.inputChanged(e)}>
                        <option value="0">Semua</option>
                        <option value="1">Campur</option>
                        <option value="2">Khusus Putra</option>
                        <option value="3">Khusus Putri</option>
                        <option value="4">Putra dan Campur</option>
                        <option value="5">Putri dan Campur</option>
                    </BeautySelectInputOutlined>
                </BeautyInputWrapper>

                <br/>

            </Fragment>
        }else{
            return null;
        }
    }

    handlePageChanger(){
        return <Fragment>
            <HeaderWrapper>
                {this.state.page > 0 &&
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({page:(this.state.page - 1)*-1},
                            ()=>{
                                this.setState({page:(this.state.page)*-1});
                            }
                        )
                    }}>Prev Page</button>
                </CustomButtonWrapper>
                }
                {this.state.page < 3 ?
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({page:(this.state.page + 1)*-1},
                            ()=>{
                                this.setState({page:(this.state.page)*-1});
                            }
                        )
                    }}>Next Page</button>
                </CustomButtonWrapper> :
                    <BeautyTomatoButton>Submit</BeautyTomatoButton>
                }
            </HeaderWrapper>
        </Fragment>
    }

    render() {
        return (
            <AllWrapper>
                {this.handlePageContent()}
                {this.handlePageChanger()}
            </AllWrapper>

        );
    }
}

const MapStateToProps = state => {
    return {
        currentPosition : state.currentPosition
    }
}
const MapDispatchToProps = dispatch => {
    return {
        updateCurrentPosition : (key)=>dispatch({type : "updateCurrentPosition",value:key})
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(AddHouse);