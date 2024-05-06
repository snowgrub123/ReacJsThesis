import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageTeacher.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { crud_actions, languages } from '../../../utils';
import { getDetailTeacherInfoService } from '../../../services/accService';

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
            hasOldData: false
        }
    }
    componentDidMount() {
        this.props.fetchAllTeacherRedux()
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.ho} ${item.ten}`;
                let labelEn = `${item.ten} ${item.ho}`;

                object.label = language === languages.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allTeachers != this.props.allTeachers) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers)
            this.setState({
                listTeachers: dataSelect
            })
        }
        if (prevProps.language != this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allTeachers)
            this.setState({
                listTeachers: dataSelect
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
            action: hasOldData === true ? crud_actions.EDIT : crud_actions.CREATE
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailTeacherInfoService(selectedOption.value);
        console.log('check respone', res)
        if (res && res.errCode === 0 && res.data && res.data.markdown) {
            let Markdown = res.data.markdown;
            this.setState({
                contentHTML: Markdown.contentHTML,
                contentMarkdown: Markdown.contentMarkdown,
                description: Markdown.moTa,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        // console.log('check props des', this.state.description)
        let { hasOldData } = this.state;
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
                        />
                    </div>
                    <div className='content-right from-group'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='from-control' rows="8"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}>
                            Hi
                        </textarea>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        fetchAllTeacherRedux: () => dispatch(actions.fetchAllTeachers()),
        saveInforTeachersRedux: (data) => dispatch(actions.saveInforTeachers(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
