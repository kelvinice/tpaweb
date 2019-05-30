import React, {Component} from 'react';
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {connect} from "react-redux";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const AllWrapper = styled('div')`
  ${'#map'}{
      width: 40vw;
      height: 90vh;
      right: 0;
      position: fixed;
      @media (max-width: 990px){
        display: none;
      }
  }
`
var marker = {};
class RightMap extends Component {
    state = {
        zoom: 13,
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
        this.props.refreshFilter();
        // console.log(e.latlng)
    }

    render() {
        return (
            <AllWrapper>
            <Map id={"map"} center={this.props.currentPosition} zoom={13} onClick={(e)=>this.onMapClick(e)}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={this.props.currentPosition}>
                    <Popup>
                        Your Location
                    </Popup>
                </Marker>
            </Map>
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

export default connect(MapStateToProps,MapDispatchToProps)(RightMap);