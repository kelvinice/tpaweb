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
  background-color: #fe522a;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: bolder;
  cursor: pointer;
`

export {BeautyGreenTitle,BeautyInput,BeautyInputWrapper,BeautyTomatoButton}