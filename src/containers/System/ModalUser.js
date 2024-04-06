import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            matKhau: '',
            diaChi: '',
        }
    }

    componentDidMount() {
    }

    // using toggle

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
    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        console.log("check isvalid", isValid)
        if (isValid === true) {
            //call api
            console.log('check props from parents', this.props)
            this.props.createNewUser(this.state);
        }
    }

    render() {
        // console.log('check child props', this.props);
        // console.log('check chlid open modal', this.props.isOpen)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => (this.toggle())}
                className={'Modal-user-container'}
                size='lg'
            // centered
            >

                <ModalHeader toggle={() => { this.toggle() }}>Create A New User</ModalHeader>
                <ModalBody>
                    <div className='Modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}

                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>matKhau</label>
                            <input type='password' onChange={(event) => { this.handleOnChangeInput(event, "matKhau") }}
                                value={this.state.matKhau}
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
                        onClick={() => { this.handleAddNewUser() }}>
                        Add new user
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
