import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
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

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTeachers: [],
            selectedTeacher: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllTeachersRedux();
        this.props.fetchAllScheduleTimeRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allTeachers !== this.props.allTeachers) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers)

            this.setState({
                listTeachers: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data.map(item => {
                    item.isSelected = false;
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.ho} ${item.ten}`;
                let labelEn = `${item.ten} ${item.ho}`;

                object.label = language === languages.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedTeacher: selectedOption });
    }
    handleOnChangeDataPicker = (date) => {
        this.setState({ currentDate: date[0] });
    }
    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id == time.id)
                    item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleOnClickSave = async () => {
        let { rangeTime, selectedTeacher, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Thiếu ngày!")
            return;
        }
        if (selectedTeacher && _.isEmpty(selectedTeacher)) {
            toast.error("Thiếu Teacher!")
            return;

        }
        // let FormatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let FormatedDate = new Date(currentDate + 1).getTime()
        console.log("format", FormatedDate)
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let newArry = {};
                    newArry.giaoVienID = selectedTeacher.value;
                    newArry.date = FormatedDate;
                    newArry.timeType = schedule.keyMap;
                    console.log("Chekk time type reacf,", schedule)
                    result.push(newArry)
                })

            } else {
                toast.error("invalid selected")
                return;
            }
        }
        let res = await saveBulkScheduleTeacherService({
            arrSchedule: result,
            giaoVienID: selectedTeacher.value,
            FormatedDate: FormatedDate,

        })

        if (res && res.errCode === 0) {
            toast.success("Save infor succed!")
        } else {
            toast.error('error save saveBulkScheduleTeacherService');
            console.log('error save saveBulkScheduleTeacherService', res);

        }
        console.log("check selected time: ", result)


    }

    render() {
        let { rangeTime } = this.state;
        let { language } = this.state;
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log("check yesterday", yesterday)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage
                        id="manage-schedule.title"
                    />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 from-group'>
                            <label ><FormattedMessage id="manage-schedule.title" /></label>
                            <Select
                                value={this.state.selectedTeacher}
                                onChange={this.handleChangeSelect}
                                options={this.state.listTeachers}
                            />
                        </div>
                        <div className='col-6 date from-group'>
                            <label c><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                className="from-control"
                                value={this.state.currentDate}
                                onChange={this.handleOnChangeDataPicker}
                                minDate={yesterday}
                            />
                        </div>

                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className=
                                            {item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            onClick={() => this.handleClickButtonTime(item)}
                                            key={index}>
                                            {language === languages.VI ? item.value_vi : item.value_en}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleOnClickSave()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allTeachers: state.admin.allTeachers,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTeachersRedux: () => dispatch(actions.fetchAllTeachers()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
