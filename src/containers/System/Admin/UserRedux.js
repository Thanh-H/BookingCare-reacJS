import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            previewImgURL: '',
            isOpen: false,


            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            role: '',
            position: '',
            avatar: ''
        }
    }


    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                arrPosition: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }

        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                arrGender: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                arrRole: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid == false) {
            return
        }
        else {
            this.props.getCreateNewUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,

            })
        }

    }

    onChangeInput = (event, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = event.target.value
        this.setState({
            ...coppyState
        })
    }
    // let arrCheck = [email,password,firstName,lastName,address,phonenumber,
    //     gender,role,position,avatar]
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber',
            'gender', 'role', 'position',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (this.state[arrCheck[i]] === '') {
                isValid = false
                alert('missing ' + arrCheck[i])
                break;
            }
        }
        return isValid

    }


    render() {
        let { arrGender, arrPosition, arrRole } = this.state
        let { language, isLoadingGender } = this.props
        return (
            <div className='user-redux-container'>
                <div className="text-center title" >User Redux with Thanh</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div> <FormattedMessage id="manage-user.add" /> </div>
                        <div> {isLoadingGender === true ? 'Loading Gender' : ''} </div>
                        <form >
                            <div className="form-row">
                                <div className='Block-input'>
                                    <div className="form-group block-input-child ">
                                        <label ><FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" className="form-control"
                                            value={this.state.email}
                                            onChange={(event) => this.onChangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className="form-group block-input-child">
                                        <label><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control"
                                            value={this.state.password}
                                            onChange={(event) => this.onChangeInput(event, 'password')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='Block-input'>
                                <div className="form-group block-input-child">
                                    <label><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control"
                                        value={this.state.firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')}
                                    />
                                </div>
                                <div className="form-group block-input-child">
                                    <label ><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control"
                                        value={this.state.lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')}
                                    />
                                </div>
                            </div>
                            <div className='Block-input mt-3'>
                                <div style={{ width: "23%" }} className="form-group col-md-3 ">
                                    <label ><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control" name="phonenumber"
                                        value={this.state.phonenumber}
                                        onChange={(event) => this.onChangeInput(event, 'phonenumber')}
                                    />
                                </div>

                                <div style={{ width: "74%" }} className="form-group   ">
                                    <label><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.onChangeInput(event, 'address')}
                                    />
                                </div>
                            </div>

                            <div className='Block-input' >

                                <div style={{ width: "23%" }} className="form-group col-md-3">
                                    <label ><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-select"
                                        onChange={(event) => this.onChangeInput(event, 'gender')}>
                                        {arrGender && arrGender.length > 0 && arrGender.map((item, index) => {
                                            return (<option value={item.key} key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div style={{ width: "23%" }} className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select className="form-select"
                                        onChange={(event) => this.onChangeInput(event, 'position')} >
                                        {arrPosition && arrPosition.length > 0 && arrPosition.map((item, index) => {
                                            return (<option value={item.key} key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div style={{ width: "23%" }} className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.role" /></label>
                                    <select className="form-select"
                                        onChange={(event) => this.onChangeInput(event, 'position')} >
                                        {arrRole && arrRole.length > 0 && arrRole.map((item, index) => {
                                            return (<option value={item.key} key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div style={{ width: "23%" }} className="form-group col-md-3 ">
                                    <label ><FormattedMessage id="manage-user.avatar" /></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type="file" className="form-control" hidden onChange={(event) => this.handleOnchangeImage(event)} />
                                        <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="manage-user.upload-img" /> <i className='fas fa-upload'></i> </label>
                                        <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImgURL})`, cursor: `${this.state.previewImgURL && 'pointer'}` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => this.handleSaveUser()} className='col-md-2 btn btn-primary '><FormattedMessage id="manage-user.save" /></button>
                        </form>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,

        positionRedux: state.admin.positions,
        isLoadingPosition: state.admin.isLoadingPosition,

        roleRedux: state.admin.roles,
        isLoadingRole: state.admin.isLoadingRole
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        getCreateNewUserStart: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
