
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailClinic.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById } from '../../../services/userService'
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter'
import { withRouter } from 'react-router';


class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailClinicById(id, 'ALL')

            console.log(res)
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => { arrDoctorId.push(item.doctorId) })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }



    handleOnchangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = e.target.value
            let res = await getDetailClinicById(id, location)
            // let resProvince = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => { arrDoctorId.push(item.doctorId) })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,

                })
            }
        }

    }


    handleViewDetailDoctor = (doctorId) => {
        this.props.history.push(`/detail-doctor/${doctorId}`)
    }

    render() {

        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props
        console.log(this.state)
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-special-body'>
                        <div className='description-specialty'>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>}
                        </div>

                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    isShowprice={false}
                                                    doctorId={item}
                                                    isShowDescription={true}
                                                />
                                            </div>
                                            <div onClick={() => this.handleViewDetailDoctor(item)} className='more-doctor-infor'>
                                                <FormattedMessage id='homepage.more-infor'
                                                /> </div>
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
                    <HomeFooter />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
