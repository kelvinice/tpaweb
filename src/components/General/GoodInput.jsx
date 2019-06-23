import React, {Component} from 'react';
import {BeautyInputOutlined} from "./BeautyComponent";

class GoodInput extends Component {
    state = {
        value : this.props.value,
        focused : React.createRef(),
    }

    valueChange(e){
        this.setState({value:e.target.value});
    }

    componentDidMount() {
        if(this.props.autoFocus){
            this.focused.focus()
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.autoFocus){
            this.focused.focus()
        }

    }

    render() {
        return (
            <BeautyInputOutlined placeholder={this.props.placeholder} ref={ref => (this.focused = ref)} value={this.state.value} name={this.props.name} type={(this.props.type) ? this.props.type : "text"} onChange={(e)=>this.valueChange(e)}>
            </BeautyInputOutlined>
        );
    }
}

export default GoodInput;