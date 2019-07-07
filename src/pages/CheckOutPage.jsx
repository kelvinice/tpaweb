import React, {Component,Fragment} from 'react';
import styled from 'styled-components'
import UserVerificator from "../components/General/UserVerificator";
import UserNavBar from "../containers/UserPage/UserNavBar";
import BreadCrumbs from "../components/General/BreadCrumbs";
import {BACKENDLINK} from "../Define";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPercent} from "@fortawesome/free-solid-svg-icons/faPercent";
import {BeautyTomatoButton} from "../components/General/BeautyComponent";
import {connect} from "react-redux";
import {PopHolder, PopMessager, SuccessImage} from "../components/General/CustomComponent";
import {InnerBeautyLoading} from "../components/General/BeautyLoading";


const AllWrapper = styled('div')`
width:100%;
height: 100%;
`

const AttributeWrapper = styled('div')`
background-color: ${(props)=>props.promoActive ? "#774ac1" : "#858fda"};
width: 100%;
height: 100%;
min-height: 89vh;
color: white;
text-align: center;
display: flex;

justify-content: center;
flex-direction: column;
font-weight: bold;

`

const DurationWrapper = styled('div')`
font-size: 50px;
@media (max-width: 700px){
  font-size: 40px;
}
`

const PriceWrapper = styled('div')`
font-size: 40px;
@media (max-width: 700px){
  font-size: 30px;
}

text-decoration: ${(props)=>props.promoActive && "line-through;"};
`

const PromoWrapper = styled('div')`
font-size: 43px;
background-color: #45397e;
@media (max-width: 700px){
  font-size: 35px;
}
`

const GrandTotalWrapper = styled('div')`
font-size: 70px;
font-weight: bolder;
background-color: #45397e;
@media (max-width: 700px){
  font-size: 60px;
}
`

const AttentionWrapper = styled('div')`
font-size: 60px;
font-weight: bolder;
@media (max-width: 1000px){
  font-size: 40px;
}
@media (max-width: 700px){
  font-size: 30px;
}
background-color: #8460be;
`

class CheckOutPage extends Component {
    constructor(props) {
        super(props);
        this.userVerificator = React.createRef();
    }

    state = {
        target:null,
        premium : {
            price:0,
            promo:0
        },
        active_transaction:null,
    }

    fetchData(){
        let token = localStorage.getItem('token');
        const axios = require('axios');
        axios.get(`${BACKENDLINK}/premium-product/${this.props.match.params.id}`,
            {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(response=>{
            this.setState({premium:response.data.premium,active_transaction:response.data.active_transaction})
            console.log(response)
        }).catch(err=>{
            console.log(err.response);
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    handleCheckOut(){
        this.setState({target:"loading"})

        const axios = require('axios');
        let token = localStorage.getItem('token');
        let product_id = this.state.premium.id;

        // let formData = new FormData();
        // formData.append('token',token);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.post(`${BACKENDLINK}checkout/${product_id}`,null,config).then(
            (response)=>{
                this.setState({target:"success"},()=>this.fetchData())
                console.log(response);
            }
        ).catch(error => {
            console.log(error.response);

        });
    }

    cancelPremium(){
        this.setState({target:"loading"})

        const axios = require('axios');
        let token = localStorage.getItem('token');
        let premium_id = this.props.UserLogin.active.id;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.delete(`${BACKENDLINK}cancel-user-premium/${premium_id}`,config).then(
            (response)=>{
                this.setState({target:"success"},()=>this.fetchData())
                // console.log(response);
            }
        ).catch(error => {
            console.log(error.response);
        });
    }

    cancelTransaction(){
        this.setState({target:"loading"})

        const axios = require('axios');
        let token = localStorage.getItem('token');
        let transaction_id = this.state.active_transaction.id;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.delete(`${BACKENDLINK}cancel-transaction/${transaction_id}`,config).then(
            (response)=>{
                this.setState({target:"success"},()=>this.fetchData());
                // console.log(response);
            }
        ).catch(error => {
            console.log(error.response);
        });
    }

    handleButton(){
        if(this.props.UserLogin){
            if(this.state.active_transaction != null) {
                return <Fragment>
                    <AttentionWrapper>
                        <div>You Already Have Active Transaction</div>
                    </AttentionWrapper>
                    <br/>
                    <BeautyTomatoButton onClick={() => this.cancelTransaction()}>Cancel Transaction</BeautyTomatoButton>
                </Fragment>
            }
            else if(!this.props.UserLogin.active){
                return <BeautyTomatoButton onClick={()=>this.handleCheckOut()}>Check Out</BeautyTomatoButton>
            }else{
                return <Fragment>
                    <AttentionWrapper>
                        <div>You Already Have Active Premium Until :</div>
                        <div>{this.props.UserLogin.active.end_date}</div>

                    </AttentionWrapper>

                    <BeautyTomatoButton onClick={()=>this.cancelPremium()}>Cancel my Active Premium</BeautyTomatoButton>
                </Fragment>
            }
        }else{
            return null;
        }
    }

    handlePop(){
        if (this.state.target == null) return null;
        else if(this.state.target === "success"){
            return <PopHolder>
                <PopMessager>
                    <SuccessImage/>
                    <br/>
                    <BeautyTomatoButton onClick={()=>{
                        this.userVerificator.noLoadingRefresh();
                        this.setState({target:null})
                    }}>Next</BeautyTomatoButton>
                </PopMessager>
            </PopHolder>
        }
        else if (this.state.target === "loading") {
            return <PopHolder>
                <PopMessager>
                    <InnerBeautyLoading isPurple={true}/>
                </PopMessager>
            </PopHolder>
        }
    }

    render() {
        return (
            <AllWrapper>
                {this.handlePop()}
                <UserVerificator roleOnly={2} onRef={ref => (this.userVerificator = ref)}/>
                <UserNavBar />
                <BreadCrumbs/>

                <AttributeWrapper promoActive={this.state.premium.promo!==0}>
                    <DurationWrapper>{this.state.premium.duration} days of Premium</DurationWrapper>
                    <PriceWrapper promoActive={this.state.premium.promo!==0}>Rp. {this.state.premium.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PriceWrapper>

                    {this.state.premium.promo!==0 &&
                    <Fragment>
                        <PromoWrapper>Discount {this.state.premium.promo} <FontAwesomeIcon icon={faPercent}/></PromoWrapper>
                        <GrandTotalWrapper>Rp. {(this.state.premium.price*((100-this.state.premium.promo)/100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GrandTotalWrapper>
                    </Fragment>
                    }
                    <br/>
                    {this.handleButton()}

                </AttributeWrapper>
            </AllWrapper>
        );
    }
}

const MapStateToProps = state => {
    return {
        UserLogin : state.UserLogin
    }
}
const MapDispatchToProps = dispatch => {
    return {
        updateUserlogin : (key)=>dispatch({type : "updateUserlogin",value:key})
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(CheckOutPage);