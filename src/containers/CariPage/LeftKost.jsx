import React, {Component} from 'react';
import styled from 'styled-components'
import Kosts from "../../components/CariPage/Kosts";
import {LoadingImage} from "../HomePage/LoginPopup";

const AllWrapper = styled('div')`
  width: 56vw;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 990px){
    width: 100vw;
  }
`

const Centerer = styled('div')`
  margin: 0 auto;
  position: relative;
  margin-bottom: 100px;
`

const ButtonPlain = styled('button')`
  margin: 20px;
  font-size: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: green;
  outline: none;
`

class LeftKost extends Component {
    state = {
        link : "http://localhost:8000/houses",
        allkosts : null,
        isLast : false,
        isLoading : false
    }

    fetchMore(){
        // if(this.state.isLast){
        //     console.log("last");
        //     return;
        // }
        this.setState({isLoading:true});
        const axios = require('axios');
        axios.get(this.state.link,{ params: {
                type: this.props.filter.type
            }}).then((response)=>{
             // console.log(response)
            if(this.state.allkosts== undefined || this.state.allkosts==null)
                this.setState({allkosts:response.data.house.data,link:response.data.house.next_page_url})
            else{

                this.setState({allkosts:this.state.allkosts.concat(response.data.house.data),link:response.data.house.next_page_url})
            }

            if(response.data.house.current_page==response.data.house.last_page){
                this.setState({isLast:true})
            }
            this.setState({isLoading:false});
        }).catch((error)=>{
            console.log(error);
            this.setState({isLoading:false});
        });
    }

    componentWillMount() {
        this.fetchMore()
        this.setState({isLoading:true});
    }

    scrollFunction(){
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight-100) {
            if(this.state.isLoading==false && this.state.isLast==false){
                this.fetchMore();
            }
        }
    }

    componentDidMount() {
        window.addEventListener("scroll",()=>this.scrollFunction());
    }
    componentWillUnmount() {
        window.removeEventListener("scroll",()=>this.scrollFunction());
    }

    handleButton(){
        if(this.state.isLast){
            return <ButtonPlain>⛔ No More Data ⛔</ButtonPlain>
        }else if(this.state.isLoading){
            return <LoadingImage/>
        }else{
            return <ButtonPlain onClick={()=>this.fetchMore()}>➕ Lihat lebih banyak lagi</ButtonPlain>

        }
    }

    refreshFilter(){
        // {console.log(this.props.filter.type)}
        this.setState({link : "http://localhost:8000/houses",
            allkosts : undefined,
            isLast : false,
            isLoading : false},
            ()=>this.fetchMore()
            )

        console.log("refreshed");


    }

    render() {
        return (
            <AllWrapper>

                {this.state.allkosts &&
                    this.state.allkosts.map(
                        (item,key)=><Kosts key = {item.id} data = {item}/>
                    )
                }
                <Centerer>
                    {this.handleButton()}
                </Centerer>


            </AllWrapper>
        );
    }
}

export default LeftKost;