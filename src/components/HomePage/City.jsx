import React, {Component} from 'react';
import styled from "styled-components";
import {withRouter} from 'react-router-dom'

const Super = styled('div')`
  padding: 0 5px;
`

const Wrap = styled('div')`
 
  //height: 60px;

  padding: 2rem;
  margin: 1rem 0;
  display: flex;
  
  justify-content: space-between;
  flex-direction: column;
 border: none;
  //cursor: pointer;
      transition: all .3s cubic-bezier(.25,.8,.25,1);
  &:hover,&:focus{
    ${'div'}{
    color: #005d00;
    }
    outline: 0;
    @media (min-width: 992px){
        box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
      }
  }
  
`


const RightName = styled('div')`
  height: 100%;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: bolder;
  color: #00983d;
  text-transform: uppercase;
  font-size: 20px;
`

const ApartementWrapper = styled('div')`
display: flex;
flex-direction: column;

`

const ApartementDiv = styled('div')`
&:hover{
cursor: pointer;
font-weight: bold;
}
`

class City extends Component {
    render() {
        return (
            <Super>
                <Wrap>
                    <RightName>{this.props.data.name}</RightName>
                    <ApartementWrapper >
                        {this.props.data.apartemens.map(
                            (item,key)=><ApartementDiv key={item.id} onClick={()=>this.props.history.push(`/detail/${item.slug}`)}>
                                Apartement {item.name}
                            </ApartementDiv>
                        )}
                    </ApartementWrapper>

                </Wrap>
            </Super>
        );
    }
}

export default withRouter(City);