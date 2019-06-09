import styled from "styled-components";

const HeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
`

const BoldRed = styled('span')`
    color: red;
    font-weight: bolder;
`

const PopHolder = styled('div')`
width: 100%;
height: 100%;
position: fixed;
background-color: rgba(178,178,178,0.68);
z-index: 6;
padding: 10px;
display: flex;
align-items: center;
@media (max-width: 900px){
  padding: 0; 
}
`

const PopMessager = styled('div')`
  width: 500px;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  display: block;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 900px){
    width: 70%;
  }
  @media (max-width: 900px){
    margin: 0 0;
  }
`

const PurePopMessager = styled('div')`
  width: 500px;
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  display: block;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 900px){
    width: 100%;
  }
  @media (max-width: 900px){
    margin: 0 0;
  }
`

const BigGreyText = styled('div')`
  color: #404040;
  font-size: 20px;
  font-weight: bold;
`

const MidButtonWrapper = styled('div')`
width: 100%;
padding: 20px;
box-sizing: border-box;
display: flex;
justify-content: space-around;
font-weight: bold;
${"button"}{
  margin: 0 5px;
}
`

const LinearWrapper =styled('div')`
  display: flex;
  &:focus-within,&:active{
    ${'input'}{
      font-size:17px;
      font-weight: bold;
      color: green;
    }
    ${'div'}{
      border-color: #009f29;
      background-color: #95ff9a;
      color: #000000;
    }
  }
  
  ${'div'},${'input'}{
    border-radius: 0 0 0 0;
    border-width: 0 0 0 0;
    &:first-child{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-bottom-width: 1px;
      border-top-width: 1px;
      border-left-width: 1px;
    }
    &:last-child{
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-bottom-width: 1px;
      border-top-width: 1px;
      border-right-width: 1px;
    }
  }
`

const InputInformation = styled('div')`
  padding: 10px;
  box-sizing: border-box;
  color: #000000;
  background-color: #d5d5d5;
  border-color: #797979;
  border-style: solid; 
`

const SuccessImage = styled('div')`
  background-image: url("/assets/images/true.png");
  width: 200px;
  height: 200px;
  margin: 0 auto; 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: transparent;
`

const BoldDiv = styled('div')`
  font-weight: 700;
  color: #383746;
`


export {PurePopMessager,BoldDiv,SuccessImage,LinearWrapper,InputInformation,HeaderWrapper,BoldRed,PopHolder,PopMessager,BigGreyText,MidButtonWrapper}