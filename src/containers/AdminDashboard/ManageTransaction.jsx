import React, {Component, Fragment} from 'react';
import {BACKENDLINK} from "../../Define";
import TransactionOnManages from "../../components/AdminManagePage/TransactionOnManages";
import {HeaderWrapper} from "../../components/General/CustomComponent";
import {CustomButtonWrapper} from "../../components/General/BeautyComponent";
// import styled from "styled-components";


class ManageTransaction extends Component {
    state={
        transactions:[],
        nextPage:null,
        prevPage:null,
        link:`${BACKENDLINK}getAllPendingTransaction`,
    }

    fetchMore(){
        if(this.state.link==null)return;

        this.setState({
            isLoading : true
        });
        const token = localStorage.getItem('token');
        const axios = require('axios');

        axios.get(`${this.state.link}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            console.log(response.data);
            this.setState({
                transactions:response.data.transactions.data,
                nextPage:response.data.transactions.next_page_url,
                prevPage:response.data.transactions.prev_page_url
            });
        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);
        });
    }

    componentDidMount() {
        this.fetchMore()
    }

    handlePageChanger(){
        return <Fragment>
            <HeaderWrapper>
                {this.state.prevPage &&
                <CustomButtonWrapper>
                    <button onClick={() => {
                        this.setState({link:this.state.prevPage},
                            ()=>{
                                this.fetchMore();
                            }
                        )
                    }}>Prev Page</button>
                </CustomButtonWrapper>
                }
                {
                    this.state.nextPage &&
                    <CustomButtonWrapper>
                        <button onClick={() => {
                            this.setState({link:this.state.nextPage},
                                ()=>{
                                    this.fetchMore();
                                }
                            )
                        }}>Next Page</button>
                    </CustomButtonWrapper>
                }
            </HeaderWrapper>
        </Fragment>
    }

    setTarget(target){
        this.setState({target:target});
    }



    render() {
        return (
            <Fragment>
                {
                    this.state.transactions.map(
                        (item,key)=> <TransactionOnManages key={item.id} data={item}/>
                    )
                }
                {this.handlePageChanger()}
            </Fragment>
        );
    }
}

export default ManageTransaction;