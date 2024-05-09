import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageTeacher.scss';
import Select from 'react-select';
import { crud_actions, languages } from '../../../utils';
import { getDetailTeacherInfoService } from '../../../services/accService';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listTeachers: [],
            hasOldData: false,

            // save the infor in table teacher_infor
            listPrice: [],
            listPayMent: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayMent: '',
            selectedProvince: '',
            nameCentral: '',
            addressCentral: '',
            note: ''



        }
    }
    componentDidMount() {
        this.props.fetchAllTeacherRedux()
        this.props.getAllRequiredTeacherInfor()
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.ho} ${item.ten}`;
                    let labelEn = `${item.ten} ${item.ho}`;

                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.value_vi}`;
                    let labelEn = `${item.value_en} USD`;

                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.value_vi}`;
                    let labelEn = `${item.value_en} `;

                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
        }

        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allTeachers !== this.props.allTeachers) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers, 'USERS')
            this.setState({
                listTeachers: dataSelect
            })
        }
        // responePayment: responePayment.data,
        //             responePrice: responePrice.data,
        //             responeProvince: responeProvince.data
        if (prevProps.allRequiredTeacherInfor !== this.props.allRequiredTeacherInfor) {
            let { responePayment, responePrice, responeProvince } = this.props.allRequiredTeacherInfor;
            let dataSelectProvince = this.buildDataInputSelect(responeProvince, 'PROVINCE');
            let dataSelectPayment = this.buildDataInputSelect(responePayment, 'PAYMENT');
            let dataSelectPrice = this.buildDataInputSelect(responePrice, 'PRICE');

            console.log("check 1", dataSelectProvince)
            console.log("check 2", dataSelectPayment)
            console.log("check 3", dataSelectPrice)



            this.setState({
                listPrice: dataSelectPrice,
                listPayMent: dataSelectPayment,
                listProvince: dataSelectProvince,

            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers, 'USERS');
            let { responePayment, responePrice, responeProvince } = this.props.allRequiredTeacherInfor;
            let dataSelectProvince = this.buildDataInputSelect(responeProvince, 'PROVINCE');
            let dataSelectPayment = this.buildDataInputSelect(responePayment, 'PAYMENT');
            let dataSelectPrice = this.buildDataInputSelect(responePrice, 'PRICE');
            this.setState({
                listTeachers: dataSelect,
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPayMent: dataSelectPayment,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);
    }
    handleSaveContentMarkDownTeacher = () => {
        // contentMarkdown: '',
        //     contentHTML: '',
        //     selectedOption: '',
        //     description: '',
        //     listTeachers: []
        let { hasOldData } = this.state;
        this.props.saveInforTeachersRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            moTa: this.state.description,
            giaoVienID: this.state.selectedOption.value,
            action: hasOldData === true ? crud_actions.EDIT : crud_actions.CREATE,

            // selectedPrice: '',
            // selectedPayMent: '',
            // selectedProvince: '',
            // nameCentral: '',
            // addressCentral: '',
            // note: ''
            selectedPrice: this.state.selectedPrice.value,
            selectedPayMent: this.state.selectedPayMent.value,
            selectedProvince: this.state.selectedProvince.value,
            nameCentral: this.state.nameCentral,
            addressCentral: this.state.addressCentral,
            note: this.state.note,

            // priceID: this.state.selectedPrice.value,
            // paymentID: this.state.selectedPayMent.value,
            // provinceID: this.state.selectedProvince.value,
            // nameCentral: this.state.nameCentral,
            // addressCentral: this.state.addressCentral,
            // note: this.state.note,
        })
    }

    handleChangeSelectTeacherInfor = async (selectedOption, name) => {
        let statename = name.name;
        let stateCopy = { ...this.state };
        stateCopy[statename] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }




    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayMent, listPrice, listProvince } = this.state;
        let res = await getDetailTeacherInfoService(selectedOption.value);
        console.log('check respone', res)
        if (res && res.errCode === 0 && res.data && res.data.markdown) {
            let Markdown = res.data.markdown;

            let addressCentral = '',
                nameCentral = '',
                note = '',
                paymentID = '',
                priceID = '',
                provinceID = '',
                selectedPayMent = '',
                selectedPrice = '',
                selectProvince = ''

            if (res.data.teacher_Infor) {
                addressCentral = res.data.teacher_Infor.addressCentral;
                nameCentral = res.data.teacher_Infor.nameCentral;
                note = res.data.teacher_Infor.note;
                paymentID = res.data.teacher_Infor.paymentID;
                priceID = res.data.teacher_Infor.priceID;
                provinceID = res.data.teacher_Infor.provinceID;

                selectedPayMent = listPayMent.find(item => {
                    return item && item.value === paymentID
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceID
                })
                selectProvince = listProvince.find(item => {
                    return item && item.value === provinceID
                })
                console.log("check find array", selectProvince, selectedPayMent, selectProvince)
            }
            this.setState({
                contentHTML: Markdown.contentHTML,
                contentMarkdown: Markdown.contentMarkdown,
                description: Markdown.moTa,
                hasOldData: true,

                addressCentral: addressCentral,
                nameCentral: nameCentral,
                note: note,
                selectedPayMent: selectedPayMent,
                selectedPrice: selectedPrice,
                selectedProvince: selectProvince,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressCentral: '',
                nameCentral: '',
                note: '',
            })
        }
    };
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOldData } = this.state;
        // console.log('check sate all 1', this.state)
        return (
            <div className='manage-teacher-container'>
                <div className='manage-teacher-title'>
                    Manage Teacher With Khang
                </div>
                <div className='more-infor'>
                    <div className='content-left from-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listTeachers}
                            placeholder={'Choose Teacher'}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='from-control' rows="8"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}>
                            Hi
                        </textarea>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Choose price</label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectTeacherInfor}
                                name='selectedPrice'
                                placeholder={'Choose Price'}
                                options={this.state.listPrice}
                            >
                            </Select>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Choose Payment</label>
                            <Select
                                onChange={this.handleChangeSelectTeacherInfor}
                                value={this.state.selectedPayMent}
                                name='selectedPayMent'
                                placeholder={'Choose Payment'}
                                options={this.state.listPayMent}
                            >
                            </Select>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Choose City</label>
                            <Select
                                onChange={this.handleChangeSelectTeacherInfor}
                                value={this.state.selectedProvince}
                                name='selectedProvince'
                                placeholder={'Choose City'}
                                options={this.state.listProvince}
                            >
                            </Select>
                        </div>
                        <div className='col-4 form-group'>
                            <label>CenTral Name</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameCentral')}
                                value={this.state.nameCentral}>

                            </input>
                        </div>
                        <div className='col-4 form-group'>
                            <label>CenTral Address</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressCentral')}
                                value={this.state.addressCentral}>

                            </input>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Note</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}>

                            </input>
                        </div>

                    </div>

                </div>
                <div className='manage-teacher-edit'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkDownTeacher()}
                    className={hasOldData === true ? 'save-content-teacher' :
                        'create-content-teacher'
                    }>
                    {hasOldData === true ?
                        <span>Lưu Thông Tin</span> : <span>Tao Thông Tin</span>
                    }
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allTeachers: state.admin.allTeachers,
        language: state.app.language,
        allRequiredTeacherInfor: state.admin.allRequiredTeacherInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllTeacherRedux: () => dispatch(actions.fetchAllTeachers()),
        saveInforTeachersRedux: (data) => dispatch(actions.saveInforTeachers(data)),
        getAllRequiredTeacherInfor: (data) => dispatch(actions.getAllRequiredTeacherInfor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
