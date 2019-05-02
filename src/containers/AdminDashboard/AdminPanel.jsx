import React, {Component} from 'react';
import styled from 'styled-components'
import {Link,withRouter} from "react-router-dom";

const AllWrapper = styled('div')`
  width: 100%;
  background-color: #00d4d3;
  display: flex;
  ${'a'}{
    color: white;
    text-decoration: none;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover{
        background-color: #1d93d1;
        color: aqua;
    }
  }
`

const Menu = styled('div')`
 
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