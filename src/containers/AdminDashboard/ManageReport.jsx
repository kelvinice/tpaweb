import React, {Component, Fragment} from 'react';
import {BACKENDLINK} from "../../Define";
import styled from "styled-components";
import {
    BeautyTomatoButton,
    CustomButtonWrapper
} from "../../components/General/BeautyComponent";
import {
    BigGreyText,
    HeaderWrapper,
    MidButtonWrapper,
    PopHolder,
    PopMessager
} from "../../components/General/CustomComponent";
import {InnerBeautyLoading} from "../../components/General/BeautyLoading";
import Reports from "../../components/AdminManagePage/Reports";

const ReportsWrapper = styled('div')`
columns: 100px 3;
@media (max-width: 1200px){
columns: 100px 2;
}
@media (max-width: 900px){
columns: 100px 1;
}
`


class ManageReport extends Component {
    state={
        reports:[],
        nextPage:null,
        prevPage:null,
        link:`${BACKENDLINK}getAllReport`,
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
            // console.log(response.data);
            this.setState({
                reports:response.data.reports.data,
                nextPage:response.data.reports.next_page_url,
                prevPage:response.data.reports.prev_page_url
            });
        }).catch((error) => {
            console.log("ini error:");
            console.log(error.response);
        });
    }

    componentDidMount() {
        this.fetchMore();
    }

    deleteReport(){
        const id = this.state.target.post.id;
        this.setState({target:"loading"});
        const axios = require('axios');
        let token = localStorage.getItem('token');

        let data = {"token":token,"id" : id, headers: {
                Authorization: `Bearer ${token}`
            }}
        axios.delete(`${BACKENDLINK}delete-report/${id}`,data).then(response=>{
            console.log(response);
            if(response.data.message==="success"){
                this.setState({
                    link:`${BACKENDLINK}getAllReport`,
                    posts:[],
                    target:null,
                },()=>this.fetchMore());
            }
        }).catch(error => {
            console.log(error.response);
        })
    }

    handlePop(){
        if(this.state.target==null)return null;
        else if(this.state.target==="loading"){
            return <PopHolder>
                <PopMessager>
                    <InnerBeautyLoading/>
                </PopMessager>
            </PopHolder>
        }
        else{
            if(this.state.target.type==="delete") {
                return <PopHolder>
                    <PopMessager>
                        <BigGreyText>Are you sure want to delete this report?</BigGreyText>
                        <MidButtonWrapper>
                            <BeautyTomatoButton onClick={(target) => this.setTarget(null)}>Cancel</BeautyTomatoButton>
                            <BeautyTomatoButton onClick={() => this.deleteReport()}>Confirm</BeautyTomatoButton>
                        </MidButtonWrapper>
                    </PopMessager>
                </PopHolder>
            }
        }
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
                {this.handlePop()}
                <ReportsWrapper>
                    {
                        this.state.reports.map(
                            (item,key)=><Reports key={item.id} data={item} setTarget={(target)=>this.setTarget(target)}/>
                        )
                    }
                </ReportsWrapper>

                {this.handlePageChanger()}
            </Fragment>
        );
    }
}

export default ManageReport;