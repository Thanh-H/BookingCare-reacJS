
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss'
import localization from 'moment/locale/vi'
import moment from 'moment';

class ScheduleDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alldays: []
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
        console.log('check allday when loading', startLoadingAllday)
        await this.props.getScheduleDoctorByDate(this.props.id, startLoadingAllday[0].value)
    }
    setArrday(language) {
        let alldays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('ddd-DD/MM')
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd-DD/MM")
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
        await this.props.getScheduleDoctorByDate(this.props.detailDoctorRedux.id, event.target.value)
    }

    render() {
        console.log("check schedule by redux", this.props.ScheduleOfADoctorByDate)
        let { alldays } = this.state
        return (
            <div className='doctor-schedule-container'>
                <select onChange={(event) => this.handleOnchangeSelect(event)}>
                    {alldays && alldays.length > 0 && alldays.map((item, index) => {
                        return (
                            <option value={item.value} key={index}> {item.label} </option>
                        )
                    })}
                </select>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctorRedux: state.admin.detailDoctor,
        ScheduleOfADoctorByDate: state.admin.ScheduleOfADoctorByDate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
        getScheduleDoctorByDate: (doctorId, date) => dispatch(actions.getScheduleDoctorByDate(doctorId, date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
