import React, {Component} from 'react';
import styled from 'styled-components'

const Super = styled('div')`
  padding: 0 15px;
`

const Wrap = styled('div')`
  width: 180px;
  height: 60px;
  display: flex;
  padding: 2rem;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
 
  border-style: solid;
  border-width: 0px 1px 1px 1px;
  border-color: rgba(191,191,191,0.63);
  border-radius: 7px;
  cursor: pointer;
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

const LeftImage = styled('img')`
  width: 42px;
  background-size: cover;
  background-position: center;
  height: 100%;
  vertical-align: middle;
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

class Kota extends Component {
    render() {
        return (
            <Super>
                <Wrap>
                    <LeftImage src={this.props.image}/>
                    <RightName>{this.props.name}</RightName>

                </Wrap>
            </Super>

        );
    }
}

export default Kota;