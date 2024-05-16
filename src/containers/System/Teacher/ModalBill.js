import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './ModalBill.scss';
import _ from 'lodash'
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
class ModalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }
    async componentDidMount() {
        if (this.props.dataFromModal) {
            this.setState({
                email: this.props.dataFromModal.email,

            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataFromModal !== prevProps.dataFromModal) {
            this.setState({
                email: this.props.dataFromModal.email,

            })
        }
    }
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value,

        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })

        }
        console.log("Check image", this.state.imgBase64)
    }
    handleSendBill = () => {
        this.props.sendBillFormParent(this.state)
        // console.log("check state form Modal Bill", this.state)
    }

    render() {
        let { isOpenModal, closeBillModal, dataFromModal, sendBillFormParent } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                size='md'
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi hóa Đơn Khám Bệnh</h5>
                    <button type="button" className="btn-close" aria-label="Close"
                        onClick={closeBillModal}
                    ></button>
                </div>
                <ModalBody>
                    <div className='col-12 row'>
                        <div className='col-6 form-group'>
                            <div >
                                <label>Email Bệnh Nhân</label>
                                <input className='form-control'
                                    onChange={(event) => this.handleOnchangeEmail(event)}
                                    type='email'
                                    value={this.state.email}></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file Hóa Đơn</label>
                                <input
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                    className='form-control-file'
                                    type='file'></input>

                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendBill()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeBillModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBill);
