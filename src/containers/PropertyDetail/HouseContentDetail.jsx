import React, {Component} from 'react';
import styled from "styled-components";
import moment from 'moment'
import 'moment/min/locales'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faCommentAlt,
    faFax,
    faMedal,
    faStopCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons/faBullhorn";
import {BeautyTomatoButton} from "../../components/General/BeautyComponent";
import {BoldDiv} from "../../components/General/CustomComponent";
import FacilityCard from "../../components/OwnerManagePage/FacilityCard";

const AllWrapper  =styled('div')`
width: 100%;
height: 100%;
display: flex;
position: relative;
@media (max-width: 1100px){
  flex-direction: column;
  }
`

const RightSide = styled('div')`
  width: 33%;
  padding: 50px 2.5rem;
  box-sizing: border-box;
  position: sticky;
  top: 50px;
  height: 100%;
  
  @media (max-width: 1100px){
  padding: 20px 10px;
  width: 100%;
  }
`

const LeftSide = styled('div')`
  width: 100%;
  padding: 50px 2.5rem;
  box-sizing: border-box;
  
  @media (max-width: 1100px){
  padding: 20px 10px;
  }
`

const TitleDiv = styled('div')`
font-size: 24px;

@media (min-width: 900px){
display: flex;
justify-content: space-between;
}
`

const GenderDiv = styled('div')`
font-weight: bold;
font-size: 16px;
`

const SisaKamarDiv = styled('div')`
font-weight: bold;
font-size: 18px;
`

const PriceDiv = styled('div')`
display: flex;
justify-content: space-between;
font-weight: bold;
`

const DescriptionDiv = styled('div')`
width: 100%;
`

const PremiumDiv = styled('div')`
  color: #e8a95a;
  font-size: 30px;
 
  
  @media (max-width: 900px){
   background-color: #ff5659;
text-align: center;
margin: 0 auto;
width: 100%;
${'div'}{
width: 100%;
}
}
`

const FacilityDiv = styled('div')`
display: flex;

`


class HouseContentDetail extends Component {
    genderHandler(){
        if(this.props.data.house == null){
            return <span style={{color:"green"}}>Apartement</span>
        }else if (this.props.data.house.gender_type===1){
            return <span style={{color:"purple"}}>Campur</span>
        }else if(this.props.data.house.gender_type===2){
            return <span style={{color:"blue"}}>Putra</span>
        }else if(this.props.data.house.gender_type===3){
            return <span style={{color:"red"}}>Putri</span>
        }
    }

    sisaKamarHandler(){
        if(this.props.data.house == null){
            return <span style={{fontWeight:"bold",color:"green"}}>Ada {this.props.data.apartement.unit} Unit</span>
        }else if (this.props.data.house.room_left===0){
            return <span style={{fontWeight:"bold",color:"gray"}}>Kamar tidak tersedia</span>
        }else if (this.props.data.house.room_left===1){
            return <span style={{fontWeight:"bold",color:"red"}}>Tinggal 1 kamar</span>
        }else{
            return <span style={{fontWeight:"bold",color:"green"}}>Ada {this.props.data.house.room_left} kamar</span>
        }
    }

    updateHandler(){
        moment.locale('id');
        let datediff = "";
        if(this.props.data.updated_at){
            datediff ="Update "+moment(this.props.data.updated_at,"YYYY-MM-DD hh:mm:ss").fromNow()
        }else if(this.props.data.created_at){
            datediff ="Update "+moment(this.props.data.created_at,"YYYY-MM-DD hh:mm:ss").fromNow()
        }
        return <span style={{fontSize:"13px"}}>{datediff}</span>;
    }

    handlePremium(){
        if(this.props.data.owner.active){
            return <PremiumDiv>
                <FontAwesomeIcon icon={faMedal}/> Premium
            </PremiumDiv>
        }
    }

    handleVerifikasi(){
        if(this.props.data.owner.phone_verified_at){
            return <div style={{color:"#05b80f"}}><FontAwesomeIcon icon={faCheckCircle}/> Telepon sudah terverifikasi</div>
        }else{
            return <div style={{color:"#e64b4c"}}><FontAwesomeIcon icon={faTimesCircle}/> Telepon belum terverifikasi</div>
        }
    }

    render() {
        return (
            <AllWrapper>
                <LeftSide>
                    <GenderDiv>
                        {this.genderHandler()}
                    </GenderDiv>
                    <TitleDiv>
                        <div>Kost {this.props.data.name}</div>
                        {this.handlePremium()}
                    </TitleDiv>
                    <BoldDiv>
                        Deskripsi Kost
                    </BoldDiv>
                    <DescriptionDiv>
                        {this.props.data.description}
                    </DescriptionDiv>
                    <br/>
                    <BoldDiv>
                        Alamat Kost
                    </BoldDiv>
                    <div>
                        {this.props.data.address}
                    </div>
                    <br/>
                    <BoldDiv>
                        Fasilitas Publik
                    </BoldDiv>
                    <FacilityDiv>
                        {this.props.data.publicFacilities.map(
                            (item,key) => <FacilityCard key={item.id} data={item}/>
                        )}
                    </FacilityDiv>
                    <br/>

                    <BoldDiv>
                        Fasilitas Ruang
                    </BoldDiv>
                    <FacilityDiv>
                        {this.props.data.roomFacilities.map(
                            (item,key) => <FacilityCard key={item.id} data={item}/>
                        )}
                    </FacilityDiv>
                    <br/>

                    <BoldDiv>
                        Review
                    </BoldDiv>
                    <div>

                    </div>
                    <br/>

                    <BoldDiv>
                        Verifikasi
                    </BoldDiv>
                    <div>
                        {this.handleVerifikasi()}
                    </div>

                    <br/>

                    <BeautyTomatoButton>Report <FontAwesomeIcon icon={faBullhorn}/></BeautyTomatoButton>
                </LeftSide>
                <RightSide>
                    <SisaKamarDiv>
                        {this.sisaKamarHandler()}
                    </SisaKamarDiv>
                    <div>
                        {this.updateHandler()}
                    </div>
                    <PriceDiv>
                        <span>Rp. {this.props.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        <span>/bulan</span>
                    </PriceDiv>
                    <br/>
                    <BeautyTomatoButton><FontAwesomeIcon icon={faCommentAlt}/> Hubungi Kost</BeautyTomatoButton>
                </RightSide>
            </AllWrapper>
        );
    }
}

export default HouseContentDetail;