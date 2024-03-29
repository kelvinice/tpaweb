import React, {Component,Fragment} from 'react';
import {BACKENDLINK} from "../../Define";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {
    BeautyInputOutlined,
    BeautyInputWrapper,
    BeautySelectInputOutlined, BeautyTextAreaOutlined, BeautyTomatoButton, CustomButtonWrapper
} from "../../components/General/BeautyComponent";
import FacilityCard from "../../components/OwnerManagePage/FacilityCard";
import {connect} from "react-redux";
import styled from "styled-components";

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

const CardWrapper =styled('div')`
display: flex;
justify-content: center;
flex-wrap: wrap;
`

class AddApartement extends Component {
    state = {
        page:0,
        city_list:[],
        map:{
            zoom: 13
        },
        dataPublicFacilities:[],
        dataRoomFacilities:[],
        publicFacilities:[],
        roomFacilities:[],
        mapAddress:"",
        address:"",
        city:2,
        description:"",
        additionalInformation:"",
        condition:1,
        type:1,
        furnished:1,
        floor:1,
        unit:0,
        name:"",
        parkingFacilities:0,
        pictures:null,
        bannerPicture:null,
        picture360:null,
        video:null,
        price:0,
        area:0
    }

    fetchCity(){
        const axios = require('axios');
        axios.get(`${BACKENDLINK}cities`).then(response=>{
            this.setState({city_list:response.data.cities});
        });
    }

    componentDidMount() {
        this.fetchCity();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position) =>{
                this.props.updateCurrentPosition([position.coords.latitude,position.coords.longitude])
                const axios = require('axios');
                axios.get(`https://us1.locationiq.com/v1/reverse.php?key=899758dd3d8f41&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
                    .then(response =>{
                        this.setState({mapAddress:response.data.display_name})
                    })
            })
        }
        const axios = require('axios');
        axios.get(`${BACKENDLINK}room-facilities`).then(response=>{
            this.setState({dataRoomFacilities:response.data.facilities})
        })
        axios.get(`${BACKENDLINK}public-facilities`).then(response=>{
            this.setState({dataPublicFacilities:response.data.facilities})
        })


    }

    onMapClick(e){
        this.props.updateCurrentPosition([e.latlng.lat,e.latlng.lng])
        const axios = require('axios');
        axios.get(`https://us1.locationiq.com/v1/reverse.php?key=899758dd3d8f41&lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`)
            .then(response =>{
                this.setState({mapAddress:response.data.display_name})
            })
    }

    inputFileChanged(e){
        this.setState({[e.target.name]:e.target.files[0]});
    }

    inputChanged(e){
        this.setState({[e.target.name]:e.target.value});
    }

    formSubmit(){
        let token = localStorage.getItem('token');
        const axios = require('axios');

        let formData = new FormData();
        // console.log(this.state.publicFacilities)
        formData.append('publicFacilities',JSON.stringify(this.state.publicFacilities));
        formData.append('roomFacilities',JSON.stringify(this.state.roomFacilities));
        formData.append('latitude',this.props.currentPosition[0]);
        formData.append('longitude',this.props.currentPosition[1]);
        formData.append('name',this.state.name);
        formData.append('address',this.state.address);
        formData.append('city_id',this.state.city);
        formData.append('description',this.state.description);
        formData.append('additionalInformation',this.state.additionalInformation);
        formData.append('condition',this.state.condition);
        formData.append('type',this.state.type);
        formData.append('furnished',this.state.furnished);
        formData.append('floor',this.state.floor);
        formData.append('parkingFacilities',this.state.parkingFacilities);
        formData.append('pictures',this.state.pictures);
        formData.append('bannerPicture',this.state.bannerPicture);
        formData.append('picture360',this.state.picture360);
        formData.append('video',this.state.video);
        formData.append('price',this.state.price);
        formData.append('area',this.state.area);
        formData.append('unit',this.state.unit);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${BACKENDLINK}insertApartement`, formData,config).then(response=>{
            console.log(response)
        }).catch(error => {
            console.log(error.response)
        })
    }

    clickFacility(target){
        if(target.group===1){
            let idx = this.state.publicFacilities.indexOf(target.id)
            if(idx===-1)
                this.setState({publicFacilities:this.state.publicFacilities.concat(target.id)})
            else{
                let f = this.state.publicFacilities;
                f.splice(idx,1);
                this.setState({publicFacilities:f})
            }
        }else{
            let idx = this.state.roomFacilities.indexOf(target.id)
            if(idx===-1)
                this.setState({roomFacilities:this.state.roomFacilities.concat(target.id)})
            else{
                let f = this.state.roomFacilities;
                f.splice(idx,1);
                this.setState({roomFacilities:f})
            }
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
                    <BeautySelectInputOutlined name={"city"} value={this.state.city} onChange={(e)=>this.inputChanged(e)}>
                        {this.state.city_list.map(
                            (data,key)=> <option key={data.id} value={data.id}>{data.name}</option>
                        )}


                    </BeautySelectInputOutlined>
                    {/*<BeautyInputOutlined name={"city"} value={this.state.city} onChange={(e)=>this.inputChanged(e)}/>*/}
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
                    <BeautyInputOutlined type={"file"} name={"bannerPicture"} onChange={(e)=>this.inputFileChanged(e)}/>
                    {/*style={{color:"transparent"}}*/}
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Pictures
                    <BeautyInputOutlined type={"file"} name={"pictures"} onChange={(e)=>this.inputFileChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Picture 360
                    <BeautyInputOutlined type={"file"} name={"picture360"} onChange={(e)=>this.inputFileChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Video
                    <BeautyInputOutlined type={"file"} name={"video"} onChange={(e)=>this.inputFileChanged(e)}/>
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
                    <CardWrapper>
                        {this.state.dataRoomFacilities.map(
                            (item,key)=><FacilityCard key = {item.id} data = {item} onClick={(item)=>this.clickFacility(item)} isActive={this.state.roomFacilities.indexOf(item.id)}/>
                        )}
                    </CardWrapper>

                </BeautyInputWrapper>
                <BeautyInputWrapper>
                    Public Facilities
                    <CardWrapper>
                        {this.state.dataPublicFacilities.map(
                            (item,key)=><FacilityCard key = {item.id} data = {item} onClick={(item)=>this.clickFacility(item)} isActive={this.state.publicFacilities.indexOf(item.id)}/>
                        )}
                    </CardWrapper>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Floor
                    <BeautyInputOutlined name={"floor"} value={this.state.floor} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Unit Left
                    <BeautyInputOutlined name={"unit"} value={this.state.unit} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Type
                    <BeautySelectInputOutlined name={"type"} value={this.state.type} onChange={(e)=>this.inputChanged(e)}>
                        <option value="1">Single room</option>
                        <option value="2">Campur</option>
                    </BeautySelectInputOutlined>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Condition
                    <BeautySelectInputOutlined name={"condition"} value={this.state.condition} onChange={(e)=>this.inputChanged(e)}>
                        <option value="1">Good</option>
                        <option value="2">Not Good</option>
                    </BeautySelectInputOutlined>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Furnish
                    <BeautySelectInputOutlined name={"furnished"} value={this.state.furnished} onChange={(e)=>this.inputChanged(e)}>
                        <option value="1">Furnished</option>
                        <option value="2">Not furnished</option>
                    </BeautySelectInputOutlined>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Price
                    <BeautyInputOutlined name={"price"} value={this.state.price} type={"number"} onChange={(e)=>this.inputChanged(e)}/>
                </BeautyInputWrapper>

                <BeautyInputWrapper>
                    Area
                    <BeautyInputOutlined name={"area"} value={this.state.area} type={"number"} onChange={(e)=>this.inputChanged(e)}/>
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
                    <BeautyTomatoButton onClick={()=>this.formSubmit()}>Submit</BeautyTomatoButton>
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

export default connect(MapStateToProps,MapDispatchToProps)(AddApartement);
