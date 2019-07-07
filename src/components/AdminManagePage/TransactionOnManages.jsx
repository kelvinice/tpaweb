import React, {Component} from 'react';
import styled from 'styled-components';


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
    display: flex;
    justify-content: space-evenly;
    
}
@media (max-width: 900px){
${'div'}{

    flex-direction: column;
    
}
  height: auto;
  flex-direction: column;
  padding-right: 0;
}
`


const Header = styled('div')`
display: flex;
justify-content: flex-start;
flex-direction: column;
width: 100%;
${'div'}{
width: 100%;
${'span'}{
width: 100%;
}
${'span'}:first-child{
font-weight: bold;
width: 30%;
}
}
`

class TransactionOnManages extends Component {
    handleStatus(){
        if(this.props.data.premium.deleted_at != null){
            return "Cancelled";
        }else if(new Date(this.props.data.premium.end_date) > new Date()){
            return "Active";
        }else{
            return "Inactive";
        }
    }

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
                            {this.handleStatus()}
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