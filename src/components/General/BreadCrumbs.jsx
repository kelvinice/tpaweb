import {Link,withRouter} from "react-router-dom";
import {GreenNavLinkWrapper} from "./BeautyComponent";
import React,{Component} from "react";
import styled from "styled-components";


const NavInfo = styled('div')`
  padding: 5px 10px;
  border-bottom: 1px solid darkgrey;
  box-sizing: border-box;
  font-family: "Titillium Web";
  width: 100%;
  ${'a'}{
      ${'p'}{
        margin: 0; 
        padding: 0;
      }
      ${'p'}::first-letter{
        text-transform: uppercase;
        
      }
 
  }
`

class BreadCrumbs extends Component {
    static capitalize_Words(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    handleLink(){
        const links = [];
        let url = '';
        let location = this.props.location.pathname;
        let r = location.split("/");

        links.push(
            <span key={url}>
                <GreenNavLinkWrapper>
                    <Link to="/"><p>Home</p></Link>
                </GreenNavLinkWrapper>
            </span>
        )

        for(let i=1;i<r.length;i++){
            url+='/'+r[i];
            links.push(
                <span key={url}>
                    <span style={{fontWeight:"bold",color:"#123300"}}> > </span>
                    <GreenNavLinkWrapper>
                        <Link to={url}><p>{BreadCrumbs.capitalize_Words(r[i].replace(/[\W_]+/g," "))}</p></Link>
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