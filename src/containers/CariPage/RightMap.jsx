import React, {Component} from 'react';
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {connect} from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const AllWrapper = styled('div')`
  width: 40vw;
  height: 90vh;
  right: 0;
  background-color: red;
  position: fixed;
  @media (max-width: 990px){
    display: none;
  }
`
var marker = {};
class RightMap extends Component {
    state = {
        zoom: 13,
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                this.props.updateCurrentPosition([position.coords.latitude,position.coords.longitude])

                this.map = L.map('map').setView([position.coords.latitude,position.coords.longitude], this.state.zoom)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(this.map)

                marker = L.marker([position.coords.latitude,position.coords.longitude])
                    .addTo(this.map)
                    .bindPopup('Your Location')
                this.map.on('click', (e)=>this.onMapClick(e))
            }.bind(this),()=>{
                this.map = L.map('map').setView(this.props.currentPosition, this.state.zoom)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(this.map)

                marker = L.marker(L.latLng(this.props.currentPosition))
                    .addTo(this.map)
                    .bindPopup('Your Location')
                this.map.on('click', (e)=>this.onMapClick(e))
            })
        }
    }

    onMapClick(e){
        if(marker)this.map.removeLayer(marker);
        marker = L.marker(L.latLng(e.latlng))
            .addTo(this.map)
            .bindPopup('Your Location')
        this.props.updateCurrentPosition([e.latlng.lat,e.latlng.lng])
        this.props.refreshFilter();
        // console.log(e.latlng)
    }

    render() {
        return (
            <AllWrapper id={"map"} />
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