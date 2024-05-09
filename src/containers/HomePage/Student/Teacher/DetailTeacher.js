import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader';
import './DetailTeacher.scss'
import { getDetailTeacherInfoService } from '../../../../services/accService';
import { languages } from '../../../../utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TeacherSchedule from './TeacherSchedule';
import TeacherExtrainfor from './TeacherExtrainfor';

class DetailTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailTeacher: {},
            currentTeacherID: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentTeacherID: id
            })
            let res = await getDetailTeacherInfoService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailTeacher: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { language } = this.props;
        let { detailTeacher } = this.state;
        let nameVi = '', nameEn = '';
        if (detailTeacher && detailTeacher.positionData) {
            nameVi = `${detailTeacher.positionData.value_vi},${detailTeacher.ho},${detailTeacher.ten}`
            nameEn = `${detailTeacher.positionData.value_en},${detailTeacher.ho},${detailTeacher.ten}`
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='teacher-detail-container'>
                    <div className='intro-teacher'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailTeacher && detailTeacher.avatar ? detailTeacher.avatar : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === languages.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailTeacher && detailTeacher.markdown
                                    && detailTeacher.markdown.moTa
                                    &&
                                    <span>
                                        {detailTeacher.markdown.moTa}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-teacher'>
                        <div className='content-left'>
                            <TeacherSchedule
                                teacherIDFromParent={this.state.currentTeacherID}
                            />
                        </div>
                        <div className='content-right'>
                            <TeacherExtrainfor
                                teacherIDFromParent={this.state.currentTeacherID}
                            />
                        </div>

                    </div>
                    <div className='detail-infor-teacher'>
                        {detailTeacher && detailTeacher.markdown
                            && detailTeacher.markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailTeacher.markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment-teacher'></div>
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeacher);
