import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect}from 'react-router-dom'

class UserVerificator extends Component {
    state = {
        alreadyFetch : false
    }

    componentDidMount() {
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
                console.log("no login");
            }
            this.setState({alreadyFetch:true});
        }).catch((error)=>{
            console.log(error.response);
            this.setState({alreadyFetch:true});
        })
    }

    render() {
        return (
            <div>
                {(this.state.alreadyFetch && this.props.UserLogin == null) ? <Redirect to="/"></Redirect> : null}
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

export default connect(MapStateToProps,MapDispatchToProps)(UserVerificator);