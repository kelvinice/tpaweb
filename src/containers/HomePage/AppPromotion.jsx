import React, {Component} from 'react';
import styled from 'styled-components'
import {BeautyGreenTitle,BeautyInputWrapper,OutlineButton} from '../../components/General/BeautyComponent';

const BodyWrapper = styled('div')`
  display: flex;
  width: 100%;
`

const LeftImage = styled('div')`
  width: 50%;
  height: 500px;
  background-image: url("/assets/images/smartphone.png");
  background-size: auto;
  background-position: center;
  padding: 0 150px;
  box-sizing: border-box;
  background-repeat: no-repeat;
`

const RightWrapper = styled('div')`
  width: 50%;
  text-align: left;
`

const GoogleLogo = styled('div')`
  background-image: url("/assets/images/download_gplay.png");
  width: 140px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  margin: 6px;
`

const AppleLogo = styled('div')`
  background-image: url("/assets/images/download_ios.png");
  width: 140px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  margin: 6px;
`

const Inputs = styled('input')`
  background-color: white;
  padding: 12px 100px 12px 10px;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #b0b0b0;
  margin-right: 30px;
  &::placeholder{
   color: #c7c1c7;
  }
  &:focus{
  border: 1px solid green;
  }
 
`


class AppPromotion extends Component {
    render() {
        return (
            <BodyWrapper className="hide-on-mobile" id="app-download">
                <LeftImage/>
                <RightWrapper>
                    <BeautyGreenTitle style={{fontSize:"34px",textAlign:"unset"}}>Barbarkos - Aplikasi Pencari Info Kost No 1 Di Indonesia</BeautyGreenTitle>
                    <div style={{fontSize:"24px"}}>Aplikasi tersedia di</div>
                    <GoogleLogo/><AppleLogo/>
                    <br/>
                    <div>Kirimkan link download aplikasi ke Handphone saya</div>
                    <br/>
                    <form action="#" id="formapp">
                    <div style={{display:"flex",width:"100%"}}>
                        <BeautyInputWrapper>
                            <div>Kirim lewat Email<span style={{color:"red"}}> *</span></div>
                            <Inputs placeholder="email@domain.com" type="email" name="email" required></Inputs>
                        </BeautyInputWrapper>
                        <BeautyInputWrapper>
                            <div>Kirim lewat SMS</div>
                            <Inputs placeholder="08123456xxx" name="phone" type="tel" minlength="6" maxlength="13" pattern="^0(\d{3,4}-?){2}\d{3,4}$"></Inputs>
                        </BeautyInputWrapper>

                    </div>
                    <br/>
                    <OutlineButton type="submit" form="formapp">Kirim Sekarang</OutlineButton>
                    </form>
                </RightWrapper>


            </BodyWrapper>
        );
    }
}

export default AppPromotion;