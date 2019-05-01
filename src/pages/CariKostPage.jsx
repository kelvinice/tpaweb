import React, {Component} from 'react';
import UserNavBar from "../containers/UserPage/UserNavBar";
import UserVerificator from "../components/UserVerificator";
import CariFilter from "../containers/CariPage/CariFilter";
import RightMap from "../containers/CariPage/RightMap";
import LeftKost from "../containers/CariPage/LeftKost";

class CariKostPage extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <UserNavBar/>
                <UserVerificator noRedirect={true}/>
                <CariFilter/>
                <div>
                    <RightMap/>
                </div>
                <LeftKost/>

            </div>
        );
    }
}

export default CariKostPage;