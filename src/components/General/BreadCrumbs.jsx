import {Link,withRouter} from "react-router-dom";
import {GreenNavLinkWrapper} from "./BeautyComponent";
import React,{Component} from "react";
import styled from "styled-components";

const NavInfo = styled('div')`
  padding: 5px 10px;
  border-bottom: 1px solid darkgrey;
  box-sizing: border-box;
  font-family: "Titillium Web";
`

class BreadCrumbs extends Component {
    handleLink(){
        const links = [];
        let url = '';
        let location = this.props.location.pathname;
        console.log(this.props)
        let r = location.split("/");

        links.push(
            <span>
                <GreenNavLinkWrapper>
                    <Link to="/">Home</Link>
                </GreenNavLinkWrapper>
            </span>
        )

        for(let i=1;i<r.length;i++){
            url+='/'+r[i];
            links.push(
                <span>
                    <span> > </span>
                    <GreenNavLinkWrapper>
                        <Link to={url}>{r[i]}</Link>
                    </GreenNavLinkWrapper>
                </span>
            )
        }
        return links;
    }

    render() {
        return <NavInfo>
            {this.handleLink()}
        </NavInfo>;
    }
}

export default withRouter(BreadCrumbs);