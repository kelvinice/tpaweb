import React, {Component} from 'react';
import {BeautyInputOutlined} from "./BeautyComponent";

class GoodInput extends Component {
    state = {
        value : this.props.value
    }

    valueChange(e){
        this.setState({value:e.target.value});
    }

    render() {
        return (
            <BeautyInputOutlined value={this.state.value} name={this.props.name} type={(this.props.type) ? this.props.type : "text"} onChange={(e)=>this.valueChange(e)}>
                
            </BeautyInputOutlined>
        );
    }
}

export default GoodInput;