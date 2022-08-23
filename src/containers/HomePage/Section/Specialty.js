
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { getAllSpecialty } from '../../../services/userService'
import Slider from 'react-slick';
import { withRouter } from 'react-router'
class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }
    handleViewDetailSpecial = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let { dataSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> <FormattedMessage id='homepage.popular-specialty' /> </span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 ?
                                dataSpecialty.map((item, index) => {
                                    return (<div onClick={() => this.handleViewDetailSpecial(item)} key={index} className='section-customize'>
                                        <div className='bg-image  ' style={{ backgroundImage: `url(${item.imageBase64})` }} />
                                        <div className='specialty-name' >{item.name}</div>
                                    </div>)
                                })

                                :
                                <div></div>
                            }


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
