import React, {Component} from 'react';
import styled from 'styled-components'
import {Link,withRouter} from "react-router-dom";

const AllWrapper = styled('div')`
  position: sticky;
  width: 200px;
  height: 100%;
  background-color: #00d4d3;
  display: flex;
  flex-direction: column;
  
  ${'a'}{
    height: 100%;
    color: white;
    text-decoration: none;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover{
        background-color: #1d93d1;
        color: aqua;
    }
  }
`

const Menu = styled('div')`
     display: flex;
     flex-direction: column;
     justify-content: center;
     height: 100%;
`

class AdminPanel extends Component {
    render() {
        return (
            <AllWrapper>
                <Link><Menu>Manage Post</Menu></Link>
                <Link><Menu>Manage Facility</Menu></Link>
                <Link to="/admin/manage-guest"><Menu>Manage Guest</Menu></Link>
                <Link><Menu>Manage Owner</Menu></Link>
                <Link><Menu>Manage Premium Product</Menu></Link>
                <Link><Menu>Manage Transaction</Menu></Link>
                <Link><Menu>Manage Reports</Menu></Link>
            </AllWrapper>
        );
    }
}

export default withRouter(AdminPanel);