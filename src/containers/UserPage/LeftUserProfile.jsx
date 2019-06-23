import React, {Component} from 'react';
import styled from 'styled-components'
import {OutlineButton} from "../../components/General/BeautyComponent";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const BigProfile = styled('div')`
  
  // background-image: url('${props => (props.UserLogin) ? props.UserLogin.picture_id : "red"}');
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
  width: 40%;
  @media only screen and (max-width: 990px){
    text-align: center;
    padding: 0 0;
    width: 100%;
  }
`
const HeaderWrapper = styled('div')`
  display: flex;
  @media only screen and (max-width: 990px){
    flex-direction: column;
    justify-content: center;
  }
`

const LeftHeader = styled('div')`
  width: 50%;
  @media only screen and (max-width: 990px){
    width: 100%;
  }
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
  ${"a"}{
      text-decoration: none;
      color: black;
  }
`

const Menu = styled('div')`
  padding: 10px;
  box-sizing: border-box;
    ${"span"}{
        &:first-child{
          margin: 5px 20px 5px 0
        }
    }
    color: #7a7a7a;
  cursor: pointer;
`

class LeftUserProfile extends Component {
    handleProfilePicture(){
        if(this.props.UserLogin && this.props.UserLogin.picture_id != null)
            return  <BigProfile style={{backgroundImage:"url(http://127.0.0.1:8000/storage/images/"+this.props.UserLogin.picture_id+")"}}/>;
        else return <BigProfile style={{backgroundImage:"url(/assets/images/default-user-image.png)"}}/>;
    }

    render() {
        return (
            <AllWrapper>
                <HeaderWrapper>
                    <LeftHeader>
                        {this.handleProfilePicture()}
                    </LeftHeader>
                    <RightHeader>

                        <TitleName>{this.props.UserLogin ? this.props.UserLogin.name : "Name"}</TitleName>
                        <Link to="/user/edit-profil"><OutlineButton style={{width:"100%"}}>Edit Profile</OutlineButton></Link>
                        <Link to="/user/edit-foto"><OutlineButton style={{width:"100%"}}>Edit Photo</OutlineButton></Link>
                    </RightHeader>
                </HeaderWrapper>
                <MenuList>
                    <Menu>
                        <span role="img" aria-label="home">🏠</span>
                        <span>Kos Saya</span>
                    </Menu>
                    <Menu>
                        <span role="img" aria-label="Booking">📃</span>
                        <span>Booking</span>
                    </Menu>
                    <Link to={"/user/verifikasi-akun"}>
                    <Menu>
                        <span role="img" aria-label="Akun">✔</span>
                        <span>Verifikasi Akun</span>
                    </Menu>
                    </Link>
                    <Menu>
                        <span role="img" aria-label="Identitas">📄</span>
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