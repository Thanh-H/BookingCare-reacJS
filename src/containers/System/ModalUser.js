import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import './ModalUser.scss'

class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '1',
            roleId: '1'
        }
        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_DATA_MODAL', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '1',
                roleId: '1'
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    handleOnchange = (e, id) => {

        let coppyState = { ...this.state }
        coppyState[id] = e.target.value
        this.setState({
            ...coppyState
        })
    }

    checkValidateInput = () => {
        let isvalid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[[arrInput[i]]]) {
                isvalid = false
                alert("missing parameters: " + arrInput[i])
                break
            }
        }
        return isvalid
    }

    handleCreateNewUser = (data) => {
        let isvalid = this.checkValidateInput()
        if (isvalid === true) {
            this.props.createNewUser(this.state)
        }

    }

    render() {
        return (
            <Modal isOpen={this.props.isOpenModalUser}
                toggle={() => { this.toggle() }}
                className={'asad'}
                centered
                size='lg'  >
                <ModalHeader toggle={() => { this.toggle() }}>create a new user</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="">
                            <form >
                                <div className="form-row">

                                    <div className='Block-input'>
                                        <div className="form-group block-input-child ">
                                            <label >Email</label>
                                            <input type="email" className="form-control" placeholder="Email"
                                                value={this.state.email} onChange={(e) => this.handleOnchange(e, 'email')} />
                                        </div>
                                        <div className="form-group block-input-child">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Password"
                                                value={this.state.password} onChange={(e) => this.handleOnchange(e, 'password')} />
                                        </div>
                                    </div>
                                </div>

                                <div className='Block-input'>
                                    <div className="form-group block-input-child">
                                        <label >firstName</label>
                                        <input type="text" className="form-control" placeholder="firstName"
                                            value={this.state.firstName} onChange={(e) => this.handleOnchange(e, 'firstName')} />
                                    </div>
                                    <div className="form-group block-input-child">
                                        <label >lastName</label>
                                        <input type="text" className="form-control" placeholder="lastName"
                                            value={this.state.lastName} onChange={(e) => this.handleOnchange(e, 'lastName')} />
                                    </div>
                                </div>

                                <div className="form-group mt-3  ">
                                    <label>Address</label>
                                    <input type="text" className="form-control" placeholder="address"
                                        value={this.state.address} onChange={(e) => this.handleOnchange(e, 'address')} />
                                </div>

                                <div className='Block-input'>

                                    <div className="form-group ">
                                        <label >phonenumber</label>
                                        <input type="text" className="form-control" name="phonenumber"
                                            value={this.state.phonenumber} onChange={(e) => this.handleOnchange(e, 'phonenumber')} />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label >Sex</label>
                                        <select name="gender" className="form-select"
                                            value={this.state.gender} onChange={(e) => this.handleOnchange(e, 'gender')}>
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>Role</label>
                                        <select name="roleId" className="form-select"
                                            value={this.state.roleId} onChange={(e) => this.handleOnchange(e, 'roleId')}>
                                            <option value="1">Admin</option>
                                            <option value="2">Doctor</option>
                                            <option value="3">Patient</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </ModalBody >
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleCreateNewUser() }}>
                        Add New
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal >
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);