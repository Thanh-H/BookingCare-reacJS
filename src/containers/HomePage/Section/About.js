
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import './about.scss'
import image from '../../../assets/about.PNG'

import Slider from 'react-slick';
class About extends Component {

    render() {



        return (
            <div className='about-me-container'>
                <div className=' row content-container'>
                    <div className=' col-6 content-left'>
                        <span className='title-about'>Truyền thông nói về ThanhCare</span>
                        <iframe src="https://youtube.com/embed/2h6k4cZb6pw"></iframe>
                    </div>
                    <div className=' col-6 content-right'>

                        <img src={image} className='btn-section'></img>
                    </div>
                    <div className='section-body'>

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
