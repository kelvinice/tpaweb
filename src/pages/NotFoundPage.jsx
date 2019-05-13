import React, {Component} from 'react';
import styled from 'styled-components'
import Footer from "../containers/HomePage/Footer";

const SadGif = styled('div')`
background-image: url("/assets/images/sad.gif");
  width: 300px;
  height: 300px;
  margin: 0 auto; 
  border-radius: 50%;
  background-position: center;
  background-size: cover;
`

const Header = styled('div')`
  text-align: center;
  margin-top: 50px;
  @media only screen and (min-width: 900px){
    margin-bottom: 100px;
  }

`

const StatusHead = styled('div')`
  color: orangered;
  font-size: 60px;
  font-weight: bolder;
`
const NameHead = styled('div')`
  color: orangered;
  font-size: 25px;
  font-weight: bolder;
`

const DescriptionHead = styled('div')`
  font-size: 18px;
  font-weight: bold;
`


class NotFoundPage extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%"}}>
                <Header>
                    <SadGif/>
                    <StatusHead>404</StatusHead>
                    <NameHead>HALAMAN TIDAK DITEMUKAN</NameHead>
                    <DescriptionHead>Mungkin halaman telah dihapus atau terjadi kesalahan dalam penulisan url.</DescriptionHead>
                </Header>
                <Footer/>

            </div>
        );
    }
}

export default NotFoundPage;