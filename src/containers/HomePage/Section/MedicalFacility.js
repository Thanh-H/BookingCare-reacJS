
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { getAllClinic } from '../../../services/userService'
import Slider from 'react-slick';
import { withRouter } from 'react-router'
class Clinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let { dataClinic } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> <FormattedMessage id='homepage.Outstanding-medical-facility' /> </span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 ?
                                dataClinic.map((item, index) => {
                                    return (<div onClick={() => this.handleViewDetailClinic(item)} key={index} className='section-customize'>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
