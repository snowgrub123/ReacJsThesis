import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginUser } from '../../services/accService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showpass: false,
            errValue: ''
        }
        this.btnLogin = React.createRef();
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
        console.log(event.target.value)
    }
    handleOnChangleInput = (event) => {
        this.setState({
            password: event.target.value,
        })
        console.log(event.target.value)
    }
    handleLogin = async () => {
        this.setState({
            errValue: ''
        })
        // clear loi khi chuong trinh chay lai
        try {
            let data = await handleLoginUser(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errValue: data.message
                })
            } else if (data && data.errCode === 0) {
                this.props.accounLoginSucceed(data.user)
                console.log("Đăng Nhập Thành Công")
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errValue: error.response.data.message
                    })
                }
            }
            console.log('khangDang', error.response)
        }
    }
    handleeye = () => {
        this.setState({
            showpass: !this.state.showpass
        })
    }

    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'> Login Form</div>
                        <div className='col-12 form-group input-login'>
                            <div className='input-username'>
                                <i className="fas fa-user iconuser"></i>
                                <input type='text' className='form-control' placeholder='User name'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}
                                >
                                </input>
                            </div>
                        </div>
                        <div className='col-12 form-group input-login'>
                            <div className='input-password'>
                                <i class="fas fa-lock iconlock"></i>
                                <input
                                    type={this.state.showpass ? 'text' : 'password'}
                                    className='form-control' placeholder='............'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangleInput(event)}
                                >
                                </input>
                                <i class={this.state.showpass ? 'far fa-eye iconeye' : 'fas fa-eye-slash iconeye'} onClick={() => { this.handleeye() }}></i>
                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errValue}
                        </div>
                        <div className='col-12 login-forget'>
                            <span>
                                Forgot Password?
                            </span>
                        </div>
                        <div className='col-12'>
                            <button className='btnlogin' onClick={() => { this.handleLogin() }}>Login</button>

                        </div>

                        <div className='col-12 loginor'>OR</div>

                        <div className='col-12 social-login'>
                            <div className='facebook'>
                                <i class="fab fa-facebook"></i>
                                <span>Facebook</span>
                            </div>
                            <div className='google'>
                                <i class="fab fa-google"></i>
                                <span>Google</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        accounLoginSucceed: (userInfo) => dispatch(actions.accounLoginSucceed(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
