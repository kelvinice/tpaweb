import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Redirect}from 'react-router-dom'
import BeautyLoading from "./BeautyLoading";

class UserVerificator extends Component {
    state = {
        alreadyFetch : false
    }

    noLoadingRefresh(){
        let token = localStorage.getItem('token');
        const axios = require('axios');

        axios.get(`http://localhost:8000/curr?token=${token}`,{
            headers:{
                'token':token
            }
        }).then((response) => {
            if(response.data.message==="success"){
                this.props.updateUserlogin(response.data.user)
            }else{
                // console.log("no login");
            }
            this.setState({alreadyFetch:true});
        }).catch((error)=>{
            console.log(error.response);
            this.setState({alreadyFetch:true});
        })
    }

    refresh() {
        this.setState({alreadyFetch:false});
        let token = localStorage.getItem('token');
        const axios = require('axios');

        axios.get(`http://localhost:8000/curr?token=${token}`,{
            headers:{
                'token':token
            }
        }).then((response) => {
            if(response.data.message==="success"){
                this.props.updateUserlogin(response.data.user)
            }else{
                // console.log("no login");
            }
            this.setState({alreadyFetch:true});
        }).catch((error)=>{
            console.log(error.response);
            this.setState({alreadyFetch:true});
        })
    }

    componentWillMount() {
        // if(this.props.UserLogin != null){
        //     this.setState({alreadyFetch:true});
        //     return;
        // }

        this.refresh();
    }

    componentDidMount() {
        if(this.props.onRef)
        this.props.onRef(this)
    }

    componentWillUnmount() {
        if(this.props.onRef)
        this.props.onRef(undefined)
    }

    handleRedirect(){
        if(this.state.alreadyFetch && this.props.noRedirect == null && (this.props.UserLogin == null ||
            (this.props.roleOnly && this.props.UserLogin.type !== this.props.roleOnly))){
            return <Redirect to="/"></Redirect>
        }else{
            return null;
        }
    }


    render() {
        return (
            <Fragment>
                {this.handleRedirect()}
                {!this.state.alreadyFetch ?
                    <BeautyLoading/>
                : null}
            </Fragment>
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

export default connect(MapStateToProps,MapDispatchToProps)(UserVerificator);