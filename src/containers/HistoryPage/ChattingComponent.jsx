import React, {Component} from 'react';
import Echo from "laravel-echo";
import {BACKENDLINK} from "../../Define";
import {BeautyInputOutlined, BeautyTomatoButton} from "../../components/General/BeautyComponent";
import styled from 'styled-components'
import {connect} from "react-redux";

const Bulletin = styled('div')`
height: 50vh;
width: 100%;
background-color: #5dabdf;
overflow-x: hidden;
max-width: 100%;
`

const GreenMessage = styled('div')`
background-color: chartreuse;
color: black;
max-width: 60%;
padding: 5px 8px;
box-sizing: border-box;
border-radius: 20px;
height: 100%;
word-break: break-word;
white-space: normal;
`

const WhiteMessage = styled('div')`
background-color: white;
color: black;
max-width: 60%;
padding: 5px 8px;
box-sizing: border-box;
border-radius: 20px;
height: 100%;
word-break: break-word;
white-space: normal;
`

const ChatWrapper = styled('div')`
display: flex;
width: 100%;
justify-content: ${props=>props.isRight && "flex-end"};
padding: 5px 3px;
box-sizing: border-box;
`


class ChattingComponent extends Component {
    state={
        message:"",
        messages : [],
    }

    connection(){
        window.io = require('socket.io-client')

        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'http://127.0.0.1:6001'
        })
    }

    fetchChat(){
        const axios = require('axios');
        let token = localStorage.getItem('token');
        let id = this.props.match.params.id;

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${BACKENDLINK}getAllChatInChannel/${id}`,data).then(response=>{
            // console.log(response.data);
            this.setState({messages:response.data.chats},()=>this.handleBulletin())
            // this.setState({channels:response.data.channels})
        }).catch(error => {
            console.log(error.response);
        })
    }

    live_chat(channelID){
        window.Echo.channel(`chat.${channelID}`).listen('MessageSend',e=>{
            this.setState({messages:this.state.messages.concat({message:e.message,sent_time:e.time.date,sender:e.sender.id})})
            // console.log(e);
        })

        // this.setState({channelID,})
    }

    componentWillMount() {
        this.fetchChat()
       this.connection();
        this.live_chat(this.props.match.params.id);
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
    }

    handleSubmit(e){
        e.preventDefault();
        const url = `${BACKENDLINK}/sendMessage/${this.props.match.params.id}`;

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
            // console.log(response.data);
            this.setState({message:""})

        })).catch(error => {
            console.log(error.response);
        });
    }

    handleMessage(item,key){
        if(this.props.UserLogin.id===item.sender) {
            return <ChatWrapper key={item.sent_time+item.message+Math.random()} isRight={true}>
                <GreenMessage>
                    {item.message}
                </GreenMessage>
            </ChatWrapper>
        }
        else{
            return <ChatWrapper key={item.sent_time+item.message+Math.random()} >
                <WhiteMessage >
                    {item.message}
                </WhiteMessage>
            </ChatWrapper>
        }
    }

    handleBulletin(){
        if(document.getElementById("bulletin")){
            let b = document.getElementById("bulletin");
            b.scrollTop = b.scrollHeight+100;
        }
    }

    render() {
        return (
            <div>

                <Bulletin id={"bulletin"}>
                    {this.state.messages.map(
                        (item,key)=> this.handleMessage(item,key)
                    )}
                </Bulletin>
                <span style={{display:"none"}}>{setTimeout(()=>this.handleBulletin(),1)}</span>
                <form action="" onSubmit={(e)=>this.handleSubmit(e)}>
                    <BeautyInputOutlined type="text" value={this.state.message} name={"message"} onChange={(e)=>this.handleChange(e)}/>
                    <BeautyTomatoButton>Send</BeautyTomatoButton>
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

export default connect(MapStateToProps,MapDispatchToProps)(ChattingComponent);