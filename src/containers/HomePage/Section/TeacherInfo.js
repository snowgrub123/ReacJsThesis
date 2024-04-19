import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './TeacherInfo.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
class TeacherInfo extends Component {

    render() {

        return (
            <div className='general stage-teacher'>
                <div className='class-container'>
                    <div className='class-header'>
                        <div className="class-header-title">Giáo viên nổi bật</div>
                        <button className='class-header-detail'>Xem Thêm</button>
                    </div>
                    <div className='class-content'>
                        <Slider {...this.props.settings}>
                            <div className='class-customize'>
                                <div className="class-img stage-teacher-img" />
                                <span className='title-under-img'>1</span>
                            </div>
                            <div className='class-customize'>
                                <div className="class-img stage-teacher-img" />
                                <span className='title-under-img'>2</span>
                            </div>
                            <div className='class-customize'>
                                <div className="class-img stage-teacher-img" />
                                <span className='title-under-img'>3</span>
                            </div>
                            <div className='class-customize'>
                                <div className="class-img stage-teacher-img " />
                                <span className='title-under-img'>4</span>
                            </div>
                            <div className='class-customize'>
                                <div className="class-img stage-teacher-img" />
                                <span className='title-under-img'>5</span>
                            </div>
                            <div className='class-customize'>
                                <div className="class-img stage-teacher-img" />
                                <span className='title-under-img'>6</span>
                            </div>
                            <div className='class-customize'>
                                <div className="class-img stage-teacher-img" />
                                <span className='title-under-img'>7</span>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherInfo);
