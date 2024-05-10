import React, { Component } from 'react';
import { connect } from "react-redux";
// import { getSchedulespecialtyByDateService, getExtraspecialtyByIDService } from '../../../../services/accService';
import { languages } from '../../../../utils';
import './DetailSpecialty.scss'
import Header from '../../../Header/Header';
import HomeHeader from '../../HomeHeader';
import TeacherSchedule from '../Teacher/TeacherSchedule';
import TeacherExtrainfor from '../Teacher/TeacherExtrainfor';
import ProfileTeacher from '../Teacher/ProfileTeacher'
import { getDetailSpecialty, getAllCodeService } from '../../../../services/accService';
import _ from 'lodash';
import { event } from 'jquery';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDortorID: [],
            detailSpecialty: {},
            listProvince: [],
            // currentSpecialtyID: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialty({
                id: id,
                location: 'ALL'
            });
            let responeProvince = await getAllCodeService('PROVINCE')
            console.log('Khang chec', responeProvince)

            if (res && res.errCode === 0 && responeProvince && responeProvince.errCode === 0) {
                let data = res.data;
                let arrDortorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorsSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDortorId.push(item.giaoVienID)
                        })
                    }
                }

                this.setState({
                    detailSpecialty: res.data,
                    arrDortorID: arrDortorId,
                    listProvince: responeProvince.data
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnchangProvince = (event) => {
        console.log("Check onChange", event.target.value)
    }

    render() {
        let { language } = this.props
        let { arrDortorID, detailSpecialty, listProvince } = this.state

        return (
            <div className='specialty-detail-container'>
                <HomeHeader></HomeHeader>
                <div className='detail-specialty-body'>
                    <div className='desciption-specialty'>
                        {detailSpecialty && !_.isEmpty(detailSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailSpecialty.mieuTaHTML }}>

                            </div>
                        }

                    </div>
                    <div className='sreach-province' >
                        <select onChange={(event) => this.handleOnchangProvince(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.keyMap}
                                        >
                                            {language === languages.VI ? item.value_vi : item.value_en}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    {arrDortorID && arrDortorID.length > 0 &&
                        arrDortorID.map((item, index) => {
                            return (<div className='each-doctors'
                                key={index}
                            >
                                <div className='content-left-detail'>
                                    <div className='teaher-infor'>
                                        <ProfileTeacher
                                            giaoVienID={item}
                                            isShowDescriptionTeacher={true}
                                        // dataTime={dataTime}
                                        />
                                    </div>

                                </div>
                                <div className='content-right-detail'>
                                    <div >
                                        <TeacherSchedule
                                            teacherIDFromParent={item}
                                        />
                                    </div>
                                    <div><TeacherExtrainfor
                                        teacherIDFromParent={item}
                                    /></div>

                                </div>
                            </div>


                            )
                        })
                    }

                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
