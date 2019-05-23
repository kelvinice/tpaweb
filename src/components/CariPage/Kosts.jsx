import React, {Component} from 'react';
import styled from 'styled-components'
// import moment from 'moment-with-locales-es6'
import moment from 'moment'
import 'moment/min/locales'

const AllWrapper = styled('div')`
  width: 50%;
  box-sizing: border-box;
  padding: 15px;
  @media (max-width: 990px){
    width: 100%;
  }
`

const Content = styled('div')`
  width: 100%;
`

const ProfileImage = styled('div')`
  height: 250px;
  width: 100%;
  background-image: url("/assets/images/dummy.jpg");
  background-size: cover;
  background-position: 50%;
  overflow: hidden;
  position: relative;
`

const GoodDiv = styled('div')`
  overflow: hidden;
  white-space: nowrap;
`

const ContentWrapper = styled('div')`
  padding: 10px;
  box-sizing: border-box;
`

const MiddleSpan = styled('span')`
  font-weight:bolder;
  vertical-align: middle;
  font-size: 15px;
  padding: 0 1px;
`

class Kosts extends Component {
    genderHandler(){
        if(this.props.data.house == null){
            return <span style={{fontWeight:"bold",color:"green"}}>Apartement</span>
        }else if (this.props.data.house.gender_type===1){
            return <span style={{fontWeight:"bold",color:"purple"}}>Campur</span>
        }else if(this.props.data.house.gender_type===2){
            return <span style={{fontWeight:"bold",color:"blue"}}>Putra</span>
        }else if(this.props.data.house.gender_type===3){
            return <span style={{fontWeight:"bold",color:"red"}}>Putri</span>
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

    render() {
        return (
            <AllWrapper>
                <Content>
                    {/*{console.log(this.props.data)}*/}
                    <ProfileImage/>
                    <ContentWrapper>
                        <GoodDiv>
                            {this.genderHandler()}
                            <MiddleSpan > · </MiddleSpan>
                            {this.props.data.address}
                        </GoodDiv>
                        <GoodDiv>
                            {this.sisaKamarHandler()}
                        </GoodDiv>
                        <GoodDiv>
                            Kost {this.props.data.name}
                        </GoodDiv>
                        <GoodDiv>
                            {this.updateHandler()}
                        </GoodDiv>

                    </ContentWrapper>


                </Content>

            </AllWrapper>
        );
    }
}

export default Kosts;