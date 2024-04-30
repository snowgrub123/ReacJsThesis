import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { languages } from '../../utils'
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    handleChangeLanguages = (language) => {
        this.props.changeLanguageFromAppHome(language)
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        // console.log('check from header.js userInfo:', userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <span className='welcome'><FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.ho && userInfo.ten ? userInfo.ho + userInfo.ten : ''}!
                    </span>
                    <span className={language === languages.VI ? "languages-vi active" : "languages-vi"}
                        onClick={() => this.handleChangeLanguages(languages.VI)}
                    >
                        VN</span>
                    <span className={language === languages.EN ? "languages-en active" : "languages-en"}
                        onClick={() => this.handleChangeLanguages(languages.EN)}
                    >
                        EN</span>
                    <div className="btn btn-logout"
                        onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                {/* nút logout */}

            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageFromAppHome: (language) => dispatch(actions.changeLanguageFromApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
