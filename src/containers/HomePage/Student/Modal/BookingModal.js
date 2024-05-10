import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages } from '../../../../utils';
import { Modal } from 'reactstrap';
import './BookingModal.scss';
import _ from 'lodash'
import ProfileTeacher from '../Teacher/ProfileTeacher';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../../store/actions";
// import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select'
import moment from 'moment';
import { toast } from 'react-toastify';
import { postPatientBookingAppointmentService } from "../../../../services/accService"
import DatePicker from '../../../../components/Input/DatePicker';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            timeType: '',
            giaoVienID: '',
            selectedGender: '',
        }
    }
    async componentDidMount() {
        this.props.getGenders();
    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.lable = language === languages.VI ? item.value_vi : item.value_en;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }
    handleOnChangInput = (event, id) => {
        let valueInput = event.target.value;
        let copySate = { ...this.state };
        copySate[id] = valueInput;
        this.setState({
            ...copySate
        })
    }

    handleOnChangDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let res = await postPatientBookingAppointmentService({
            fullname: this.state.fullname,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            giaoVienID: this.state.giaoVienID,
        })
        console.log('Res confirm', res)
        if (res && res.errCode === 0) {
            toast.success('Đặt Lịch khám bệnh thành công!')
            this.props.closeBooking();
        } else {
            toast.error('Đặt Lịch khám bệnh không thành công!')

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let giaoVienID = this.props.dataTime.giaoVienID;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    giaoVienID: giaoVienID,
                    timeType: timeType
                })
            }

        }
        // if (this.props.dataTime !== prevProps.dataTime) {
        //     this.setState({
        //         genders: this.buildDataGender(this.props.genders)
        //     })
        // } dataTime
    }
    render() {
        let { isOpenModal, closeBooking, dataTime } = this.props;
        // console.log("Check props from modal", this.props)
        let giaoVienID = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            giaoVienID = dataTime.giaoVienID
        }
        // console.log('check gender', this.state.genders)
        // console.log('check selected', this.state.selectedGender)

        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className='right'
                            onClick={closeBooking}
                        ><i className='fas fa-times'></i></span>
                        <div className='price'>
                            <FormattedMessage id="patient.booking-modal.price" />
                            : 500.0000 VND
                        </div>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='teaher-infor'>
                            <ProfileTeacher
                                giaoVienID={giaoVienID}
                                isShowDescriptionTeacher={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input className='form-control'
                                    value={this.state.fullname}
                                    onChange={(event) => this.handleOnChangInput(event, 'fullname')}
                                >
                                </input>
                            </div>
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangInput(event, 'phoneNumber')}
                                >
                                </input>
                            </div>
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangInput(event, 'email')}
                                >
                                </input>
                            </div>
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangInput(event, 'address')}
                                >
                                </input>
                            </div>
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangInput(event, 'reason')}
                                >
                                </input>
                            </div>
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    value={this.state.birthday}
                                    onChange={this.handleOnChangDatePicker}
                                />
                            </div>
                            <div className='col-6 gender'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnChangSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeBooking}
                        >
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
