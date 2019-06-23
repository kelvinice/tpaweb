import React, {Component} from 'react';
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import styled from "styled-components";
import {BACKENDLINK} from "../Define";
import {connect} from "react-redux";
import moment from 'moment'
import 'moment/min/locales'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import ButtonFollow from "../components/OwnerManagePage/ButtonFollow";
import Kosts from "../components/CariPage/Kosts";

const AllWrapper = styled('div')`
width: 100%;
height: 100%;

`

const HeaderContext = styled('div')`
    padding: 10px;
    background-color: #eefdf6;
    box-sizing: border-box;
    width: 100%;
    font-weight: bolder;
    font-size: 20px;
    border-bottom: 1px solid rgba(193,193,193,0.69) ;
    margin: 0 auto;
    text-align: center;
`

const BodyContext = styled('div')`
  padding: 20px;
`

const BodyInner = styled('div')`
  width: 100%;
  margin: 0 auto;
  @media only screen and (max-width: 891px){
    width: 100%;
  }
`

const DetailWrapper = styled('div')`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  @media (min-width: 900px){
    width: 90%;
    margin: 20px auto;
  }
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(193,193,193,0.69) ;
`

const BigProfile = styled('div')`
  background-color: #d6d6d6;
  background-image: url('${props => (props.profile) ? "http://127.0.0.1:8000/storage/images/" + props.profile : "/assets/images/default-user-image.png"}');
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: inline-block;
`


const WrapperBottom = styled('div')`
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  ${Kosts} {
    background-color: #f0ffe8;
  }
`


class OwnerPage extends Component {
    state={
        user:{},
        followers:[],
        isFollow:null,
    }

    componentDidMount() {
        this.fetchFollow();
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let id = this.props.match.params.id;

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${BACKENDLINK}get-profile-data/${id}`,data).then(response=>{
            this.setState({user:response.data.user});
            console.log(response.data)
        }).catch(error => {
            console.log(error.response);
        })
    }

    onlineHandler(){
        moment.locale('id');
        let datediff = "Belum pernah login";
        if(this.state.user.last_login){
            datediff =moment(this.state.user.last_login,"YYYY-MM-DD hh:mm:ss").fromNow()
        }
        return <span style={{fontSize:"15px"}}>{datediff}</span>;
    }

    handleVerifikasi(){
        if(this.state.user.phone_verified_at){
            return <div style={{color:"#05b80f"}}><FontAwesomeIcon icon={faCheckCircle}/> Telepon sudah terverifikasi</div>
        }else{
            return <div style={{color:"#e64b4c"}}><FontAwesomeIcon icon={faTimesCircle}/> Telepon belum terverifikasi</div>
        }
    }

    fetchFollow(){
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let id = this.props.match.params.id;

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${BACKENDLINK}/get-followers/${id}`,data).then(response=>{
            this.setState({isFollow:response.data.is_follow,followers:response.data.followers});
            // console.log(response.data)
        }).catch(error => {
            console.log(error.response);
        })
    }

    updateFollow(followers,isFollow){
        this.setState({isFollow:isFollow,followers:followers});
    }

    render() {
        return (
            <AllWrapper>
                <UserVerificator onRef={ref => (this.userVerificator = ref)} roleOnly={1}/>
                <UserNavBar/>
                <BreadCrumbs/>
                <DetailWrapper>
                    <HeaderContext>
                        <div>Profile Detail</div>
                        <BigProfile profile={this.props.UserLogin ? this.props.UserLogin.picture_id : null}/>
                        <div>
                            <ButtonFollow target={this.props.match.params.id} updateFollow={(followers,isFollow)=>this.updateFollow(followers,isFollow)} text={!this.state.isFollow ?
                                "Follow" : "Following"
                            } />
                        </div>
                    </HeaderContext>
                    <BodyContext>
                        <BodyInner>
                            <div><b>Name</b> : {this.state.user.name}</div>
                            <div><b>Email</b> : {this.state.user.email}</div>
                            <div><b>Total Rent House</b> : {this.state.user.houses && this.state.user.houses.length}</div>
                            <div><b>Total Apartement</b> : {this.state.user.apartements && this.state.user.apartements.length}</div>
                            <div><b>Join Since</b> : {moment(this.state.user.created_at,"YYYY-MM-DD hh:mm:ss").fromNow()}</div>
                            <div><b>Total Followers</b> : {this.state.followers && this.state.followers.length}</div>
                            <div><b>Last Online</b> : {this.onlineHandler()}</div>
                            <div>{this.handleVerifikasi()}</div>
                        </BodyInner>
                    </BodyContext>
                    <WrapperBottom>
                        <HeaderContext>Rent House</HeaderContext>
                        {this.state.user.houses_10 && this.state.user.houses_10.map(
                            (item,key)=><Kosts key={item.id} data={item}/>
                        )}
                    </WrapperBottom>
                    <WrapperBottom>
                        <HeaderContext>Apartement</HeaderContext>

                        {this.state.user.apartements_10 && this.state.user.apartements_10.map(
                            (item,key)=><Kosts key={item.id} data={item}/>
                        )}

                    </WrapperBottom>
                </DetailWrapper>



                
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

export default connect(MapStateToProps,MapDispatchToProps)(OwnerPage);