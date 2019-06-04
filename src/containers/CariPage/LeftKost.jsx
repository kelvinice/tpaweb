import React, {Component} from 'react';
import styled from 'styled-components'
import Kosts from "../../components/CariPage/Kosts";
import {LoadingImage} from "../HomePage/LoginPopup";
import {connect} from "react-redux";

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
        link : "http://localhost:8000/properties",
        allkosts : [],
        isLoading : false
    }

    fetchMore(){
        this.setState({isLoading:true});

        const axios = require('axios');
        axios.get(this.state.link,{ params: {
                type: this.props.filter.type,
                latitude:this.props.currentPosition[0],
                longitude:this.props.currentPosition[1],
            }}).then((response)=>{
             console.log(response)
            this.setState({allkosts:this.state.allkosts.concat(response.data.properties.data),link:response.data.properties.next_page_url})
            this.setState({isLoading:false});
        }).catch((error)=>{
            console.log(error.response);
            this.setState({isLoading:false});
        });
    }

    componentWillMount() {
        this.fetchMore()
        this.setState({isLoading:true});
    }

    scrollFunction(){
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight-100) {
            if(this.state.isLoading===false && this.state.link!= null){
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
            return <ButtonPlain><span role={"img"} aria-label={"stop"}>⛔</span> No More Data <span role={"img"} aria-label={"stop"}>⛔</span></ButtonPlain>
        }else if(this.state.isLoading){
            return <LoadingImage/>
        }else{
            return <ButtonPlain onClick={()=>this.fetchMore()}><span role={"img"} aria-label={"plus"}>➕</span> Lihat lebih banyak lagi</ButtonPlain>
        }
    }

    refreshFilter(){
        this.setState({link : "http://localhost:8000/properties",
            allkosts : [],
            isLast : false,
            isLoading : false},
            ()=>this.fetchMore()
            )
    }

    render() {
        return (
            <AllWrapper>
                {this.state.allkosts.map(
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



const MapStateToProps = state => {
    return {
        currentPosition : state.currentPosition
    }
}
const MapDispatchToProps = dispatch => {
    return {
        updateCurrentPosition : (key)=>dispatch({type : "updateCurrentPosition",value:key})
    }
}

export default connect(MapStateToProps,MapDispatchToProps,null, { forwardRef : true })(LeftKost);