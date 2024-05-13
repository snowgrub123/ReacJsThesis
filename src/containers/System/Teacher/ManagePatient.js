import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { languages, crud_actions, dateFormat } from '../../../utils'
// import DatePicker from 'react-flatpickr';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleTeacherService } from "../../../services/accService"
import { getAllPatient } from '../../../services/accService';
// import { getScheduleTeacherByDateService, getExtraTeacherByIDService } from '../../../../services/accService';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }
    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state
        let FormatedDate = new Date(currentDate).getTime()
        this.getDataPatient(user, FormatedDate)
        // console.log("Check respone from Manage Patient", respone)
    }

    getDataPatient = async (user, FormatedDate) => {
        let respone = await getAllPatient({
            giaoVienID: user.id,
            date: FormatedDate
        })
        if (respone && respone.errCode === 0) {
            this.setState({
                dataPatient: respone.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnChangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state
            let FormatedDate = new Date(currentDate).getTime()
            this.getDataPatient(user, FormatedDate)
        })
    }
    handleBtnConfirm = () => {

    }
    handleBtnSent = () => {

    }
    render() {
        console.log('check user form patient', this.state)
        let { language } = this.props
        let { dataPatient } = this.state
        return (
            <div className='manage-patient-container'>
                <div className='m-s-title'>
                    <FormattedMessage
                        id="manage-patient.title"
                    />
                </div>
                <div className='manage-patient-body'>
                    <div className='col-12 form-group'>
                        <label><FormattedMessage
                            id="manage-patient.title"
                        /></label>
                        <DatePicker className='form-control'
                            value={this.state.currentDate}
                            onChange={this.handleOnChangDatePicker}
                        />
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>Số Thứ Tự</th>
                                        <th>Thời Gian Khám</th>
                                        <th>Tên Bệnh Nhân</th>
                                        <th>Địa Chỉ</th>
                                        <th>Gioi tinh</th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeTypeDataPatient.value_vi}</td>
                                                    <td>{item.benhNhanData.ten}</td>
                                                    <td>{item.benhNhanData.diaChi}</td>
                                                    <td>{item.benhNhanData.genderData.value_vi}</td>
                                                    <td>
                                                        <button className='btn-confirm-mp'
                                                            onClick={(this.handleBtnConfirm())}
                                                        >Xác nhận</button>
                                                        <button className='btn-sent-mp'
                                                            onClick={(this.handleBtnSent())}
                                                        >Gửi hóa đơn</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        : <tr>
                                            Không có lịch hẹn trong Thời gian này!
                                        </tr>
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
