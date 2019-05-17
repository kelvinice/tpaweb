import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components'
import {Link,withRouter} from "react-router-dom";

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
  width: 200px;
  height: 100%;
  background-color: #69a1d4;
  display: flex;
  flex-direction: column;
  
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
    &:hover{
        background-color: #335eb3;
        color: #a0c3ff;
        ${'div'}{
          animation: ${rgb} 1500ms linear infinite;
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