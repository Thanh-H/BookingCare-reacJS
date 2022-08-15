import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'

const options = [
    { value: 'cac', label: 'cac' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: ''
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html

        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check state', this.state)
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        let { users } = this.state
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        Tạo thêm thông tin bác sĩ
                    </div>

                    <div className='more-info'>
                        <div className='content-left form-group'>
                            <label>chon bac si</label>
                            <Select
                                value={this.state.selectedOption}
                                onchange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className='content-right'>
                            <label>Thong tin gioi thieu:</label>
                            <textarea className='form-control' rows="4"
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            > abcxyz</textarea>
                        </div>
                    </div>

                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} />
                    </div>

                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className='save-content-doctor'>
                        lưu thông tin
                    </button>
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
