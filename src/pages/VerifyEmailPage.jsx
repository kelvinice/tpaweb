import React, {Component} from 'react';
import {InnerBeautyLoading} from "../components/General/BeautyLoading";
import {ErrorAlert, SuccessAlert} from "../components/General/Alerts";

class VerifyEmailPage extends Component {
    state={
        popMessage : null
    }
    MessageChanger(event,message){
        if(event != null)
            event.preventDefault();
        if(event == null || event.target===event.currentTarget)
            this.setState({popMessage: message});
    }

    MessageHandler(){
        if(this.state.popMessage===null){
            return null;
        }else if(this.state.popMessage==="loading") {
            return <InnerBeautyLoading></InnerBeautyLoading>
        }else if(this.state.popMessage==="success"){
            return <SuccessAlert message="Email Berhasil Diverifikasi" linkTo="/" onClick={(event, message) => this.MessageChanger(event, null)}/>
        }else{
            return <ErrorAlert message={this.state.popMessage} onClick={(event, message) => this.MessageChanger(event, null)}/>
        }
    }

    componentDidMount() {
        const axios = require('axios');
        if(this.props==null || this.props.match==null || this.props.match.params.id == null){
            this.MessageChanger(null,"Something is missing")
            return;
        }
        let id = this.props.match.params.id;

        axios.post(`http://localhost:8000/verifyemail/${id}`,{
        }).then((response) => {
            // console.log("ini sukses")
            // console.log(response.data.message)
            this.MessageChanger(null,response.data.message)

        }).catch((error)=>{
            // console.log("ini error")
            console.log(error.response)
            this.MessageChanger(null,error.response.data.message)
        })
    }

    render() {
        return (
            <div>
                {this.MessageHandler()}
            </div>
        );
    }
}

export default VerifyEmailPage;