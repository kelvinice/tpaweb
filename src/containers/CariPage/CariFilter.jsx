import React, {Component} from 'react';
import styled from 'styled-components'
import {BeautyInputWrapper, BeautySelectInput} from "../../components/BeautyComponent";


const AllWrapper = styled('div')`
  width: 100%;
  padding: 20px;
  position: sticky;
  top: 50px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  background-color: white;
  box-sizing: border-box;
  z-index: 1;
  border-bottom: 1px solid rgba(177,177,177,0.86);
  @media (max-width: 600px){
    flex-flow: column;
  }
  
`

const GoodButton = styled('button')`
  color: white;
  background-color: #00ab40;
  border-radius: 5px;
  border: 1px solid #007d00;
  outline: none;
  padding: 5px;
  margin-right: 3px;
  cursor: pointer;
`

const LeftCariKategori = styled('div')`
  width: 15%;
  border-right: 1px solid gray;
   @media (max-width: 600px){
    width: 100%;
    border-right: none;
  }
`

const RightCariKategori = styled('div')`
  width: 85%;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
`

const Title = styled('div')`
  width: 100%;
  font-weight: bold;
  font-family: "Titillium Web";
`

const Menu = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`

const MenuContent = styled('div')`
  width: 100%;
  @media (max-width: 600px){
    flex-flow: row;
  }
  
`

class CariFilter extends Component {
    render() {
        return (
            <AllWrapper>
                <LeftCariKategori>
                    <Menu>
                        <Title>Cari Kategori</Title>
                        <MenuContent>
                            <GoodButton>Kost</GoodButton>
                            <GoodButton>Apartement</GoodButton>
                            <GoodButton>Loker</GoodButton>
                        </MenuContent>
                    </Menu>

                </LeftCariKategori>
                <form action="" onSubmit={(e)=>this.props.setFilter(e)}>
                <RightCariKategori>
                        <Menu>
                            <Title>Tipe Kost</Title>
                            <MenuContent>
                                <BeautyInputWrapper style={{width:"200px"}}>
                                    <BeautySelectInput name="type" required>
                                        <option value="0">Semua</option>
                                        <option value="1">Campur</option>
                                        <option value="2">Khusus Putra</option>
                                        <option value="3">Khusus Putri</option>
                                        <option value="4">Putra dan Campur</option>
                                        <option value="5">Putri dan Campur</option>
                                    </BeautySelectInput>
                                </BeautyInputWrapper>
                            </MenuContent>
                        </Menu>

                        <Menu>
                            <MenuContent>
                            <GoodButton type="submit">Set</GoodButton>
                            </MenuContent>
                        </Menu>

                </RightCariKategori>
                </form>

            </AllWrapper>
        );
    }
}

export default CariFilter;