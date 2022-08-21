import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {

}



class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: ''
        }
    }

    componentDidMount() {
        this.props.fetchUserStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({
                users: this.props.userRedux
            })
        }
    }

    handleDeleteUser = (id) => {
        this.props.deleteUserStart(id)
    }
    handleEditUSer = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let { users } = this.state
        return (
            <>
                <div div className=' user-table mt-5 mx-1 mb-5' >
                    <table id="customers" >
                        <thead>
                            <tr>
                                <th > <FormattedMessage id="manage-user.email" /> </th>
                                <th><FormattedMessage id="manage-user.first-name" /></th>
                                <th><FormattedMessage id="manage-user.last-name" /></th>
                                <th><FormattedMessage id="manage-user.address" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 && users.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td> {item.email} </td>
                                        <td> {item.firstName} </td>
                                        <td> {item.lastName} </td>
                                        <td> {item.address} </td>
                                        <td style={{ width: '130px' }} >
                                            <i onClick={() => this.handleEditUSer(item)} className="fas fa-pencil-alt btn-action"></i>
                                            <i onClick={() => this.handleDeleteUser(item.id)} className="fas fa-trash btn-action"></i>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserStart: () => dispatch(actions.fetchUserStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
