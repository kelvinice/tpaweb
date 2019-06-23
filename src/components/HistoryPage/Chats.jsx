import React, {Component} from 'react';
import styled from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {withRouter} from 'react-router-dom'
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

const AllWrapper = styled('div')`
width: 100%;
height: 80px;
display: flex;
margin-bottom: 5px;
cursor: pointer;
box-sizing: border-box;
justify-content: center;
flex-direction: row;
@media (max-width: 900px){
flex-direction: column;
height: 120px;
}
`

const IdentityWrapper = styled('div')`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
flex-direction: column;
text-align: center;
font-size: 20px;
color: white;
//overflow-y: hidden;
box-sizing: border-box;

`

const SymbolArrowWrapper = styled('div')`
width: 80px;
height: 100%;
background-image: linear-gradient(to right, #6bc159, #ea6e55);
min-width: 80px;
justify-content: center;
display: flex;
flex-direction: column;
color: whitesmoke;
font-size: 30px;
@media (max-width: 900px){
display: none;
}
`

const SymbolArrowWrapperMini = styled('div')`
width: 100%;
background-image: linear-gradient(to bottom, #6bc159, #ea6e55);
min-width: 80px;
justify-content: center;
display: flex;
color: whitesmoke;
font-size: 30px;
@media (min-width: 900px){
display: none;
}
`

class Chats extends Component {
    handlePush(){
        if(this.props.reversed){
            this.props.history.push(`/owner/chat/${this.props.data.id}`);
        }else{
            this.props.history.push(`/history/chat/${this.props.data.id}`);
        }
    }

    render() {
        return (
            <AllWrapper onClick={()=>this.handlePush()}>
                {/*{console.log(this.props)}*/}
                <IdentityWrapper style={{backgroundColor:"#6bc159"}}>
                    {this.props.data.guest.name}
                </IdentityWrapper>
                <SymbolArrowWrapper>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </SymbolArrowWrapper>
                <SymbolArrowWrapperMini>
                    <FontAwesomeIcon icon={faArrowDown}/>
                </SymbolArrowWrapperMini>
                <IdentityWrapper style={{backgroundColor:"#ea6e55"}}>
                    {this.props.data.owner.name}
                </IdentityWrapper>

            </AllWrapper>
        );
    }
}

export default withRouter(Chats);