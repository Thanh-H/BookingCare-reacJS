import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {

        return (
            <div className='footer-container'>
                <div className='footer-content'>
                    <p>&copy; 2022 Đường link github của tôi <a target='_blank' href='https://github.com/Thanh-H?tab=repositories'>click</a> </p></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
