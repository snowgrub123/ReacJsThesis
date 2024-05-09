import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader';
import './TeacherSchedule.scss'
import { languages } from '../../../../utils';
// import Select from 'react-select'
import { Alert, Label } from 'reactstrap';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleTeacherByDateService } from '../../../../services/accService'
import { event } from 'jquery';
import { FormattedMessage } from 'react-intl';
import BookingModal from '../Modal/BookingModal';
class TeacherSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimModal: {}
        };
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrayDays(language);
        this.setState({
            allDays: allDays,
        })
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrayDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === languages.VI) {
                if (i === 0) {
                    let dayMonth = moment(new Date()).format('DD/MM');//24/6
                    let today = `Hôm nay - ${dayMonth}`
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            } else {
                if (i === 0) {
                    let dayMonth = moment(new Date()).format('DD/MM');//24/6
                    let today = `Today - ${dayMonth}`
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object)
        }

        // console.log('arrDate', arrDate)
        return allDays;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrayDays(this.props.language);
            this.setState({
                allDays: allDays
            })

        }
        if (this.props.teacherIDFromParent !== prevProps.teacherIDFromParent) {
            let allDays = this.getArrayDays(this.props.language);
            let res = await getScheduleTeacherByDateService(this.props.teacherIDFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })

        }

    }
    handleOnChangeSelect = async (event) => {
        if (this.props.teacherIDFromParent && this.props.teacherIDFromParent !== -1) {
            let teacherID = this.props.teacherIDFromParent;
            console.log("check id", teacherID)

            let date = event.target.value
            console.log("check data", date)
            let res = await getScheduleTeacherByDateService(teacherID, date)


            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log("check res schedule", res)
        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimModal: time
        })
        // console.log('time checkkk ', time)
    }
    closeBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimModal } = this.state;
        // console.log("check timetype", this.state.allAvailableTime)

        let { language } = this.props;
        // let options = [
        //     { label: 'Date 2', value: '2' },
        //     { label: 'Date 3', value: '3' },
        //     { label: 'Date 4', value: '4' }
        return (
            <>
                <div className='teacher-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}

                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'></i>
                            {/* "student": {
        "detail-teacher": {
            "schedule": "Lịch khám"
        } */}
                            <span> <FormattedMessage id="student.detail-teacher.schedule" /></span>


                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btn'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === languages.VI ?
                                                item.timeTypeData.value_vi : item.timeTypeData.value_en;
                                            return (
                                                <button
                                                    key={index}
                                                    className={language === languages.VI ? 'btn-vi' : 'btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span><FormattedMessage id="student.detail-teacher.choose" />
                                            <i class="fas fa-hand-point-up"></i>
                                            <FormattedMessage id="student.detail-teacher.book-free" />
                                        </span>
                                    </div>
                                </>
                                : <div className='no-schedule'><FormattedMessage id="student.detail-teacher.no-schedule" /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBooking={this.closeBooking}
                    dataTime={dataScheduleTimModal}
                />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSchedule);
