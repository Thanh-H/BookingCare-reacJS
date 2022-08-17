import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';



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
            description: '',
            listDoctor: [],
            hasOldData: false,
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName + " " + item.firstName}`
                let labelEn = `${item.firstName + " " + item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })

        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
            let dataOption = this.buildDataInputSelect(this.props.doctorsRedux)
            this.setState({
                listDoctor: dataOption
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataOption = this.buildDataInputSelect(this.props.doctorsRedux)
            this.setState({
                listDoctor: dataOption
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: this.state.hasOldData === false ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
        })

    }

    handleChangeSelect = async selectedOption => {
        await this.props.fetchDetailDoctor(selectedOption.value)
        let data = this.props.detailDoctorRedux
        if (data && data.Markdown && data.Markdown.contentHTML) {
            this.setState({
                hasOldData: true,
                contentMarkdown: data.Markdown.contentMarkdown,
                contentHTML: data.Markdown.contentHTML,
                description: data.Markdown.description,
            })
        }
        else {
            this.setState({
                hasOldData: false,
                contentMarkdown: '',
                contentHTML: '',
                selectedOption: '',
                description: '',
            })
        }
        this.setState({ selectedOption })
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id='manage-doctor.create-doctor-infor' />
                    </div>

                    <div className='more-info'>
                        <div className='content-left form-group'>
                            <label> <FormattedMessage id='manage-doctor.select-doctor' /> </label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id='manage-doctor.introductory-information' />:</label>
                            <textarea className='form-control' rows="4"
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            > </textarea>
                        </div>
                    </div>

                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />

                    </div>

                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className={this.state.hasOldData === false ? 'save-content-doctor' : 'edit-content-doctor'}>
                        {this.state.hasOldData === false ?
                            <FormattedMessage id='manage-doctor.save' />
                            :
                            <FormattedMessage id='manage-doctor.edit' />
                        }
                    </button>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        doctorsRedux: state.admin.allDoctors,
        language: state.app.language,
        detailDoctorRedux: state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
