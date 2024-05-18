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
import _, { create } from 'lodash';
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
                let dataProvince = responeProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        value_en: 'ALL',
                        value_vi: 'Toàn Quốc',

                    })
                }

                this.setState({
                    detailSpecialty: res.data,
                    arrDortorID: arrDortorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialty({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
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
                })
            }
        }
    }

    render() {
        let { language } = this.props
        let { arrDortorID, detailSpecialty, listProvince } = this.state

        return (
            <>
                <HomeHeader></HomeHeader>
                <div className='specialty-detail-container'>
                    <div className='detail-specialty-body'>
                        <div className='desciption-specialty'>
                            {detailSpecialty && !_.isEmpty(detailSpecialty)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: detailSpecialty.mieuTaHTML }}>

                                </div>
                            }

                        </div>
                        <div className='sreach-province' >
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
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
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
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
            </>

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
