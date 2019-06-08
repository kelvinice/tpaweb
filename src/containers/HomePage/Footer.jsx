import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom'
import {GreenNavLinkWrapper} from "../../components/General/BeautyComponent";

const LogoImages = styled('div')`
  background-image: url("assets/images/logo_barbarkos_green.png");
  width: 310px;
  height: 52px;
  background-position: center;
  background-size: cover;
  margin: 0 auto;
`

const Centerer = styled('div')`
    text-align: center;
    width: 100%;
    
`

const FaceBookLogo = styled('div')`
  background-image: url("/assets/images/facebook.png");
  width: 60px;
  height: 60px;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
`

const TwitterLogo = styled('div')`
  background-image: url("/assets/images/twitter.png");
  width: 60px;
  height: 60px;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
`

const InstagramLogo = styled('div')`
  background-image: url("/assets/images/instagram.png");
  width: 60px;
  height: 60px;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
`

class Footer extends Component {

    render() {
        return (
            <Centerer>
                {/*TODO*/}
                <LogoImages></LogoImages>
                <div>Dapatkan "info kost murah" hanya di Barbarkos App. </div>
                <div>Mau "Sewa Kost Murah"?</div>
                <div  style={{fontWeight:"bolder",fontSize:"13px"}}>Download BarbarKos App Sekarang</div>

                <GreenNavLinkWrapper><Link to="#"> Tentang Kami</Link></GreenNavLinkWrapper>
                |
                <GreenNavLinkWrapper><Link to="#"> Promosikan Kost Anda - GRATIS </Link></GreenNavLinkWrapper>
                |
                <GreenNavLinkWrapper><Link to="#"> Kebijakan Privasi </Link></GreenNavLinkWrapper>
                <br/>

                <FaceBookLogo /><TwitterLogo/><InstagramLogo/>
                <div style={{marginBottom:"20px"}}><span role="img" aria-label="mail">📧</span> saran@barbarkos.com <span role="img" aria-label="phone">📞</span> 0878-7773-6663</div>

            </Centerer>
        );
    }
}

export default Footer;