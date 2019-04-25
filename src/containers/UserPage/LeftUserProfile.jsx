import React, {Component} from 'react';
import styled from 'styled-components'
import {OutlineButton} from "../../components/BeautyComponent";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const BigProfile = styled('div')`
  background-image: url("/assets/images/default-user-image.png");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: inline-block;
`

const AllWrapper = styled('div')`
  padding: 30px 70px;
  box-sizing: border-box;
  width: 50%;
`
const HeaderWrapper = styled('div')`
  display: flex;
`

const LeftHeader = styled('div')`
  width: 40%;
`

const RightHeader = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  box-sizing: border-box;
`

const TitleName = styled('span')`
    color: #484848;
    font-size: 1.3em;
    font-weight: 700;
`

const MenuList = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Menu = styled('div')`
  padding: 10px;
box-sizing: border-box;

`

const Emoticon = styled('span')`
  margin: 5px 10px 5px 0px;
`


class LeftUserProfile extends Component {
    render() {



        return (
            <AllWrapper>
                <HeaderWrapper>
                    <LeftHeader>
                        <BigProfile/>
                    </LeftHeader>
                    <RightHeader>
                        <TitleName>{this.props.UserLogin ? this.props.UserLogin.name : "Name"}</TitleName>
                        <Link to="/user/edit-profil"><OutlineButton> Edit Profil </OutlineButton></Link>
                    </RightHeader>
                </HeaderWrapper>
                <MenuList>
                    <Menu>
                        <Emoticon role="img" aria-label="home">🏠</Emoticon>
                        <span>Kos Saya</span>
                    </Menu>
                    <Menu>
                        <Emoticon role="img" aria-label="Booking">📃</Emoticon>
                        <span>Booking</span>
                    </Menu>
                    <Menu>
                        <Emoticon role="img" aria-label="Akun">✔</Emoticon>
                        <span>Verifikasi Akun</span>
                    </Menu>
                    <Menu>
                        <Emoticon role="img" aria-label="Identitas">📄</Emoticon>
                        <span>Verifikasi Identitas</span>
                    </Menu>
                </MenuList>
            </AllWrapper>
        );
    }
}


const MapDispatchToProps = dispatch => {
    return {
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

const MapStateToProps = state => {
    return {
        UserLogin : state.UserLogin
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(LeftUserProfile);