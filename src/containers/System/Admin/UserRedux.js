import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import TableManageUser from './tableManageUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            previewImgURL: '',
            isOpen: false,

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
            action: ''
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
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }

        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                arrGender: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                arrRole: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.userRedux !== this.props.userRedux) {
            let arrRole = this.props.roleRedux
            let arrGender = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            this.setState({

                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)

            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
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
            return;
        }
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUserRedux({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar

            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }


    }

    handleEditUser = (user) => {
        console.log('check user', user)
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');

        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            id: user.id
        })
    }

    onChangeInput = (event, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = event.target.value
        this.setState({
            ...coppyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber',
            'gender', 'role', 'position',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                // alert('missing ' + arrCheck[i])
                toast.warn("missing " + arrCheck[i] + '!', {
                    position: "top-right",
                    autoClose: false,
                    theme: "dark"

                })

                break;
            }
        }
        return isValid

    }

    handleCanle = () => {
        let arrRole = this.props.roleRedux
        let arrGender = this.props.genderRedux
        let arrPosition = this.props.positionRedux
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
            role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
            avatar: '',
            action: CRUD_ACTIONS.CREATE,
            previewImgURL: ''
        })
    }

    render() {
        let { arrGender, arrPosition, arrRole } = this.state
        let { language, isLoadingGender } = this.props
        let { email, password, firstName, lastName, address, phonenumber,
            gender, role, position, avatar } = this.state

        return (

            <div className='user-redux-container'>

                <div className="text-center title" >User Redux with Thanh</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <h4 style={{ color: '#920fb3' }}> {this.state.action === CRUD_ACTIONS.EDIT ?
                            <FormattedMessage id="manage-user.edit-user" />
                            :
                            <FormattedMessage id="manage-user.add" />}

                        </h4>
                        <div> {isLoadingGender === true ? 'Loading Gender' : ''} </div>
                        <form >
                            <div className="form-row">
                                <div className='Block-input'>
                                    <div className="form-group block-input-child ">
                                        <label ><FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" className="form-control"
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                            value={email}
                                            onChange={(event) => this.onChangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className="form-group block-input-child">
                                        <label><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control"
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                            value={password}
                                            onChange={(event) => this.onChangeInput(event, 'password')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='Block-input'>
                                <div className="form-group block-input-child">
                                    <label><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control"
                                        value={firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')}
                                    />
                                </div>
                                <div className="form-group block-input-child">
                                    <label ><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control"
                                        value={lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')}
                                    />
                                </div>
                            </div>
                            <div className='Block-input mt-3'>
                                <div style={{ width: "23%" }} className="form-group col-md-3 ">
                                    <label ><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control" name="phonenumber"
                                        value={phonenumber}
                                        onChange={(event) => this.onChangeInput(event, 'phonenumber')}
                                    />
                                </div>

                                <div style={{ width: "74%" }} className="form-group   ">
                                    <label><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control"
                                        value={address}
                                        onChange={(event) => this.onChangeInput(event, 'address')}
                                    />
                                </div>
                            </div>

                            <div className='Block-input' >

                                <div style={{ width: "23%" }} className="form-group col-md-3">
                                    <label ><FormattedMessage id="manage-user.gender" /></label>
                                    <select value={gender} className="form-select"
                                        onChange={(event) => this.onChangeInput(event, 'gender')}>
                                        {arrGender && arrGender.length > 0 && arrGender.map((item, index) => {
                                            return (<option value={item.keyMap} key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div style={{ width: "23%" }} className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select value={position} className="form-select"
                                        onChange={(event) => this.onChangeInput(event, 'position')} >
                                        {arrPosition && arrPosition.length > 0 && arrPosition.map((item, index) => {
                                            return (<option value={item.keyMap} key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div style={{ width: "23%" }} className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.role" /></label>
                                    <select value={role} className="form-select"
                                        onChange={(event) => this.onChangeInput(event, 'role')} >
                                        {arrRole && arrRole.length > 0 && arrRole.map((item, index) => {
                                            return (<option value={item.keyMap} key={index} > {language === LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
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
                        </form>

                        <div className='block-btn'>
                            <button
                                onClick={() => this.handleSaveUser()}
                                className={this.state.action === CRUD_ACTIONS.EDIT ? 'col-md-2 btn btn-warning ' : 'col-md-2 btn btn-primary '}>
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    <FormattedMessage id="manage-user.edit" />
                                    :
                                    <FormattedMessage id="manage-user.save" />}
                            </button>

                            {this.state.action === CRUD_ACTIONS.EDIT &&
                                <button className='btn-cancle' onClick={this.handleCanle}>
                                    <FormattedMessage id="manage-user.cancel" />
                                </button>}
                        </div>

                        <div className=' '>
                            <TableManageUser
                                handleEditUserFromParent={this.handleEditUser} />
                        </div>
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
        isLoadingRole: state.admin.isLoadingRole,

        userRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUserRedux: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUserStart(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
