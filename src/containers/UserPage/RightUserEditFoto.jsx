import React, {Component} from 'react';
import {BeautyInputOutlined, BeautyTomatoButton} from "../../components/BeautyComponent";
import styled from 'styled-components'
import {connect} from "react-redux";

const ButtonWrapper = styled('div')`
width: 50%;
height: 100%;
padding: 30px;
margin: 0 auto;
box-sizing: border-box;
@media only screen and (max-width: 900px){
width: 100%;
}

`

class RightUserEditFoto extends Component {
    componentDidMount() {
        this.props.setTitle("Edit Photo");
    }

    editSubmit(event){
        event.preventDefault();
        this.props.MessageChanger(null,"loading")
        const axios = require('axios');
        let token = localStorage.getItem('token');
        let form = event.target;
        let foto = form.elements["foto"].files[0];


        let formData = new FormData();
        formData.append('foto',foto);
        formData.append('token',token);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post("http://localhost:8000/editProfilePicture", formData,config).then(
            (response)=>{
                this.props.MessageChanger(null,"success-change-picture")
                this.props.refresh()
                // let user = [...this.props.UserLogin];
                // console.log(user)
                // user.picture_id = user.id+"."+foto.name.substr(foto.name.lastIndexOf('.') ).split('.')[1];
                //
                //
                // this.props.updateUserlogin(user)
                // console.log(this.props.UserLogin)

            }
        ).catch(error => {
            console.log(error.response);
            this.props.MessageChanger(null,error.response)
        });
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={(event => this.editSubmit(event))}>
                    <BeautyInputOutlined type={"file"} name={"foto"} autoFocus/>
                    <ButtonWrapper>
                        <BeautyTomatoButton>Save</BeautyTomatoButton>
                    </ButtonWrapper>
                </form>

            </div>
        );
    }
}

const MapStateToProps = state => {
    return {
        UserLogin : state.UserLogin
    }
}
const MapDispatchToProps = dispatch => {
    return {
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(RightUserEditFoto);