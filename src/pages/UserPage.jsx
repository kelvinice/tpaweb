import React, {Component} from 'react';
import UserNavBar from "../containers/UserPage/UserNavBar";
import {Route,Link,Switch} from 'react-router-dom'
import UserVerificator from "../components/General/UserVerificator";
import styled from 'styled-components'
import {GreenNavLinkWrapper} from "../components/General/BeautyComponent";
import NotFoundPage from "./NotFoundPage";
import LeftUserProfile from "../containers/UserPage/LeftUserProfile";
import RightUserVerifikasi from "../containers/UserPage/RightUserVerifikasi";
import {ErrorAlert, SuccessAlert} from "../components/General/Alerts";
import {InnerBeautyLoading} from "../components/General/BeautyLoading";
import RightUserEditFoto from "../containers/UserPage/RightUserEditFoto";

const WrapperPops = styled('div')`
    position:fixed;
    text-align: center;
    z-index:10;
    width: 100%;
    background-color: rgba(0,0,0,0.6) !important;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const Poper = styled('div')`
    background-color:white;
    width:300px;
    margin:auto auto;
    border-radius: 5px;
    line-height: 1.8;
    padding: 20px;
    box-sizing:border-box;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`

const NavInfo = styled('div')`
  padding: 5px 10px;
  border-bottom: 1px solid darkgrey;
  box-sizing: border-box;
  font-family: "Titillium Web";
`

const UserProfile = styled('div')`
    width: 100%;
    display: flex;
     @media only screen and (max-width: 990px){
      flex-direction: column;
    }
`

const RightUserProfile = styled('div')`
  width: 100%;
`


const AllWrapper = styled('div')`
    width: 100%;
    height: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
    @media only screen and (max-width: 891px){
        padding: 10px 5px;
        width: 100%;
    }
`

const ContextWrapper = styled('div')`
  width: 90%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid rgba(193,193,193,0.69) ;
  
`

const HeaderContext = styled('div')`
    padding: 10px;
    background-color: #eefdf6;
    box-sizing: border-box;
    width: 100%;
    font-weight: bolder;
    font-size: 20px;
    border-bottom: 1px solid rgba(193,193,193,0.69) ;
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

class UserPage extends Component {
    constructor(props){
        super(props);
        this.userVerificator = React.createRef()

    }

    state = {
        headerTitle : "Data Pribadi",
        popMessage : null
    }

    setTitle(title){
        this.setState({headerTitle:title});
    }

    MessageChanger(event,message){
        if(event != null)
            event.preventDefault();
        if(event == null || event.target===event.currentTarget){
            this.setState({popMessage: message});
        }
    }

    MessageHandler(){
        if(this.state.popMessage===null){
            return null;
        }else if(this.state.popMessage==="loading") {
            return <WrapperPops>
                <Poper>
                    <InnerBeautyLoading/>
                </Poper>
            </WrapperPops>
        }else if(this.state.popMessage==="success"){
            return <SuccessAlert message="Email Verifikasi Berhasil dikirimkan" onClick={(event, message) => this.MessageChanger(event, null)}/>
        }else if(this.state.popMessage==="success-change-picture"){
            return <SuccessAlert linkTo="/user" message="Foto Profil berhasil diganti" onClick={(event, message) => this.MessageChanger(event, null)}/>
        }else{
            return <ErrorAlert message={this.state.popMessage} onClick={(event, message) => this.MessageChanger(event, null)}/>
        }
    }

    noLoadingRefresh(){
        this.userVerificator.noLoadingRefresh();
    }

    render() {
        return (
            <div>
                <UserVerificator onRef={ref => (this.userVerificator = ref)} />
                {this.MessageHandler()}

                <UserNavBar />

                <NavInfo><GreenNavLinkWrapper><Link to="/">Home</Link></GreenNavLinkWrapper> > User</NavInfo>
                <UserProfile>
                    <LeftUserProfile/>
                    <RightUserProfile>
                        <AllWrapper>
                            <ContextWrapper>
                                <HeaderContext>
                                    {this.state.headerTitle}
                                </HeaderContext>
                                <BodyContext>
                                    <BodyInner>
                                        <Switch>
                                            <Route path={`${this.props.match.url}/`} render={(props)=> <RightUserVerifikasi {...props} MessageChanger={(event,message)=> this.MessageChanger(null,message)} setTitle={(title)=>this.setTitle(title)} />} exact />
                                            <Route path={`${this.props.match.url}/verifikasi-akun`} render={(props)=> <RightUserVerifikasi {...props} MessageChanger={(event,message)=> this.MessageChanger(null,message)} setTitle={(title)=>this.setTitle(title)} />} exact />
                                            <Route path={`${this.props.match.url}/edit-foto`} render={(props)=> <RightUserEditFoto {...props} MessageChanger={(event,message)=> this.MessageChanger(null,message)} setTitle={(title)=>this.setTitle(title)} refresh={()=>this.noLoadingRefresh()} />} exact />
                                            <Route component={NotFoundPage}></Route>
                                        </Switch>
                                    </BodyInner>

                                </BodyContext>

                            </ContextWrapper>

                        </AllWrapper>


                    </RightUserProfile>
                </UserProfile>

            </div>
        );
    }
}



export default (UserPage);