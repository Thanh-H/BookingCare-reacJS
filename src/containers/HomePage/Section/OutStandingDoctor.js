
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';

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
    render() {
        let { arrDoctors } = this.state;
        let { language } = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Bác sĩ nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
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
                                        console.log('ssssss', imageBase64)
                                    }
                                    return (
                                        <div className='section-customize'>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div style={{ backgroundImage: `url(${imageBase64})` }} className='bg-image image-outstanding-doctor ' />
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.EN ? nameEn : nameVi}</div>
                                                    <div>cơ xương khớp 1</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
