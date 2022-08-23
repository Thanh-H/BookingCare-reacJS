
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [31, 32, 33]
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentDidMount() {

    }

    render() {
        let { arrDoctorId } = this.state
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-special-body'>
                        <div className='description-specialty'>
                        </div>
                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescription={true}
                                                />
                                            </div>
                                        </div>

                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    idFromParent={item}
                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor
                                                    idFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>


            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
