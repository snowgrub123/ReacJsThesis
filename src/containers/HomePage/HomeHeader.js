import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { languages } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { changeLanguageFromApp } from '../../store/actions';
import { withRouter } from 'react-router';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageFromAppHome(language)
        // fire redux event: actions (event)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-list"></i>
                            <div className='logo-header'
                                onClick={() => this.returnToHome()}
                            ></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality"></FormattedMessage></b></div>
                                <div className='child-content-title'>
                                    <FormattedMessage id="homeheader.listClass"></FormattedMessage>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.teacher"></FormattedMessage></b></div>

                                <div className='child-content-title'>
                                    <div><FormattedMessage id="homeheader.listTeacher"></FormattedMessage></div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.subject"></FormattedMessage></b></div>

                                <div className='child-content-title'>
                                    <div><FormattedMessage id="homeheader.listSubject"></FormattedMessage></div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.information"></FormattedMessage></b></div>

                                <div className='child-content-title'>
                                    <div><FormattedMessage id="homeheader.detailInfo"></FormattedMessage></div>
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='help-content'>
                                <i className="fas fa-question-circle"></i>
                                <div><FormattedMessage id="homeheader.support"></FormattedMessage></div>
                            </div>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(languages.VI)}>VN</span></div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true &&
                    <div className='home-body-container'>
                        {/* <div className='content-bodyUp'>
                            <div className='title1'>
                                <FormattedMessage id="homecenter.title1"></FormattedMessage>
                            </div>
                            <div className='title2'><FormattedMessage id="homecenter.title2"></FormattedMessage></div>
                            <div className='sreach'>
                                <i className="fas fa-search"></i>
                                {<input type='text' placeholder='Tìm kiếm thông tin'>

                                </input>}
                            </div>
                        </div> */}
                        {/* <div className='content-bodyDown'>
                            <div className='option'>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className="fas fa-book"></i>
                                    </div>
                                    <div className='content-option-child'>
                                        <span>Lớp học</span>
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className="fas fa-book"></i>
                                    </div>
                                    <div className='content-option-child'>
                                        <span>Giảng Viên</span>
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-option-child'>
                                        <i className="fas fa-book"></i>
                                    </div>
                                    <div className='content-option-child'>
                                        <span>Giảng Viên</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                }
            </React.Fragment >

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
        changeLanguageFromAppHome: (language) => dispatch(changeLanguageFromApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
