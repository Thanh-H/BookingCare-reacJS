import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils'
import { FormattedMessage } from 'react-intl'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (dataLanguage) => {
        this.props.changeLanguageAppRedux(dataLanguage)
    }
    componentDidMount() {
        let menu = [];
        let userInfo = this.props.userInfo
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
            this.setState({
                menuApp: menu
            })
        }
    }

    render() {
        const { processLogout, language, userInfo, isLoggedIn } = this.props;
        let nameEn, nameVi
        if (userInfo && userInfo.firstName && userInfo.lastName) {
            nameEn = userInfo.firstName + ' ' + userInfo.lastName
            nameVi = userInfo.lastName + ' ' + userInfo.firstName
        }
        else {
            nameEn = ''
            nameVi = ''
        }
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id="homeheader.welcome" />&nbsp;
                        {
                            language === LANGUAGES.EN ? nameEn : nameVi
                        } !
                    </span>
                    <span className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >VN
                    </span>

                    <span className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >EN
                    </span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
