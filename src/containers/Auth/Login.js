import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss"

import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnchangeUserName = (e) => {
        this.setState({
            userName: e.target.value,
        })
    }

    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value,

        })
    }

    handdleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage

                })
                console.log('>>>>>data when data && data.errCode !== 0', data)

            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
                console.log('>>>>>data', data)
            }
        }

        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }
            console.log('error.response', error.response)

        }
    }

    handleKeydown = (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            this.handleLogin()
        }
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">

                        <div className="col-12 text-login">Login </div>

                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Enter your username"
                                value={this.state.userName} onChange={(e) => this.handleOnchangeUserName(e)} />
                        </div>

                        <div className="col-12 form-group login-input">
                            <label>Password: </label>
                            <div className='input-password'>
                                <input type={this.state.isShowPassword ? "text" : "password"} className="form-control" placeholder="Enter your password"
                                    value={this.state.password} onChange={(e) => this.handleOnchangePassword(e)}
                                    onKeyDown={(e) => this.handleKeydown(e)}
                                />
                                {this.state.password !== '' &&
                                    <i onClick={() => this.handdleShowHidePassword()}
                                        className={this.state.isShowPassword ? "far fa-eye-slash " : "far fa-eye"}></i>
                                }
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className="col-12 ">
                            <button onClick={() => this.handleLogin()} className="btn-login">Login</button>
                        </div>

                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>

                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with:</span>
                        </div>

                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {

    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
