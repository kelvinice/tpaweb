import React, {Component} from 'react';
import UserVerificator from "../components/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import {BeautyInputOutlined, BeautyTomatoButton, GreenNavLinkWrapper} from "../components/BeautyComponent";
import {Link} from "react-router-dom";
import styled from "styled-components";



const NavInfo = styled('div')`
  padding: 5px 10px;
  border-bottom: 1px solid darkgrey;
  box-sizing: border-box;
  font-family: "Titillium Web";
`

const AllWrapper = styled('div')`
    width: 100%;
    height: 100%;
    padding: 50px 100px;
    box-sizing: border-box;
`

const ContextWrapper = styled('div')`
  width: 80%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid darkgrey ;
  
`

const HeaderContext = styled('div')`
    padding: 10px;
    background-color: #eefdf6;
    box-sizing: border-box;
    width: 100%;
    font-weight: bolder;
    font-size: 20px;
`

const BodyContext = styled('div')`
  padding: 30px;
`

const BigProfile = styled('div')`
  background-image: url("/assets/images/default-user-image.png");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: 2px solid #bfbfbf;
  margin: 0 auto;
`

const BodyInner = styled('div')`
  width: 80%;
  margin: 0 auto;
`

const DefinedTable = styled('table')`
  width: 100%;
  ${"tr"}{
    width: 100%;
    ${"td"}:last-child{
      width: 100%;
    }
    ${"td"}:first-child{
      padding: 10px;
      box-sizing: border-box;
      white-space: nowrap;
    }
  }
`

const Stared = styled('span')`
  &::after{
    content: "*";
    color: red;
  }
`

const Padder = styled('div')`
  display: flex;
  width: 100%;
  
  ${"button"}{
    width: 200px;
    margin-right: 30px;
  }
`


class EditProfilPage extends Component {
    render() {
        return (
            <div>
                <UserVerificator></UserVerificator>
                <UserNavBar />

                <NavInfo><GreenNavLinkWrapper><Link to="/">Home</Link></GreenNavLinkWrapper> > User</NavInfo>
                <AllWrapper>

                    <ContextWrapper>
                        <HeaderContext>
                            Data Pribadi
                        </HeaderContext>
                        <BodyContext>
                            <BigProfile/>
                            <br/>
                            <BodyInner>
                                <DefinedTable>
                                    <tr>
                                        <td><Stared>Nama Lengkap</Stared></td>
                                        <td >
                                            <BeautyInputOutlined type="text" name="name"></BeautyInputOutlined>
                                        </td>
                                    </tr>
                                    {/*<tr>*/}
                                    {/*    <td><Stared>Jenis Kelamin</Stared></td>*/}
                                    {/*    <td>*/}
                                    {/*        <input type="radio" name="gender" value="male"/> Laki-Laki*/}
                                    {/*        <input type="radio" name="gender" value="female"/> Perempuan*/}
                                    {/*    </td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td><Stared>Tanggal Lahir</Stared></td>*/}
                                    {/*    <td><BeautyInputOutlined type="date" name="date"></BeautyInputOutlined></td>*/}
                                    {/*</tr>*/}
                                    <tr>
                                        <td><Stared>No. Handphone Darurat</Stared></td>
                                        <td >
                                            <BeautyInputOutlined type="number" name="phone"></BeautyInputOutlined>
                                        </td>
                                    </tr>



                                </DefinedTable>
                                <Padder >
                                    <BeautyTomatoButton>Submit</BeautyTomatoButton>

                                    <BeautyTomatoButton>Cancel</BeautyTomatoButton>
                                </Padder>

                            </BodyInner>

                           </BodyContext>

                    </ContextWrapper>

                </AllWrapper>
            </div>
        );
    }
}

export default EditProfilPage;