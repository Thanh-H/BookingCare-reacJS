import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
import * as actions from '../../../store/actions/index'
import Select from 'react-select'
import { dateFormat, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listDoctor: [],
            selectedDoctor: "",
            curenDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux ||
            prevProps.language !== this.props.language) {
            let dataOption = this.BuildDataDoctorSelect(this.props.doctorsRedux)
            this.setState({
                listDoctor: dataOption,
            })
        }

        if (prevProps.AllScheduleTime !== this.props.AllScheduleTime) {
            let data = this.props.AllScheduleTime
            if (data && data.length > 0) {
                // data.map((item, index) => {
                //     item.isSlected = false
                //     return item
                // })
                data = data.map(item => { return ({ ...item, isSlected: false }) }
                )
            }
            this.setState({
                rangeTime: data
            })
        }

    }
    BuildDataDoctorSelect = (inputData) => {
        let { language } = this.props
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let nameVi = ` ${item.lastName + ' ' + item.firstName} `
                let nameEn = ` ${item.firstName + ' ' + item.lastName} `
                object.label = language === LANGUAGES.VI ? nameVi : nameEn
                object.value = item.id
                result.push(object)
            })

        }
        return result

    }

    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({ curenDate: date[0] })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        rangeTime.map(item => {
            if (item.id === time.id) {
                item.isSlected = !item.isSlected
            }
        })
        this.setState({ rangeTime: rangeTime })
    }

    handleSaveSchedule() {
        let { selectedDoctor, curenDate, rangeTime } = this.state
        let result = []
        let formatedDate = moment(curenDate).format(dateFormat.SEND_TO_SERVER)
        if (rangeTime && rangeTime.length > 0) {
            let selectTime = rangeTime.filter(item => {
                return (item.isSlected === true)
            })
            if (selectTime && selectTime.length > 0) {
                selectTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value
                    object.timeType = item.keyMap
                    object.date = formatedDate
                    result.push(object)
                })
            } else {
                toast.error('Invalid section time')
            }
        }
        console.log(result)
    }

    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label> <FormattedMessage id='manage-schedule.select-doctor' /> </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label> <FormattedMessage id='manage-schedule.select-date' /> </label>
                            <DatePicker
                                value={this.state.curenDate}
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                minDate={new (Date)}
                            />
                        </div>
                        <div className='col-12 schedule-time-container'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (<div key={index} className='btn-schedule-time'
                                    onClick={() => this.handleClickBtnTime(item)}
                                    style={{ backgroundColor: `${item.isSlected === true ? 'orange' : ''}` }}
                                >
                                    {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                </div>)
                            })}
                        </div>
                        <button onClick={() => this.handleSaveSchedule()} className='btn btn-primary'> save</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        doctorsRedux: state.admin.allDoctors,
        language: state.app.language,
        AllScheduleTime: state.admin.scheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchScheduleTime: () => dispatch(actions.fetchScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
