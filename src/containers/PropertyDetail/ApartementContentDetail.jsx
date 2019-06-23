import React, {Component} from 'react';
import FavoriteButton from "../../components/General/FavoriteButton";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

class ApartementContentDetail extends Component {
    render() {
        return (
            <div>
                apartement

                {this.props.UserLogin && this.props.UserLogin.type===1 &&
                <FavoriteButton data={this.props.data}/>
                }
            </div>
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

export default withRouter(connect(MapStateToProps,MapDispatchToProps)(ApartementContentDetail));