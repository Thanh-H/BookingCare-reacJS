import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import { LANGUAGES, USER_ROLE } from '../utils'
import Header from '../containers/Header/Header';
import _ from 'lodash'
import ManageSpecialty from '../containers/System/specialty/ManageSpecialty'

class System extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: true
        }
    }
    componentDidMount() {
        let userInfo = this.props.userInfo
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                this.setState({
                    isAdmin: true
                })
            }
            else {
                this.setState({
                    isAdmin: false
                })
            }
        }
    }
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        let { isAdmin } = this.state
        if (isAdmin === true) {
            return (
                <>
                    {isLoggedIn && <Header />}

                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                <Route path="/system/user-manage" component={UserManage} />
                                <Route path="/system/user-redux" component={UserRedux} />
                                <Route path="/system/manage-doctor" component={ManageDoctor} />
                                <Route path="/system/manage-specialty" component={ManageSpecialty} />
                                <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                            </Switch>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (<div></div>)
        }
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
