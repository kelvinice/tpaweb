import React, {Component} from 'react';
import Kota from "../../components/HomePage/Kota";
import styled from 'styled-components'

const CitiesWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width:80%;
  justify-content: center;
`

class KotaBesar extends Component {
    state = {
        cities : [
            {
                image:"/assets/images/kota_semarang.png",
                name:"semarang"
            },{
                image:"/assets/images/kota_bali.png",
                name:"bali"
            },{
                image:"/assets/images/kota_surabaya.png",
                name:"surabaya"
            },{
                image:"/assets/images/kota_medan.png",
                name:"medan"
            },{
                image:"/assets/images/kota_malang.png",
                name:"malang"
            },{
                image:"/assets/images/kota_bandung.png",
                name:"bandung"
            },{
                image:"/assets/images/kota_makassar.png",
                name:"makassar"
            },{
                image:"/assets/images/kota_jogjakarta.png",
                name:"jogjakarta"
            },{
                image:"/assets/images/kota_jabodetabek.png",
                name:"jabodetabek"
            }
        ]
    }

    render() {
        return (
            <CitiesWrapper>
                {this.state.cities.map(
                    (item,key)=><Kota image={item.image} name={item.name} key={item.name}/>
                )}
            </CitiesWrapper>
        );
    }
}

export default KotaBesar;