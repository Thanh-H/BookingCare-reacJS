
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className=' custom-next-arrow fas fa-chevron-right'

            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className='custom-prev-arrow fas fa-chevron-left'

            onClick={onClick}
        />
    );
}
class HandBook extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };


        return (
            <>
                {this.props.language === LANGUAGES.VI ?
                    <div className='section-share section-hand-book'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <span className='title-section'> Cẩm nang</span>
                                <button className='btn-section'>Xem thêm</button>
                            </div>
                            <div className='section-body'>
                                <Slider {...settings}>
                                    <div className='section-customize'>
                                        <div className='bg-image image-HandBook1' />
                                        <div className='handbook-title'> <p> Xét nghiệm Viêm gan B bao
                                            nhiêu tiền? Giá xét nghiệm viêm gan B tại Hà Nội </p></div>
                                    </div>
                                    <div className='section-customize'>
                                        <div className='bg-image image-HandBook2' />
                                        <div className='handbook-title'> <p>  Nha khoa New Gate: Ưu đãi đến 50%
                                            tất cả dịch vụ nha khoa </p> </div>
                                    </div>
                                    <div className='section-customize'>
                                        <div className='bg-image image-HandBook3' />
                                        <div className='handbook-title'> <p> Cắt Amidan tại Bệnh viện An Việt có tốt không?
                                            Chi phí, bác sĩ thực hiện </p></div>
                                    </div>
                                </Slider>
                            </div>
                        </div >
                    </div >
                    :
                    <div className='section-share section-hand-book'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <span className='title-section'> HandBook</span>
                                <button className='btn-section'>More infor</button>
                            </div>
                            <div className='section-body'>
                                <Slider {...settings}>
                                    <div className='section-customize'>
                                        <div className='bg-image image-HandBook1' />
                                        <div className='handbook-title'> <p> Hepatitis B testing includes
                                            how much money? Price of hepatitis B test in Hanoi </p></div>
                                    </div>
                                    <div className='section-customize'>
                                        <div className='bg-image image-HandBook2' />
                                        <div className='handbook-title'> <p>  New Gate Dental Clinic: Up to 50% off
                                            all dental services </p> </div>
                                    </div>
                                    <div className='section-customize'>
                                        <div className='bg-image image-HandBook3' />
                                        <div className='handbook-title'> <p>
                                            Is tonsillectomy at An Viet Hospital good?
                                            Expenses, done by the doctor </p></div>
                                    </div>
                                </Slider>
                            </div>
                        </div >
                    </div >
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
