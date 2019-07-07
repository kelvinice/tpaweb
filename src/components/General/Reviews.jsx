import React, {Component} from 'react';
import styled from 'styled-components'
import StarInput from "./StarInput";

const AllWrapper = styled('div')`
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
`

const ReviewWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  ${'div'}{
  text-align: center;
  padding: 10px;
  }
`

class Reviews extends Component {
    render() {
        return (
            <AllWrapper>
                <div>{this.props.data.user.name}</div>
                <div>{this.props.data.created_at}</div>
                <ReviewWrapper>
                    <div>
                        <span>Cleanliness</span>
                        <StarInput value={this.props.data.cleanliness} changeValue={(value)=>this.setState({cleanliness:value})}/>
                    </div>
                    <div>
                        <span>Room Facilities</span>
                        <StarInput value={this.props.data.room_facilities} changeValue={(value)=>this.setState({roomFacilities:value})}/>
                    </div>
                    <div>
                        <span>Public Facilities</span>
                        <StarInput value={this.props.data.public_facilities} changeValue={(value)=>this.setState({publicFacilities:value})}/>
                    </div>
                    <div>
                        <span>Security</span>
                        <StarInput value={this.props.data.security} changeValue={(value)=>this.setState({security:value})}/>
                    </div>
                </ReviewWrapper>
                <div>
                    {this.props.data.description}
                </div>

            </AllWrapper>
        );
    }
}

export default Reviews;