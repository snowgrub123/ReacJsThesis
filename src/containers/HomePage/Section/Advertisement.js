import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Advertisement.scss'
import { FormattedMessage } from 'react-intl';
class Advertisement extends Component {

    render() {

        return (
            <div className='general stage-advertisement'>
                <div className='advertisement-header'>
                    Introducting about Hospital Booking
                </div>
                <div className='advertisement-content'>
                    <div className='advertisement-content-left'>
                        {/* <iframe src="" title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/6aUn8__8tGk" title="Best Acoustic Love Songs 2024 Cover 🎼 Chill Morning English Love Songs 2024 Music to Start New Day" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='advertisement-content-right'>
                        <p>Welcome to our online tutoring platform,where learning meets convenience. Need help grasping a concept or preparing for an exam? Look no further!
                        </p>

                    </div>

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Advertisement);
