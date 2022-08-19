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
            // Save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasOldData: false,

            //save doctor_infor table
            listPrice: [],
            listProvince: [],
            listPayment: [],
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            addressClinic: '',
            nameClinic: '',
            note: '',

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchRequiredDoctorInfor()
    }
    // 
    // 
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName + " " + item.firstName}`
                    let labelEn = `${item.firstName + " " + item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            else {
                if (type = 'PRICE') {
                    inputData.map((item, index) => {
                        let object = {};
                        let labelVi = `${item.valueVi}`
                        let labelEn = `${item.valueEn} USD`
                        object.label = language === LANGUAGES.VI ? labelVi : labelEn
                        object.value = item.keyMap
                        result.push(object)
                    })
                }
                if (type = 'PAYMENT' || 'PROVINCE') {
                    inputData.map((item, index) => {
                        let object = {};
                        let labelVi = `${item.valueVi}`
                        let labelEn = `${item.valueEn}`
                        object.label = language === LANGUAGES.VI ? labelVi : labelEn
                        object.value = item.keyMap
                        result.push(object)
                    })
                }
            }


        }
        return result

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux || prevProps.language !== this.props.language) {
            let listDoctor = this.buildDataInputSelect(this.props.doctorsRedux, "USER")
            this.setState({
                listDoctor: listDoctor
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor || prevProps.language !== this.props.language) {
            let { payment, price, province } = this.props.allRequiredDoctorInfor
            let listPrice = this.buildDataInputSelect(price, 'PRICE')
            let listPayment = this.buildDataInputSelect(payment, 'PAYMENT')
            let listProvince = this.buildDataInputSelect(province, 'PROVINCE')
            this.setState({
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveInforDoctor = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOldData === false ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,

            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note,
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
        })

    }

    handleChangeSelect = async (onChangeSelected, id) => {
        await this.props.fetchDetailDoctor(onChangeSelected.value)
        let data = this.props.detailDoctorRedux
        if (data && data.Markdown && data.Markdown.contentHTML) {
            this.setState({
                hasOldData: true,
                contentMarkdown: data.Markdown.contentMarkdown,
                contentHTML: data.Markdown.contentHTML,
                description: data.Markdown.description,
            })
        }
        // else {
        //     this.setState({
        //         hasOldData: false,
        //         contentMarkdown: '',
        //         contentHTML: '',
        //         selectedDoctor: '',
        //         description: '',
        //     })
        // }
        let copyState = { ...this.state }
        copyState[id.name] = onChangeSelected
        this.setState({
            ...copyState
        })
    }

    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    render() {
        console.log('check state', this.state)
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id='manage-doctor.create-doctor-infor' />
                    </div>

                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label> <FormattedMessage id='manage-doctor.select-doctor' /> </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                                placeholder={<FormattedMessage id='manage-doctor.select-doctor' />}
                                name='selectedDoctor'
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id='manage-doctor.introductory-information' />:</label>
                            <textarea className='form-control' rows="4"
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            > </textarea>
                        </div>
                    </div>

                    <div className='more-infor-extra row'>
                        <div className='form-group col-4'>
                            <label> <FormattedMessage id='manage-doctor.choose-price' /> </label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelect}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id='manage-doctor.choose-price' />}
                                name='selectedPrice'
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label> <FormattedMessage id='manage-doctor.chose-payment' /> </label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelect}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id='manage-doctor.chose-payment' />}
                                name='selectedPayment'
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label> <FormattedMessage id='manage-doctor.chose-province' /> </label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelect}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id='manage-doctor.chose-province' />}
                                name='selectedProvince'
                            />
                        </div>

                        <div className='form-group col-4 mt-3' >
                            <label> <FormattedMessage id='manage-doctor.name-clinic' /> </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>

                        <div className='form-group col-4 mt-3' >
                            <label> <FormattedMessage id='manage-doctor.address-clinic' /> </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>

                        <div className='form-group col-4 mt-3' >
                            <label> <FormattedMessage id='manage-doctor.note' /> </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
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
                        onClick={() => this.handleSaveInforDoctor()}
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
        detailDoctorRedux: state.admin.detailDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
// choose-price
// chose-payment
// chose-province
// name-clinic
// address-clinic
// "note"