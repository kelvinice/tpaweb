import React, {Component} from 'react';
import styled, {keyframes} from "styled-components";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faHistory,
    faMailBulk,
} from "@fortawesome/free-solid-svg-icons";

const shine = keyframes`
    from {
        opacity: 0;
        left: 0;
        background-color: white;
    }
    50% {
        opacity: 0.5;
    }
    to {
        opacity: 0;
        left: 100%;
        background-color: transparent;
    }
`

const AllWrapper = styled('div')`
  position: sticky;
  top: 50px;
  width: 200px;
  height: 100%;
  min-height: 92vh;
  background-color: #00ab41;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px){
    width: 80px;
    min-width: 80px;
  }
  
  ${'.active'}{
    background-color: #006e19;
    color: #a2ffd9;
    ${"div"}{
        &:after{
          content: '';
          position: absolute;
          width: 100%;
          
          animation: ${shine} 1s linear;
          height: 80px;
        }
    }
  }
  
  ${'a'}{
    height: 80px;
    color: white;
    text-decoration: none;
    width: 100%;
    
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover,&:focus-within,&:active{
        background-color: #006e19;
        color: #a2ffd9;
        ${"div"}{
            &:after{
              content: '';
              position: absolute;
              width: 100%;
              
              animation: ${shine} 1s linear;
              height: 80px;
            }
        }
    }
  }
`

const Menu = styled('div')`
     display: flex;
     flex-direction: column;
     justify-content: center;
     height: 100%;
     border-bottom: 2px solid #bfbfbf;
`

class HistoryPanel extends Component {
    render() {
        return (
            <AllWrapper>
                <NavLink to={"/history/view"}><Menu><span><span className={"hide-on-mobile"}>View </span><FontAwesomeIcon icon={faHistory}/></span></Menu></NavLink>
                <NavLink to={"/history/favourite"}><Menu><span><span className={"hide-on-mobile"}>Favourite </span><FontAwesomeIcon icon={faHeart}/></span></Menu></NavLink>
                <NavLink to={"/history/chat"}><Menu><span><span className={"hide-on-mobile"}>Chat </span><FontAwesomeIcon icon={faMailBulk}/></span></Menu></NavLink>
            </AllWrapper>
        );
    }
}

export default HistoryPanel;
