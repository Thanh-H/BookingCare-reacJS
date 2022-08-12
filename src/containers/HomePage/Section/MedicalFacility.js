
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'


import Slider from 'react-slick';
class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image image-MedicalFacility' />
                                <div>Hệ thống Y tế Thu Cúc TCI 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image image-MedicalFacility' />
                                <div>Hệ thống Y tế Thu Cúc TCI 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image image-MedicalFacility' />
                                <div>Hệ thống Y tế Thu Cúc TCI 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image image-MedicalFacility' />
                                <div>Hệ thống Y tế Thu Cúc TCI 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image image-MedicalFacility' />
                                <div>Hệ thống Y tế Thu Cúc TCI 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image image-MedicalFacility' />
                                <div>Hệ thống Y tế Thu Cúc TCI 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
