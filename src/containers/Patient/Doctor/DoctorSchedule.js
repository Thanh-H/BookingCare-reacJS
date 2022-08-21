
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss'
import localization from 'moment/locale/vi'
import moment from 'moment';
import Bookingmodal from './BookingModal';

class ScheduleDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alldays: [],
            allAvalableTime: '',
            isOpenModalBooking: false,
            dataScheduleTime: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props
        if (prevProps.language !== this.props.language) {
            this.setArrday(language)
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let startLoadingAllday = this.setArrday(language)
        await this.props.getScheduleDoctorByDate(this.props.idFromParent, startLoadingAllday[0].value)
        this.setState({ allAvalableTime: this.props.scheduleOfADoctorByDate })
    }
    setArrday(language) {
        let alldays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    object.label = `Hôm nay-${moment(new Date()).format('DD/MM')}`
                } else { object.label = moment(new Date()).add(i, 'days').format('dddd-DD/MM') }
            } else {
                if (i === 0) {
                    object.label = `Today-${moment(new Date()).format('DD/MM')}`
                } else { object.label = moment(new Date()).add(i, 'days').locale('en').format("dddd-DD/MM") }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            alldays.push(object)
        }
        this.setState({
            alldays: alldays
        })
        return alldays
    }

    async handleOnchangeSelect(event) {
        await this.props.getScheduleDoctorByDate(this.props.idFromParent, event.target.value)
        this.setState({ allAvalableTime: this.props.scheduleOfADoctorByDate })
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTime: time
        })
    }

    closeBookingclose = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {

        let { alldays, allAvalableTime, isOpenModalBooking, dataScheduleTime } = this.state
        let { language } = this.props
        return (<>
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {alldays && alldays.length > 0 && alldays.map((item, index) => {
                            return (
                                <option value={item.value} key={index}> {item.label} </option>
                            )
                        })}
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='  fas fa-calendar-alt'></i>
                        <span> <FormattedMessage id='patient.detail-doctor.schedule' /> </span>
                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                                {allAvalableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (<button onClick={() => this.handleClickScheduleTime(item)}
                                        className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'} key={index}> {timeDisplay}
                                    </button>)
                                })}
                                <div className='book-free'>
                                    <span> <FormattedMessage id='patient.detail-doctor.choose' />
                                        &nbsp; <i className='far fa-hand-point-up'>  &nbsp; <FormattedMessage id='patient.detail-doctor.and-book-free' />  </i>
                                    </span>
                                </div>
                            </>
                            :
                            <div className='no-chedule'> <FormattedMessage id='patient.detail-doctor.no-schedule' /> </div>}
                    </div>
                </div>

            </div>
            <Bookingmodal
                isOpenModalBooking={isOpenModalBooking}
                closeBookingclose={this.closeBookingclose}
                dataTime={dataScheduleTime}

            />
        </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctorRedux: state.admin.detailDoctor,
        scheduleOfADoctorByDate: state.admin.scheduleOfADoctorByDate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
        getScheduleDoctorByDate: (doctorId, date) => dispatch(actions.getScheduleDoctorByDate(doctorId, date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
