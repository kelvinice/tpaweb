import React, {Component} from 'react';
import Echo from "laravel-echo";
import {BeautyInputOutlined, BeautyTomatoButton} from "../../components/General/BeautyComponent";

class OwnerChat extends Component {
    state={
        message:"",
        channelID:"",
    }

    connection(){
        window.io = require('socket.io-client')

        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'http://127.0.0.1:6001'
        })
    }

    live_chat(channelID){
        window.Echo.channel('chat.'+channelID).listen('MessageSend',e=>{
            console.log(e);
        })

        this.setState({channelID,})
    }

    async componentWillMount() {
        await this.connection();
        this.live_chat('5e4c9ce5-3b34-36ba-8a00-a07be6ee8c80');
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
    }


    handleSubmit(e){
        e.preventDefault();
        const url = `http://127.0.0.1:8000/sendMessage/${this.state.channelID}`;
        const data = {
            message: this.state.message,
        }
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const axios = require('axios')

        axios.post(url,data,config).then((response=>{
            console.log(response)
        }));

    }

    render() {
        return (
            <div>
                OwnerChat
                <form action="" onSubmit={(e)=>this.handleSubmit(e)}>
                    <label htmlFor="">Message</label>
                    <BeautyInputOutlined type="text" value={this.state.message} name={"message"} onChange={(e)=>this.handleChange(e)}/>
                    <br/><br/>
                    <BeautyTomatoButton>Send</BeautyTomatoButton>

                </form>

            </div>
        );
    }
}

export default OwnerChat;