
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import './BookingModal.scss'
import { Modal } from 'reactstrap'
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';
import * as action from '../../../store/actions'
import Select from 'react-select'
import { postPatientBookAppointment } from '../../../services/userService'
import { toast } from 'react-toastify'
import { LANGUAGES } from '../../../utils';
import moment from 'moment';



class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            isComfirmLoading: false
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language || prevProps.genders !== this.props.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime || prevProps.language !== this.props.language) {
            this.setState({
                doctorId: this.props.dataTime.doctorId,
                timeType: this.props.dataTime.timeType
            })
        }
    }

    buildDataGender = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language = LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })

    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        let timeString = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - DD/MM/YYYY')
            timeString = `${time + ' ' + date}`
        }
        return timeString
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        let name = ''
        if (dataTime && dataTime.doctorData) {
            name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName + ' ' + dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName + ' ' + dataTime.doctorData.lastName}`

        }
        return name
    }

    handleComfirmBooking = async () => {

        let { dataTime } = this.props
        let arrCheckInput = ['fullName', 'phonenumber', 'email', 'address', 'reason', 'birthday', 'selectedGender', 'genders', 'timeType']
        let isValid = true
        for (let i = 0; i < arrCheckInput.length; i++) {
            if (!this.state[arrCheckInput[i]]) {
                isValid = false
                toast.warn('Missing' + ' ' + arrCheckInput[i])
                break
            }
        }
        if (isValid === true) {
            this.setState({
                isComfirmLoading: true
            })
            let date = new Date(this.state.birthday).getTime();
            let doctorName = this.buildDoctorName(dataTime)
            let timeString = this.buildTimeBooking(dataTime)
            let res = await postPatientBookAppointment({
                fullName: this.state.fullName,
                phonenumber: this.state.phonenumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: date,
                selectedGender: this.state.selectedGender,
                doctorId: this.state.doctorId,
                genders: this.state.genders,
                timeType: this.state.timeType,
                language: this.props.language,
                doctorName: doctorName,
                timeString: timeString
            })

            if (res && res.errCode === 0) {
                toast.success('Booking a new appointment succeed')
                this.props.closeBookingclose()
                this.setState({
                    isComfirmLoading: false
                })
            } else {
                toast.error('Booking a new appoitment failed')
            }
        }
    }

    handleCloseModal = () => {
        this.props.closeBookingclose()
        this.setState({
            isComfirmLoading: false
        })
    }
    render() {
        let { isComfirmLoading, fullName, phonenumber, email, address, reason, birthday, doctorId, selectedGender, genders, timeType } = this.state
        let { isOpenModalBooking, closeBookingclose, dataTime } = this.props

        return (
            <Modal
                isOpen={isOpenModalBooking}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"><FormattedMessage id='patient.booking-modal.title' /></span>
                        <span className="right"
                            onClick={closeBookingclose}
                        > <i className="fas fa-times"></i> </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="price">

                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id='patient.booking-modal.fullName' /> </label>
                                <input className='form-control'
                                    value={fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id='patient.booking-modal.phonenumber' /></label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeInput(event, 'phonenumber')}
                                    value={phonenumber}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id='patient.booking-modal.email' /></label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    value={email}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id='patient.booking-modal.address' /></label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    value={address}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    value={reason}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker className='form-control'
                                    onChange={this.handleOnchangeDatePicker}
                                    value={birthday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id='patient.booking-modal.gender' /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        {isComfirmLoading === true ?
                            <i className=" is-comfrim-loading fas fa-hourglass-half"></i>
                            :
                            <button onClick={() => this.handleComfirmBooking()}
                                className="btn-booking-confirm"
                            > <FormattedMessage id='patient.booking-modal.btnConfirm' /> </button>}
                        <button className="btn-booking-cancle"
                            onClick={() => this.handleCloseModal()}
                        > <FormattedMessage id='patient.booking-modal.btnCancel' /> </button>
                    </div>
                </div>

            </Modal>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(action.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
