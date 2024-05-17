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
import { getAllPatient, postBilltoPatient } from '../../../services/accService';
// import { getScheduleTeacherByDateService, getExtraTeacherByIDService } from '../../../../services/accService';
import ModalBill from './ModalBill';
import { Modal } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenBillModal: false,
            dataFromModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {

        this.getDataPatient()
        // console.log("Check respone from Manage Patient", respone)
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state
        let FormatedDate = new Date(currentDate).getTime()
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
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleBtnConfirm = (item) => {
        console.log("check item ", item)
        // return
        // alert('click me')
        let data = {
            giaoVienID: item.giaoVienID,
            email: item.benhNhanData.email,
            benhNhanID: item.benhNhanID,
            timeType: item.timeType,
            patientName: item.benhNhanData.ten,
        }
        this.setState({
            isOpenBillModal: true,
            dataFromModal: data
        })
        // console.log("check data from manage patient", data)
    }

    closeBillModal = () => {
        this.setState({
            isOpenBillModal: false,
            dataFromModal: {}
        })
    }
    sendBillFormParent = async (dataFromModalChild) => {
        let { dataFromModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        console.log("check data from modal Child", dataFromModalChild)
        let respone = await postBilltoPatient({
            email: dataFromModalChild.email,
            imgBase64: dataFromModalChild.imgBase64,
            giaoVienID: dataFromModal.giaoVienID,
            timeType: dataFromModal.timeType,
            benhNhanID: dataFromModal.benhNhanID,
            language: this.props.language,
            patientName: dataFromModal.patientName,

        })
        if (respone && respone.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Bill to Patient succeed!')
            this.closeBillModal()
            await this.getDataPatient()

        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send Bill to Patient Failed!')

        }
        // console.log('check child form patient rés', respone)

    }
    render() {
        // console.log('check user form patient', this.state)
        let { language } = this.props
        let { dataPatient, dataFromModal, isOpenBillModal } = this.state
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading'
                >
                    <div className='manage-patient-container'>
                        <div className='m-s-title'>
                            <FormattedMessage
                                id="menu.teacher.manage-patient"
                            />
                        </div>
                        <div className='manage-patient-body'>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage
                                    id="menu.teacher.manage-patient"
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
                                                    let time = language === languages.VI ? item.timeTypeDataPatient.value_vi : item.timeTypeDataPatient.value_en
                                                    let gender = language === languages.VI ? item.benhNhanData.genderData.value_vi : item.benhNhanData.genderData.value_en

                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{time}</td>
                                                            <td>{item.benhNhanData.ten}</td>
                                                            <td>{item.benhNhanData.diaChi}</td>
                                                            <td>{gender}</td>
                                                            <td>
                                                                <button className='btn-confirm-mp'
                                                                    onClick={() => (this.handleBtnConfirm(item))}
                                                                >Xác nhận</button>
                                                                {/* <button className='btn-sent-mp'
                                                            onClick={(this.handleBtnSent())}
                                                        >Gửi hóa đơn</button> */}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                : <tr>
                                                    <td colSpan='6' style={{ textAlign: 'center' }}>
                                                        Không có lịch hẹn trong Thời gian này!
                                                    </td>
                                                </tr>
                                            }

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

                    <ModalBill
                        isOpenModal={isOpenBillModal}
                        dataFromModal={dataFromModal}
                        closeBillModal={this.closeBillModal}
                        sendBillFormParent={this.sendBillFormParent}
                    />
                </LoadingOverlay>
            </>

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
