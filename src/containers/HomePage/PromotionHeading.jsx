import React,{Component} from 'react'
import styled from 'styled-components'
import PromotionLocationSearchBox from "../../components/HomePage/PromotionLocationSearchBox";

const PromotionStyles = styled.div`
    position: relative;
    top: 0;
    color: white;
    background-image: url('/assets/images/promotion.jpg');
    height: 65vh;
    width: 100%;
    background-position: center;
    background-size: cover;
    display: table;
`

const CenteredPromotional = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`

const TopTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
`

const BottomTitle = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 1em;

`

class PromotionHeading extends Component{

    render() {
        return(
            <PromotionStyles>
                <CenteredPromotional>
                    <TopTitle>Mau cari kos kosan?</TopTitle>
                    <BottomTitle>Dapatkan info kost murah, kost harian, kost bebas, dan info kosan lainnya di Barbarkos!</BottomTitle>
                    <PromotionLocationSearchBox></PromotionLocationSearchBox>
                </CenteredPromotional>
            </PromotionStyles>
        )
    }


}

export default PromotionHeading