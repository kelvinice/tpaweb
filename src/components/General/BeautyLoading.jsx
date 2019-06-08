import React, {Component,Fragment} from 'react';
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

const keys2 = keyframes`
  from{
    height: 50px;
    width: 50px;
    background-color: rgba(123,76,186,0.65);
  }
  to{
      height: 20px;
      width: 20px;
      background-color: #473c79;
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

const PurpleDot = styled('div')`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 20px;
  animation: ${keys2} 0.6s alternate infinite;
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
    handleDot(){
        if(this.props.isPurple){
            return <Fragment>
                <PurpleDot/>
                <PurpleDot/>
                <PurpleDot/>
            </Fragment>
        }else{
            return <Fragment>
                <GreenDot/>
                <GreenDot/>
                <GreenDot/>
            </Fragment>
        }

    }

    render() {
        return (
            <InnerSuperWhite>
                <Wrapper>
                    {this.handleDot()}
                </Wrapper>
            </InnerSuperWhite>
        );
    }
}


export default BeautyLoading;
export {InnerBeautyLoading};