import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Class from './Section/Class';
import TeacherInfo from './Section/TeacherInfo';
import Subject from './Section/Subject';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Advertisement from './Section/Advertisement';
import HomeFotter from './HomeFotter';
import { event } from 'jquery';
class HomePage extends Component {


    handleAfterChange = (event, current) => {

    }
    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Class settings={settings} />
                <TeacherInfo settings={settings} />
                <Subject settings={settings} />
                <Advertisement />
                <HomeFotter />
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
