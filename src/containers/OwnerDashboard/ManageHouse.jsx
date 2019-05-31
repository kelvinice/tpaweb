import React, {Component, Fragment} from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {CustomButtonWrapper} from "../../components/General/BeautyComponent";


const HeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
`


class ManageHouse extends Component {
    render() {
        return (
            <Fragment>
                <HeaderWrapper>
                    <CustomButtonWrapper>
                        <Link to={"/owner/add-house"}>
                            <button>Add New Kost</button>
                        </Link>
                    </CustomButtonWrapper>

                </HeaderWrapper>



            </Fragment>
        );
    }
}

export default ManageHouse;