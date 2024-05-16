import React, { Component } from 'react';
import { connect } from "react-redux";
// import { getScheduleTeacherByDateService, getExtraTeacherByIDService } from '../../../../services/accService';
// import { languages } from '../../../../utils';
import { withRouter } from 'react-router';
import { postConFirmBookAppointmentService } from '../../../services/accService';
import HomeHeader from '../HomeHeader';
import './ConfirmBookEmail.scss'

class ConfirmBookEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusConfirm: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorID = urlParams.get('giaoVienID');

            let respone = await postConFirmBookAppointmentService({
                token: token,
                giaoVienID: doctorID
            })
            if (respone && respone.errCode === 0) {
                this.setState({
                    statusConfirm: true,
                    errCode: respone.errCode
                })
            } else {
                this.setState({
                    statusConfirm: true,
                    errCode: respone && respone.errCode ? respone.errCode : -1
                })
            }
            if (this.props.match && this.props.match.params && this.props.match.params) {


            }

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let { language } = this.props
        let { statusConfirm, errCode } = this.state
        return (
            <>
                <HomeHeader></HomeHeader>
                {/* <table style={{ width: '100%' }}> */}

                <div className='confirm-container' style={{ marginTop: '100px' }}>
                    {statusConfirm === false ?
                        <div>Loading Data</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='respone-booking-infor'>Bạn đã xác nhận lịch hẹn thành công</div>
                                :
                                <div className='respone-booking-infor'>Bạn đã xác nhận lịch hẹn thất bại do lịch hẹn đã được xác nhận hoặc không tồn tại, vui lòng kiểm tra lại!</div>

                            }

                        </div>
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmBookEmail));
