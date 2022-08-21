
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import './BookingModal.scss'
import { Modal } from 'reactstrap'
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    async componentDidMount() {
    }


    render() {
        let { isOpenModalBooking, closeBookingclose, dataTime } = this.props
        let doctorId = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Modal
                isOpen={isOpenModalBooking}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thông tin dat lich kham benh</span>
                        <span className="right"
                            onClick={closeBookingclose}
                        > <i className="fas fa-times"></i> </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                            />
                        </div>
                        <div className="price">

                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label > Ho ten</label>
                                <input className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label > so dien thoai</label>
                                <input className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label > dia chi email</label>
                                <input className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label > dia chi lien he</label>
                                <input className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label > ly do kham</label>
                                <input className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label > dat cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className="col-6 form-group">
                                <label > gioi tinh</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"
                            onClick={closeBookingclose}
                        > xac nhan </button>
                        <button className="btn-booking-cancle"
                            onClick={closeBookingclose}
                        > cancle </button>
                    </div>
                </div>

            </Modal>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
