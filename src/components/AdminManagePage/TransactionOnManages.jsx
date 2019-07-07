import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

const AllWrapper = styled('div')`
  width: 100%;
  height: 180px;
  background-color: whitesmoke;
  border-radius: 5px;
  margin-bottom: 5px;
cursor: pointer;
display: flex;
justify-content: flex-end;
box-sizing: border-box;
${'div'}{
    height: 100%;
    ${'svg'}{
      margin: 0 auto;
    }
}
@media (max-width: 900px){

  height: 160px;
  flex-direction: column;
  padding-right: 0;
}
`

const ButtonApprove = styled('div')`
  background-color: green;
  color: white;
  height: 100%;
  width: 80px;
   min-width: 80px;
   display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 900px){
      width: 100%;
    }
`

const ButtonDeny = styled('div')`
  background-color: #eb0003;
  color: white;
  height: 100%;
  width: 80px;
  min-width: 80px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 900px){
      width: 100%;
    }
    
`

const Header = styled('div')`
display: flex;
justify-content: flex-start;
flex-direction: column;
width: 100%;
${'div'}{
width: 100%;
${'span'}:first-child{
font-weight: bold;
}
}
`

const ButtonWrapper = styled('div')`
  display: flex;
  width: unset;
  flex-direction: column;
  
  @media (max-width: 900px){
      width: 100%;
    }
`

class TransactionOnManages extends Component {
    render() {
        return (
            <AllWrapper>
                <Header>
                    <div>
                        <span>Transaction ID : </span>
                        <span>{this.props.data.id}</span>
                    </div>
                    <div>
                        <span>Total Price : </span>
                        <span>Rp. {this.props.data.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <div>
                        <span>Owner Name : </span>
                        <span>{this.props.data.user.name}</span>
                    </div>
                    <div>
                        <span>Product Duration : </span>
                        <span>{this.props.data.product.duration} Days</span>
                    </div>
                    <div>
                        <span>Start Date : </span>
                        <span>{this.props.data.premium.start_date}</span>
                    </div>
                    <div>
                        <span>End Date : </span>
                        <span>{this.props.data.premium.end_date}</span>
                    </div>
                    <div>
                        <span>Status : </span>
                        <span>
                            {new Date(this.props.data.premium.end_date) > new Date() ? "Active" : "Inactive"}
                        </span>
                    </div>
                </Header>
                {/*<ButtonWrapper>*/}
                {/*    <ButtonApprove>{<FontAwesomeIcon icon={faCheck}/>}</ButtonApprove>*/}
                {/*    <ButtonDeny>{<FontAwesomeIcon icon={faTimes}/>}</ButtonDeny>*/}
                {/*</ButtonWrapper>*/}

                {/*{console.log(this.props.data)}*/}
            </AllWrapper>
        );
    }
}

export default TransactionOnManages;