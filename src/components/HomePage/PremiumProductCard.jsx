import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons/faPercent";
import {Link} from "react-router-dom";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";

const Opened = keyframes`
from{
border-radius: 0 0 0 20%;
bottom: 0;
height: 100%;
left: 0;
width: 100%;
}
to{
border-radius: 0 0 0 100%;
background-color: transparent;
left: 50%;
width: 50%;
bottom: 50%;
height: 50%;
}
`

const Striked = keyframes`
from{
text-decoration: none;
}
to{
 text-decoration: line-through;
}
`

const RGB = keyframes`
50%{
background-color: #858fda;
}
100%{
background-color: #2dbac2;
}
`

const FlipableLayer = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #858fda;
  ${props => props.promoActive &&
    "border-radius: 0 0 0 20%;"
    };
    z-index: 2;
     
`

const OuterInformation = styled('div')`
  position: relative;
  z-index: 3;
  width: 100%;
 
`

const PriceDiv = styled('div')`
font-size: 16px;
`

const InnerInformation = styled('div')`
  z-index: 1;
`

const AllWrapper = styled('div')`
    width: 200px;
    height: 130px;
    margin: 10px auto;
    background-color: #7448c9;
    position: relative;
    text-align: center;
    ${'a'}{
      height: 100%;
      width: 100%;
      text-decoration: none;
      color: white;
      display: flex;
        justify-content: center;
        flex-direction: column;
    }
    font-weight: bold;
    font-size: ${props => !props.promoActive && "20px"};
    &:hover{
        ${PriceDiv}{
          animation: ${props => props.promoActive && Striked} 500ms linear forwards;
        }
         ${FlipableLayer}{
            animation: ${props => props.promoActive ? Opened : RGB} 1s linear forwards;
            background-color: ${props => !props.promoActive && "#4cb5ce"};
        }
    }
    
    
    @media (max-width: 900px){
      width: 160px;
      ${PriceDiv}{
          animation: ${props => props.promoActive && Striked} 500ms linear forwards;
        }
         ${FlipableLayer}{
            animation: ${props => props.promoActive && Opened} 1s linear forwards;
        }
    }
`

const FinalPrice = styled('div')`
font-size: 23px;
font-weight: bolder;
color: #57ff4b;
`


class PremiumProductCard extends Component {
    render() {
        return (
            <AllWrapper promoActive={this.props.data.promo!==0}>
                <Link to={`/premium/${this.props.data.id}`}>
                <FlipableLayer promoActive={this.props.data.promo!==0}/>
                <OuterInformation>
                    {/*{console.log(this.props)}*/}
                    {this.props.data.id===this.props.best.id &&
                        <div>Best Value <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon></div>
                    }
                    <div>{this.props.data.duration} days Premium</div>
                    <PriceDiv>Rp. {this.props.data.price}</PriceDiv>
                </OuterInformation>
                {this.props.data.promo!==0 &&
                <InnerInformation>
                    <div>Promo {this.props.data.promo} <FontAwesomeIcon icon={faPercent}/></div>
                    <FinalPrice>Rp. {this.props.data.price*((100-this.props.data.promo)/100)}</FinalPrice>
                </InnerInformation>
                }
                </Link>

            </AllWrapper>

        );
    }
}

export default PremiumProductCard;