import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import HomeFooter from './HomeFooter';

import "./HomePage.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

class HomePage extends Component {

    render() {
        const { processLogout } = this.props;
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,


        };

        return (
            <div>
                <HomeHeader />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <OutStandingDoctor
                    settings={settings} />
                <HandBook
                    settings={settings} />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
