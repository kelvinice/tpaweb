import React, {Component,Fragment} from 'react';
import {BACKENDLINK} from "../../Define";
import Kosts from "../../components/CariPage/Kosts";
import styled from "styled-components";
import {CustomButtonWrapper} from "../../components/General/BeautyComponent";

const AllWrapper = styled('div')`
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  ${Kosts} {
    background-color: #f0ffe8;
  }
`

const HeaderWrapper = styled('div')`
  width: 100%;
  display: flex;
`

class HistoryFavourites extends Component {
    state={
        favorites:[],
        nextPage:null,
        prevPage:null,
        link:`${BACKENDLINK}getMyFavorites`,
    }

    fetchData(){
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.get(`${this.state.link}`,data).then(response=>{
            console.log(response.data)
            this.setState({
                favorites:response.data.favorites.data,
                nextPage:response.data.favorites.next_page_url,
                prevPage:response.data.favorites.prev_page_url
            })

        }).catch(error => {
            console.log(error.response);
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    handlePageChanger(){
        return <Fragment>
            <HeaderWrapper>
                {this.state.prevPage &&
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({link:this.state.prevPage},
                            ()=>{
                                this.fetchData();
                            }
                        )
                    }}>Prev Page</button>
                </CustomButtonWrapper>
                }
                {this.state.nextPage &&
                    <CustomButtonWrapper>
                        <button onClick={() => {
                            this.setState({link:this.state.nextPage},
                                ()=>{
                                    this.fetchData();
                                }
                            )
                        }}>Next Page</button>
                    </CustomButtonWrapper>
                }
            </HeaderWrapper>
        </Fragment>
    }

    render() {
        return (
            <AllWrapper>
                {
                    this.state.favorites.map(
                        (item,key)=><Kosts key={item.id} data={item.property}/>
                    )
                }
                {this.handlePageChanger()}

            </AllWrapper>
        );
    }
}

export default HistoryFavourites;