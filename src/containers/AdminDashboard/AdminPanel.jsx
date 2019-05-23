import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components'
import {NavLink,withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMailBulk, faMale, faMedal, faPaperclip, faTools, faUser} from "@fortawesome/free-solid-svg-icons";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import {faCompass} from "@fortawesome/free-solid-svg-icons/faCompass";

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

const rgb = keyframes`
0%{border-bottom: 3px solid #a0c3ff;border-top: 3px solid #a0c3ff;}
20%{border-bottom: 5px solid #4675ff;;border-top: 5px solid #4675ff;}
40%{border-bottom: 10px solid #ba3fff;;border-top: 10px solid #ba3fff;}
60%{border-bottom: 5px solid #982fa9;;border-top: 5px solid #982fa9;}
80%{border-bottom: 3px solid #b193ff;;border-top: 3px solid #b193ff;}
100%{border-bottom: 3px solid #b193ff;;border-top: 3px solid #b193ff;}
`
const AllWrapper = styled('div')`
  position: sticky;
  top: 50px;
  width: 200px;
  height: 100%;
  min-height: 92vh;
  background-color: #69a1d4;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px){
    width: 80px;
    min-width: 80px;
  }
  
  ${'.active'}{
    background-color: #335eb3;
    color: #a0c3ff;
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
        background-color: #335eb3;
        color: #a0c3ff;
        ${"div"}{
            &:after{
              content: '';
              position: absolute;
              width: 100%;
              
              animation: ${shine} 1s linear;
              height: 80px;
            }
        }
        
        // ${'div'}{
        //   animation: ${rgb} 1500ms linear infinite;
        // }
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

class AdminPanel extends Component {
    render() {
        return (
            <AllWrapper>
                <NavLink to={"/admin/dashboard"}><Menu><span><span className={"hide-on-mobile"}>Dashboard </span><FontAwesomeIcon icon={faCompass}/></span></Menu></NavLink>
                <NavLink to={"/admin/manage-post"}><Menu><span><span className={"hide-on-mobile"}>Manage Post </span><FontAwesomeIcon icon={faMailBulk}/></span></Menu></NavLink>
                <NavLink to={"/admin/manage-facility"}><Menu><span><span className={"hide-on-mobile"}>Manage Facility </span><FontAwesomeIcon icon={faTools}/></span></Menu></NavLink>
                <NavLink to={"/admin/manage-guest"}><Menu><span><span className={"hide-on-mobile"}>Manage Guest </span><FontAwesomeIcon icon={faUser}/></span></Menu></NavLink>
                <NavLink to={"/admin/manage-owner"}><Menu><span><span className={"hide-on-mobile"}>Manage Owner </span><FontAwesomeIcon icon={faMale}/></span></Menu></NavLink>
                <NavLink to={"/admin/manage-premium"}><Menu><span><span className={"hide-on-mobile"}>Manage Premium Product </span><FontAwesomeIcon icon={faMedal}/></span></Menu></NavLink>
                <NavLink to={"/admin/manage-transaction"}><Menu><span><span className={"hide-on-mobile"}>Manage Transaction </span><FontAwesomeIcon icon={faShoppingCart}/></span></Menu></NavLink>
                <NavLink to={"/admin/manage-report"}><Menu><span><span className={"hide-on-mobile"}>Manage Reports </span><FontAwesomeIcon icon={faPaperclip}/></span></Menu></NavLink>
            </AllWrapper>
        );
    }
}

export default withRouter(AdminPanel);