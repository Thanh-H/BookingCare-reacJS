
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss'
import { getExtraInforDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.idFromParent !== this.props.idFromParent || prevProps.language !== this.props.language) {
            let res = await getExtraInforDoctorById(this.props.idFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidMount() {
        let res = await getExtraInforDoctorById(this.props.idFromParent)
        if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.data
            })
        }
    }

    showHideDetailinfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props
        console.log('check extra infor ', extraInfor)
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id='patient.extra-infor-doctor.text-address' />
                    </div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="short-infor">
                            <FormattedMessage id='patient.extra-infor-doctor.price' />
                            {extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />

                            }
                            {extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />

                            }
                            <span onClick={() => this.showHideDetailinfor(true)} >
                                <FormattedMessage id='patient.extra-infor-doctor.detail' />
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price">
                                <FormattedMessage id='patient.extra-infor-doctor.price' />
                            </div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">  <FormattedMessage id='patient.extra-infor-doctor.price' /></span>
                                    <span className="right">
                                        {extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }</span>
                                </div>
                                <div className="note">
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id='patient.extra-infor-doctor.payment' />
                                {extraInfor && extraInfor.paymentData && language === LANGUAGES.VI &&
                                    extraInfor.paymentData.valueVi
                                }
                                {extraInfor && extraInfor.paymentData && language === LANGUAGES.EN &&
                                    extraInfor.paymentData.valueEn
                                }
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHideDetailinfor(false)}>
                                    <FormattedMessage id='patient.extra-infor-doctor.hide-price' />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
