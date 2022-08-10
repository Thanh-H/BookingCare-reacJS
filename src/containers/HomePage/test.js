import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
class HomePage extends Component {
    render() {
        return (
            <div className="content-down">
                <div className="options">
                    <div className="option-child">
                        <div className="icon-child"><i className="far fa-hospital"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child1" /></div> </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child2" /></div> </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-procedures"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child3" /></div> </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-flask"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child4" /></div> </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-user-md"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child5" />
                        </div>
                    </div>
                    <div className="option-child">
                        <div className="icon-child"><i className="fas fa-user-md"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child5" /></div> </div>
                    <div className="option-child">
                        <div className="icon-child"> <i class="fas fa-briefcase-medical"></i></div>
                        <div className="text-child"><FormattedMessage id="banner.child6" /></div>
                    </div>
                </div>
            </div>



        )
    }
}