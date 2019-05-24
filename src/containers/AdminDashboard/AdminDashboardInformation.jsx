import React, {Component} from 'react';
import styled from "styled-components";

const AllWrapper = styled('div')`
  background-color: #86befb;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 5px;
  @media (min-width: 900px){
    box-sizing: border-box;
  }
`

class AdminDashboardInformation extends Component {
    render() {
        return (
            <AllWrapper>
                Total User :
            </AllWrapper>
        );
    }
}

export default AdminDashboardInformation;