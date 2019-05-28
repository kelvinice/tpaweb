import React, {Component} from 'react';
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import { BeautyTomatoButton, GreenNavLinkWrapper} from "../components/General/BeautyComponent";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {connect} from "react-redux";
import GoodInput from "../components/General/GoodInput";
import {ErrorAlert, SuccessAlert} from "../components/General/Alerts";
import BreadCrumbs from "../components/General/BreadCrumbs";

const NavInfo = styled('div')`
  padding: 5px 10px;
  border-bottom: 1px solid darkgrey;
  box-sizing: border-box;
  font-family: "Titillium Web";
  @media only screen and (max-width: 891px){
    width: 100%;
  }
`

const AllWrapper = styled('div')`
    width: 100%;
    height: 100%;
    padding: 50px 100px;
    box-sizing: border-box;
    @media only screen and (max-width: 891px){
        padding: 10px 5px;
        width: 100%;
    }
`

const ContextWrapper = styled('div')`
  width: 80%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid darkgrey ;
  @media only screen and (max-width: 891px){
    width: 100%;
  }
`

const HeaderContext = styled('div')`
    padding: 10px;
    background-color: #eefdf6;
    box-sizing: border-box;
    width: 100%;
    font-weight: bolder;
    font-size: 20px;
`

const BodyContext = styled('div')`
  padding: 30px;
`

const BigProfile = styled('div')`
  background-image: url("/assets/images/default-user-image.png");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: 2px solid #bfbfbf;
  margin: 0 auto;
`

const BodyInner = styled('div')`
  width: 80%;
  margin: 0 auto;
  @media only screen and (max-width: 891px){
  width: 100%;
  }
`

const DefinedTable = styled('table')`
  width: 100%;
  ${"tr"}{
    width: 100%;
    @media only screen and (max-width: 891px){
        display: flex;
        flex-direction: column;
    }
   
    ${"td"}:last-child{
      width: 100%;
    }
    ${"td"}:first-child{
      padding: 10px;
      box-sizing: border-box;
      @media only screen and (min-width: 892px){
        white-space: nowrap;
      }
    }
  }
`

const Stared = styled('span')`
  &::after{
    content: "*";
    color: red;
  }
`

const Padder = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
  
  @media only screen and (max-width: 891px){
    flex-direction: column;
  }
  ${"button"}{
    width: 200px;
    margin-right: 30px;
    
    @media only screen and (max-width: 891px){
      width: 100%;
      margin-bottom: 10px;
    }
  }
`

class EditProfilPage extends Component {
    constructor(props){
        super(props);
        this.userVerificator = React.createRef()

    }
    state = {
        popMessage : null,
    }

    MessageChanger(event,message){
        if(event != null)
            event.preventDefault();
        if(event === null || event.target===event.currentTarget)
            this.setState({popMessage: message});

    }

    MessageHandler(){
        if(this.state.popMessage===null){
            return null;
        }else if(this.state.popMessage==="success-update"){
            return <SuccessAlert message="Success Update Profile" linkTo={"/user"} onClick={(event, message) => this.MessageChanger(event, null)}/>
        }else{
            return <ErrorAlert message={this.state.popMessage} onClick={(event, message) => this.MessageChanger(event, null)}/>
        }
    }

    onFormSubmit(e){
        e.preventDefault(e);

        let form = e.target;
        let name = form.elements["name"].value;
        // let phone = form.elements["phone"] ? form.elements["phone"].value : null;
        let phone = form.elements["phone"].value;
        let password = form.elements["password"].value;
        // console.log(name)
        const axios = require('axios');

        let token = localStorage.getItem('token');

        let data = {"token":token,"name" : name,"password":password,"phone":phone}
        console.log(data)
        // if(phone)
        //     data["phone"]=phone
        // // console.log(data)

        axios.patch('http://localhost:8000/updateprofile',data).then(
            (response) => {
                if(response.data.message === "success"){
                    this.userVerificator.refresh();
                    this.MessageChanger(null,"success-update");
                }else{
                    console.log("ini error:")
                    this.MessageChanger(null,response.data.message);
                }

            }
        ).catch((error) => {
            console.log("ini error:")
            console.log(error.response)
            if(error.response != null)
                this.MessageChanger(null,error.response.data.message);

        });
    }

    render() {
        return (
            <div>
                <UserVerificator onRef={ref => (this.userVerificator = ref)} />
                {this.MessageHandler()}

                <UserNavBar />

                <BreadCrumbs/>
                <AllWrapper>
                    <ContextWrapper>
                        <HeaderContext>
                            Data Pribadi
                        </HeaderContext>
                        <BodyContext>
                            <BigProfile/>
                            <br/>
                            <BodyInner>
                                <form id={"form-update-profile"} action="" onSubmit={this.props.UserLogin ? (e)=> this.onFormSubmit(e) : null}>
                                    <DefinedTable>
                                        <tbody>
                                            <tr>
                                                <td><Stared>Nama Lengkap</Stared></td>
                                                <td >
                                                    {this.props.UserLogin &&
                                                        <GoodInput autoFocus={true} value={this.props.UserLogin.name} type="text" name="name" required></GoodInput>
                                                    }
                                                </td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td><Stared>Jenis Kelamin</Stared></td>*/}
                                            {/*    <td>*/}
                                            {/*        <input type="radio" name="gender" value="male"/> Laki-Laki*/}
                                            {/*        <input type="radio" name="gender" value="female"/> Perempuan*/}
                                            {/*    </td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                            {/*    <td><Stared>Tanggal Lahir</Stared></td>*/}
                                            {/*    <td><BeautyInputOutlined type="date" name="date"></BeautyInputOutlined></td>*/}
                                            {/*</tr>*/}
                                            <tr>
                                                <td><Stared>No. Handphone Darurat</Stared></td>
                                                <td>
                                                    {this.props.UserLogin &&
                                                        <GoodInput value={this.props.UserLogin.phone ? this.props.UserLogin.phone : ""} type="number" name="phone"></GoodInput>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><Stared>Password</Stared></td>
                                                <td>
                                                    {this.props.UserLogin &&
                                                    <GoodInput value="" type="password" name="password"></GoodInput>
                                                    }
                                                </td>
                                            </tr>


                                        </tbody>
                                    </DefinedTable>
                                    <Padder >
                                        <Link to={"/user"}><BeautyTomatoButton type="reset">Cancel</BeautyTomatoButton></Link>
                                        <BeautyTomatoButton type="submit">Submit</BeautyTomatoButton>
                                    </Padder>
                                </form>
                            </BodyInner>

                           </BodyContext>

                    </ContextWrapper>

                </AllWrapper>

            </div>
        );
    }
}

const MapStateToProps = state => {
    return {
        isShowMobileNav : state.isShowMobileNav,
        UserLogin : state.UserLogin
    }
}
const MapDispatchToProps = dispatch => {
    return {
        toggleMobile : ()=>dispatch({type : "toggle-mobile"}),
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(EditProfilPage);