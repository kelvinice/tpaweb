import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components'
import {NavLink,withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faHistory,
    faHome,
    faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import {faCompass} from "@fortawesome/free-solid-svg-icons/faCompass";
import {faPhone} from "@fortawesome/free-solid-svg-icons/faPhone";


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
  top: 53px;
  width: 200px;
  height: 100%;
  min-height: 92vh;
  background-color: #ff6a42;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px){
    width: 80px;
    min-width: 80px;
  }
  
  ${'.active'}{
    background-color: #e44016;
    color: #ff9f99;
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
        background-color: #e44016;
        color: #ff9f99;
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


class OwnerPanel extends Component {
    render() {
        return (
            <AllWrapper>
                <NavLink to={"/owner/dashboard"}><Menu><span><span className={"hide-on-mobile"}>Dashboard </span><FontAwesomeIcon icon={faCompass}/></span></Menu></NavLink>
                <NavLink to={"/owner/manage-house"}><Menu><span><span className={"hide-on-mobile"}>Manage Rent House </span><FontAwesomeIcon icon={faHome}/></span></Menu></NavLink>
                <NavLink to={"/owner/manage-apartement"}><Menu><span><span className={"hide-on-mobile"}>Manage Apartement </span><FontAwesomeIcon icon={faBuilding}/></span></Menu></NavLink>
                <NavLink to={"/owner/chat"}><Menu><span><span className={"hide-on-mobile"}>Chat </span><FontAwesomeIcon icon={faMailBulk}/></span></Menu></NavLink>
                <NavLink to={"/owner/checkout"}><Menu><span><span className={"hide-on-mobile"}>Checkout Page </span><FontAwesomeIcon icon={faShoppingCart}/></span></Menu></NavLink>
                <NavLink to={"/owner/history-premium"}><Menu><span><span className={"hide-on-mobile"}>History Premium </span><FontAwesomeIcon icon={faHistory}/></span></Menu></NavLink>
                <NavLink to={"/owner/phone"}><Menu><span><span className={"hide-on-mobile"}>Manage Phone </span><FontAwesomeIcon icon={faPhone}/></span></Menu></NavLink>
            </AllWrapper>
        );
    }
}

export default OwnerPanel;