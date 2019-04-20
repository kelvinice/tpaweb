import styled from "styled-components";

const BeautyInputWrapper = styled('div')`
    &:focus-within{
      color: green;
    }
    text-align: left;
    font-weight: bolder;
    color: gray;
`

const BeautyGreenTitle = styled('div')`
    text-align: center;
    font-weight: bolder;
    color: #27ab27;
`

const BeautyInput = styled('input')`
  background-color: white;
  padding: 5px;
  border: none;
  border-bottom: 2px solid gray;
  display: block;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  &:focus{
    border-bottom: 2px solid green;
  }
`

const BeautyTomatoButton = styled('button')`
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  outline: none;
  &:hover{
    background-color: #ff6e30;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #ffbc9d 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10,10);
    opacity: 0;
    transition: transform .5s, opacity 1s;
  }
  &:active:after {
    transform: scale(0,0);
    opacity: .2;
    transition: 0s;
  }
  background-color: #fe522a;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: bolder;
  cursor: pointer;
  text-transform: uppercase;
`

const NavLinkWrapper = styled('div')`
  ${'a'}{
    color: black;
    text-decoration: none;
  }
  ${'a'}:hover{
    color: green;
    text-decoration: underline;
  }
`

const GreenNavLinkWrapper = styled('div')`
  display: inline-block;
  padding: 5px;
  ${'a'}{
    color: green;
    text-decoration: none;
  }
  ${'a'}:hover{
    color: green;
    text-decoration: underline;
  }
`


export {BeautyGreenTitle,BeautyInput,BeautyInputWrapper,BeautyTomatoButton,NavLinkWrapper,GreenNavLinkWrapper}