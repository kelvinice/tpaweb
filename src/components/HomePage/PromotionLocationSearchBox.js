import React,{Component} from 'react'
import styled from 'styled-components'

const SearchBoxPad = styled('div')`
  background-color: white;
  margin: 20px 15% 0 15%;
  border-radius: 5px;
  height: 60px;
  padding: 5px;
  text-align: left;
`

const SearchTitle = styled('div')`
  color: black;
  width: 100%;
  margin-bottom: .5rem;
  font-size: 16px;
  margin: 4px;
  margin-left: 9px;
  font-weight: bolder;
`

const SearchField = styled('div')`
  margin-left: 9px;
  cursor: text;
`

const LeftSearchIcon = styled('span')`
  font-family: Glyphicons Halflings;
`

const SearchInput = styled('div')`
  display: inline;
  color: gray;
  margin-left: 10px;
`

class PromotionLocationSearchBox extends Component{
    render() {
        return(
            <SearchBoxPad>
                <SearchTitle>Pilih Lokasi</SearchTitle>
                <SearchField>
                    <LeftSearchIcon>&#128269;</LeftSearchIcon>
                    <SearchInput>Cari nama tempat atau alamat..</SearchInput>
                </SearchField>
            </SearchBoxPad>
        )
    }

}

export default PromotionLocationSearchBox