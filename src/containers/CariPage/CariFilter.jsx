import React, {Component} from 'react';
import styled from 'styled-components'

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
`

const GoodButton = styled('button')`
  color: white;
  background-color: #00ab40;
  border-radius: 5px;
  border: 1px solid #007d00;
  outline: none;
  padding: 5px;
  margin-right: 3px;
`

const LeftCariKategori = styled('div')`
  width: 15%;
  border-right: 1px solid gray;
`

const RightCariKategori = styled('div')`
  width: 85%;
  margin-left: 5px;
`

const Title = styled('div')`
  width: 100%;
  font-weight: bold;
  font-family: "Titillium Web";
`

const Menu = styled('div')`
  display: flex;
  flex-direction: column;
  
`

const MenuContent = styled('div')`
  width: 100%;
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
                <RightCariKategori>Tipe Kost</RightCariKategori>

            </AllWrapper>
        );
    }
}

export default CariFilter;