import React, { Component } from 'react'
import styled from 'styled-components'

const WrapperPops = styled('div')`
    position:fixed;
    top:10%;
    text-align: center;
    width:100%;
`

const Poper = styled('div')`
    background-color:white;
    width:25%;
    margin:0 auto;
    border-radius: 5px;
    line-height: 1.8;
    padding: 20px;
    box-sizing:border-box;
`

class LoginPopup extends Component{
    render(){
        return(
            <WrapperPops>
                <Poper>
                    
                    Masuk<br/>
                    Login<br/>
                </Poper>
               
            </WrapperPops>
        )
    }

}

export default LoginPopup;