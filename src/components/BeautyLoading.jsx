import React, {Component} from 'react';
import styled, {keyframes} from "styled-components";

const keys1 = keyframes`
  from{
    height: 50px;
    width: 50px;
    background-color: rgba(0,225,0,0.65);
  }
  to{
      height: 20px;
      width: 20px;
      background-color: green;
  }
`

const SuperWhite = styled('div')`
    position: fixed;
    background-color: white;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    display: flex;
    justify-content: center;
    flex-flow: column;
`

const InnerSuperWhite = styled('div')`
    //background-color: white;
    z-index: 50;
    display: flex;
    justify-content: center;
    flex-flow: column;
    width: 100%;
    height: 100%;
`

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
`

const GreenDot = styled('div')`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 20px;
  animation: ${keys1} 0.6s alternate infinite;
  &:first-child{
    animation-delay: 0s;
  }
  &:last-child{
    animation-delay: 0.4s;
  }
  animation-delay: 0.2s;
`

class BeautyLoading extends Component {
    render() {
        return (
            <SuperWhite>
                <Wrapper>
                    <GreenDot/>
                    <GreenDot/>
                    <GreenDot/>
                </Wrapper>
            </SuperWhite>
        );
    }
}

class InnerBeautyLoading extends Component {
    render() {
        return (
            <InnerSuperWhite>
                <Wrapper>
                    <GreenDot/>
                    <GreenDot/>
                    <GreenDot/>
                </Wrapper>
            </InnerSuperWhite>
        );
    }
}


export default BeautyLoading;
export {InnerBeautyLoading};