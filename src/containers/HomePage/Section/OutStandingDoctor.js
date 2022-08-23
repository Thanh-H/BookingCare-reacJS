
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

import Slider from 'react-slick';
import { times } from 'lodash';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let { arrDoctors } = this.state;
        let { language } = this.props;

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.outstanding-doctor' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let nameVi = `${item.positionData.valueVi} ${item.lastName + " " + item.firstName} `
                                    let nameEn = `${item.positionData.valueEn} ${item.firstName + " " + item.lastName} `
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');

                                    }
                                    return (
                                        <div onClick={() => this.handleViewDetailDoctor(item)} className='section-customize'>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div style={{ backgroundImage: `url(${imageBase64})` }} className='bg-image image-outstanding-doctor ' />
                                                </div>
                                                <div className='position text-center'>
                                                    <div className='doctor-name'>{language === LANGUAGES.EN ? nameEn : nameVi}</div>
                                                    <div className='name'>cơ xương khớp 1</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        topDoctorRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctor(limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
