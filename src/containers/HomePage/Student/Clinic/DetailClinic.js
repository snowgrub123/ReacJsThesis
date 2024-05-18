import React, { Component } from 'react';
import { connect } from "react-redux";
// import { getSchedulespecialtyByDateService, getExtraspecialtyByIDService } from '../../../../services/accService';
import { languages } from '../../../../utils';
import './DetailClinic.scss'
import Header from '../../../Header/Header';
import HomeHeader from '../../HomeHeader';
import TeacherSchedule from '../Teacher/TeacherSchedule';
import TeacherExtrainfor from '../Teacher/TeacherExtrainfor';
import ProfileTeacher from '../Teacher/ProfileTeacher'
import { getDetailClinic, getAllCodeService } from '../../../../services/accService';
import _, { create } from 'lodash';
import { event } from 'jquery';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDortorID: [],
            DetailClinic: {},
            // currentSpecialtyID: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinic({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDortorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.clinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDortorId.push(item.giaoVienID)
                        })
                    }
                }

                this.setState({
                    DetailClinic: res.data,
                    arrDortorID: arrDortorId,
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    // handleOnchangeSelect = async (event) => {
    //     if (this.props.match && this.props.match.params && this.props.match.params.id) {
    //         let id = this.props.match.params.id;
    //         let location = event.target.value;
    //         let res = await getDetailClinic({
    //             id: id,
    //             location: location
    //         });

    //         if (res && res.errCode === 0) {
    //             let data = res.data;
    //             let arrDortorId = [];
    //             if (data && !_.isEmpty(res.data)) {
    //                 let arr = data.doctorsSpecialty;
    //                 if (arr && arr.length > 0) {
    //                     arr.map(item => {
    //                         arrDortorId.push(item.giaoVienID)
    //                     })
    //                 }
    //             }
    //             this.setState({
    //                 DetailClinic: res.data,
    //                 arrDortorID: arrDortorId,
    //             })
    //         }
    //     }
    // }

    render() {
        let { language } = this.props
        let { arrDortorID, DetailClinic } = this.state
        console.log('check state clinic', this.state)

        return (
            <>
                {/* <div className='header-container-specialty'> */}
                <HomeHeader></HomeHeader>
                {/* </div> */}
                <div className='specialty-detail-container'>
                    <div className='detail-specialty-body'>
                        <div className='desciption-specialty'>
                            {DetailClinic && !_.isEmpty(DetailClinic)
                                &&
                                <>
                                    <div><h1>{DetailClinic.tenPhongKham}</h1></div>
                                    <div>Địa chỉ: {DetailClinic.diaChi}</div>
                                    <div dangerouslySetInnerHTML={{ __html: DetailClinic.mieuTaHTML }}>
                                    </div>
                                </>

                            }

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
