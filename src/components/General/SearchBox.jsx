import React, {Component,Fragment} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from 'react-router-dom'

const AllWrapper = styled('div')`
background-color: white;
display: flex;
flex-direction: column;
justify-content: center;
margin: 5px 0;
width: 50%;
max-width: 300px;
border-radius: 4px;
&:hover{
color:green;
}

@media (max-width: 900px){
width: 100%;
margin: 5px 0 5px 10px;
}
`

const SearchField = styled('div')`
  cursor: text;
  display: flex;
`

const LeftSearchIcon = styled('span')`
 
 margin-left: 10px;

`

const SearchInput = styled('div')`
  display: inline;
  color: gray;
  margin-left: 10px;
`

class SearchBox extends Component {
    redirect(){
        this.props.history.push("/cari");
    }

    render() {
        return (
            <Fragment>
                {!this.props.isShowMobileNav &&
                <AllWrapper onClick={()=>this.redirect()}>
                    <SearchField>
                        <LeftSearchIcon><FontAwesomeIcon icon={faSearch}/></LeftSearchIcon>
                        <SearchInput>Cari sesuatu...</SearchInput>
                    </SearchField>
                </AllWrapper>
                }
            </Fragment>
        );
    }
}

const MapStateToProps = state => {
    return {
        isShowMobileNav : state.isShowMobileNav
    }
}
const MapDispatchToProps = dispatch => {
    return {
        toggleMobile : ()=>dispatch({type : "toggle-mobile"})
    }
}

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(SearchBox));