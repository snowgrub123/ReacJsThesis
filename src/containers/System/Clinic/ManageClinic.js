import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { languages, crud_actions, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { event } from 'jquery';
import { createNewClinic } from '../../../services/accService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: ''
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };//copy state 
        copyState[id] = event.target.value;//set in the copy state
        this.setState({
            ...copyState
        });
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
        console.log('handleEditorChange', html, text);
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64,
            })
        }
    }
    handleSaveClinic = async () => {
        let res = await createNewClinic(this.state)
        console.log('check res', res)

        if (res && res.errCode === 0) {
            toast.success('Thêm mới Phòng Khám thành công!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: ''
            })
        } else {
            toast.error('Thất Bại!')
        }

    }
    render() {
        let { language } = this.props
        console.log('check state', this.state)
        return (
            <div className='manage-specialty-container'>
                <div className='manage-specialty-title'>
                    Manage Clinic With Khang
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên Phòng Khám</label>
                        <input className='form-control'
                            type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        >
                        </input>
                    </div>

                    <div className='col-6 form-group'>
                        <label>Ảnh Của Phòng Khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        >
                        </input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ Phòng Khám</label>
                        <input className='form-control'
                            type='text' value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        >
                        </input>
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={(event) => this.handleSaveClinic()}
                        >Save
                        </button>

                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
