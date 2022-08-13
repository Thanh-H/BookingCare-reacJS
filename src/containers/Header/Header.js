import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils'
import { FormattedMessage } from 'react-intl'

class Header extends Component {
    handleChangeLanguage = (dataLanguage) => {
        this.props.changeLanguageAppRedux(dataLanguage)
    }

    render() {
        const { processLogout, language, userInfo, isLoggedIn } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id="homeheader.welcome" />&nbsp;
                        {userInfo && userInfo.firstName && userInfo.lastName ? userInfo.firstName + ' ' + userInfo.lastName : ''} !
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
