
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from './DoctorSchedule';
import './DetailDoctor.scss'
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentDidMount() {
        this.props.fetchDetailDoctor(this.props.match.params.id)
    }

    render() {
        let { detailDoctorRedux, language } = this.props
        let nameEn = '', nameVi = '';
        if (detailDoctorRedux && detailDoctorRedux.positionData) {
            nameVi = `${detailDoctorRedux.positionData.valueVi} ${detailDoctorRedux.lastName + " " + detailDoctorRedux.firstName} `
            nameEn = `${detailDoctorRedux.positionData.valueEn} ${detailDoctorRedux.firstName + " " + detailDoctorRedux.lastName} `
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='detail-doctor-container'>
                    <div className='doctor-intro'>
                        <div style={{ backgroundImage: `url(${detailDoctorRedux && detailDoctorRedux.image ? detailDoctorRedux.image : ''})` }} className='doctor-avatar'></div>
                        <div className='doctor-overview'>
                            <h1 > {language === LANGUAGES.EN ? nameEn : nameVi}</h1>
                            {detailDoctorRedux && detailDoctorRedux.Markdown &&
                                detailDoctorRedux.Markdown.description && <p>
                                    {detailDoctorRedux.Markdown.description}
                                </p>}
                        </div>
                    </div>

                    <div className='schedule-doctor' >
                        <div className='content-left'>
                            <DoctorSchedule
                                idFromParent={this.props.match.params.id} />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                idFromParent={this.props.match.params.id} />
                        </div>

                    </div>

                    <div className='detail-intro-doctor'> {detailDoctorRedux && detailDoctorRedux.Markdown && detailDoctorRedux.Markdown.contentHTML &&
                        <div dangerouslySetInnerHTML={{ __html: detailDoctorRedux.Markdown.contentHTML }}></div>}
                    </div>

                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctorRedux: state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
