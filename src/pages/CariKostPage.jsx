import React, {Component} from 'react';
import UserNavBar from "../containers/UserPage/UserNavBar";
import UserVerificator from "../components/UserVerificator";
import CariFilter from "../containers/CariPage/CariFilter";
import RightMap from "../containers/CariPage/RightMap";
import LeftKost from "../containers/CariPage/LeftKost";

class CariKostPage extends Component {
    state = {
        type : 0
    };

    setFilter(e){
        e.preventDefault();
        let form = e.target;
        let type = form.elements["type"].value;
        this.setState({type:type});
        this.refs.leftkosts.refreshFilter();
    }

    render() {
        return (
            <div>
                <UserNavBar/>
                <UserVerificator noRedirect={true}/>
                <CariFilter setFilter={(e)=>this.setFilter(e)}/>
                <div>
                    <RightMap/>
                </div>
                <LeftKost ref={"leftkosts"} filter = {this.state}/>

            </div>
        );
    }
}

export default CariKostPage;