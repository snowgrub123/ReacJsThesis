import React, { Component } from 'react';
import { connect } from "react-redux";
// import { getScheduleTeacherByDateService, getExtraTeacherByIDService } from '../../../../services/accService';
import { languages } from '../../../../utils';
import './ProfileTeacher.scss'
import { getProfileTeacherByIDService } from '../../../../services/accService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
class ProfileTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    getInforTeacher = async (dataID) => {
        let result = {};
        if (dataID) {
            let res = await getProfileTeacherByIDService(dataID);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        // console.log('result', result)
        return result;
    }
    async componentDidMount() {
        let dataRes = await this.getInforTeacher(this.props.giaoVienID);
        this.setState({
            dataProfile: dataRes
        })
        console.log("data", this.state)
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.giaoVienID !== prevProps.giaoVienID) {

        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ?
                dataTime.timeTypeData.value_vi : dataTime.timeTypeData.value_en;

            let date = language === languages.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('ddd - DD/MM/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn Phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { language, isShowDescriptionTeacher, dataTime } = this.props;
        let { dataProfile } = this.state;
        console.log('Chek dataProfile res', this.state)

        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.value_vi},${dataProfile.ho},${dataProfile.ten}`
            nameEn = `${dataProfile.positionData.value_en},${dataProfile.ho},${dataProfile.ten}`
        }
        return (
            <div className='profile_teacher_container'>
                <div className='intro-teacher'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.avatar ? dataProfile.avatar : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === languages.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionTeacher === true ?
                                <>
                                    {dataProfile && dataProfile.markdown
                                        && dataProfile.markdown.moTa
                                        &&
                                        <span>
                                            {dataProfile.markdown.moTa}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                        </div>
                    </div>
                </div>
                <div className='price'>
                    {dataProfile && dataProfile.priceTypeData && language === languages.VI
                        &&
                        <NumberFormat
                            className='currency'
                            value={dataProfile.teacher_Infor.priceTypeData.value_vi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }

                    {dataProfile && dataProfile.priceTypeData && language === languages.EN
                        &&
                        <NumberFormat
                            className='currency'
                            value={dataProfile.teacher_Infor.priceTypeData.value_en}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'USD'}
                        />
                    }
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTeacher);
