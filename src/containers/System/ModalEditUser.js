import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            matKhau: '',
            diaChi: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                matKhau: 'harcode',
                diaChi: user.diaChi,
            })
        }
        console.log("check from edit didMount", this.props.currentUser)
    }
    toggle = () => {
        // alert('me toggle')
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };//copy state 
        copyState[id] = event.target.value;//set in the copy state
        this.setState({
            ...copyState
        });
    }
    checkValideInput = () => {
        let isValid = true;
        let arr = ['email', 'matKhau', 'diaChi'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isValid = false;
                alert("Bạn đã quên nhập: " + arr[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        console.log("check isvalid", isValid)
        if (isValid === true) {
            //call api edit user
            console.log('check props from parents', this.props)
            this.props.editUser(this.state);
        }
    }

    render() {
        // console.log("Check props from parent!", this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => (this.toggle())}
                className={'Modal-user-container'}
                size='lg'
            // centered
            >

                <ModalHeader toggle={() => { this.toggle() }}>Edit A New User</ModalHeader>
                <ModalBody>
                    <div className='Modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>matKhau</label>
                            <input type='password' onChange={(event) => { this.handleOnChangeInput(event, "matKhau") }}
                                value={this.state.matKhau}
                                disabled
                            ></input>
                        </div>
                    </div>
                    <div className='input-container input-full-width'>
                        <label>DiaChi</label>
                        <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "diaChi") }}
                            value={this.state.diaChi}
                        ></input>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        className='px-3'
                        onClick={() => { this.handleSaveUser() }}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
