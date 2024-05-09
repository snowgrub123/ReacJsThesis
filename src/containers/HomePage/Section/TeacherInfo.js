import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './TeacherInfo.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { languages } from '../../../utils';
import { withRouter } from 'react-router';
class TeacherInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTeachers: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topTeachersRedux !== this.props.topTeachersRedux) {
            this.setState({
                arrTeachers: this.props.topTeachersRedux
            })
        }

    }
    componentDidMount() {
        this.props.loadTopTeachers();
    }
    handleViewDetailTeacher = (teacher) => {
        if (this.props.history) {
            this.props.history.push(`/detail-teacher/${teacher.id}`)
        }

    }
    render() {
        let arrTeachers = this.state.arrTeachers;
        let { language } = this.props;
        arrTeachers = arrTeachers.concat(arrTeachers).concat(arrTeachers);
        return (
            <div className='general stage-teacher'>
                <div className='class-container'>
                    <div className='class-header'>
                        <div className="class-header-title">

                            <FormattedMessage id="homepage.outstanding-teacher" /></div>
                        <button className='class-header-detail'>
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className='class-content'>
                        <Slider {...this.props.settings}>
                            {arrTeachers && arrTeachers.length > 0 &&
                                arrTeachers.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.avatar) {
                                        imageBase64 = new Buffer(item.avatar, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.value_vi}: ${item.ho} ${item.ten}`;
                                    let nameEn = `${item.positionData.value_en}: ${item.ho} ${item.ten}`;

                                    return (
                                        <div className='class-customize' key={index}
                                            onClick={() => this.handleViewDetailTeacher(item)}
                                        >
                                            <div className="class-img stage-teacher-img"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />


                                            <span className='title-under-img'>1</span>
                                            <div className='position text-center'>
                                                <div>{language === languages.VI ? nameVi : nameEn}</div>
                                                {/* <div>{item.viTriID}</div> */}
                                            </div>
                                        </div>
                                    )
                                })}

                        </Slider>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topTeachersRedux: state.admin.topTeachers,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopTeachers: () => dispatch(actions.fetchTopTeacher())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherInfo));
