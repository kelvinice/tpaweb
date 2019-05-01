import React, {Component} from 'react';
import styled from 'styled-components'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet\\dist\\leaflet.css'

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

class RightMap extends Component {
    state = {
        position : [51.505, -0.09]
    }

    render() {
        return (
            <AllWrapper>
                <Map center={this.state.position} zoom={13} style={{height:"100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {/*<Marker position={this.state.position}>*/}
                    {/*    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>*/}
                    {/*</Marker>*/}
                </Map>
            </AllWrapper>
        );
    }
}

export default RightMap;