import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, crud_actions, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { first } from 'lodash';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            previewImageUrl: '',
            isOpen: false,


            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                arrGender: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                arrPosition: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                arrRole: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: crud_actions.CREATE,
                previewImageUrl: ''

            }, () => {
                // console.log('check bug')
            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let fileUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: fileUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImageUrl) {
            return
        }
        this.setState({
            isOpen: true
        })
    }
    onChangeInPut = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, () => {
            console.log("Call back", this.state)
        })
    }
    handleSaveUSer = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        // console.log("Check state before update:", this.state)

        let { action } = this.state;
        if (action == crud_actions.CREATE) {
            this.props.createNewUser({
                ho: this.state.firstName,
                ten: this.state.lastName,
                email: this.state.email,
                matKhau: this.state.password,
                soDT: this.state.phoneNumber,
                diaChi: this.state.address,
                gioiTinh: this.state.gender,
                viTriID: this.state.position,
                vaiTroID: this.state.role,
                avatar: this.state.avatar

            })
        }
        if (action == crud_actions.EDIT) {
            this.props.editUserRedux({
                id: this.state.userEditId,
                ho: this.state.firstName,
                ten: this.state.lastName,
                email: this.state.email,
                matKhau: this.state.password,
                soDT: this.state.phoneNumber,
                diaChi: this.state.address,
                gioiTinh: this.state.gender,
                viTriID: this.state.position,
                vaiTroID: this.state.role,
                avatar: this.state.avatar,

                // user.ho = data.ho;
                // user.ten = data.ten;
                // user.diaChi = data.diaChi;
                // user.vaiTroID = data.vaiTroID;
                // user.viTriID = data.viTriID;
                // user.soDT = data.soDT;
                // user.gioiTinh = data.gioiTinh;

            })
        }

        //fire

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['firstName',
            'lastName', 'email', 'password', 'phoneNumber', 'address']
        for (let y = 0; y < arrCheck.length; y++) {
            if (!this.state[arrCheck[y]]) {
                isValid = false;
                alert('Bạn nhập thiếu tham số đầu vào bắt buộc: ' + arrCheck[y])
                break;
            }

        }
        return isValid
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.avatar) {
            imageBase64 = new Buffer(user.avatar, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'hardCode',
            firstName: user.ho,
            lastName: user.ten,
            phoneNumber: user.soDT,
            address: user.diaChi,
            gender: user.gioiTinh,
            role: user.vaiTroID,
            position: user.viTriID,
            avatar: '',
            previewImageUrl: imageBase64,
            action: crud_actions.EDIT,
            userEditId: user.id

        })
    }
    render() {
        // console.log('check from reduxxxx:', this.state)
        let genders = this.state.arrGender;
        let roles = this.state.arrRole;
        let positions = this.state.arrPosition;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        // console.log("check state from reduxx: ", this.state)

        let { email, password, firstName,
            lastName, phoneNumber, address
            , gender, position, role, avatar } = this.state

        return (
            <div>
                <div className="user-redux-container" >
                    <div className='title'>
                        User Redux mangage with khang dang
                    </div>
                    <div>{isLoadingGender === true ? 'Loading Gender' : ''}</div>
                    <div className='user-redux-body'>
                        <div className="container">
                            <div className="row">
                                <div className='col-12 my-3'><FormattedMessage id="manage-user.add" />   </div>
                                <div className='col-3'>
                                    <label for="inputFirstName"><FormattedMessage id="manage-user.firstName" /></label>
                                    <input type="text" class="form-control" id="ho"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInPut(event, 'firstName') }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label for="inputLastName"><FormattedMessage id="manage-user.lastName" /></label>
                                    <input type="text" class="form-control" id="ten" value={lastName}
                                        onChange={(event) => { this.onChangeInPut(event, 'lastName') }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label for="email"><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" class="form-control" id="email" value={email}
                                        onChange={(event) => { this.onChangeInPut(event, 'email') }}
                                        disabled={this.state.action === crud_actions.EDIT ? true : false}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label for="password"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" class="form-control" id="password" value={password}
                                        onChange={(event) => { this.onChangeInPut(event, 'password') }}
                                        disabled={this.state.action === crud_actions.EDIT ? true : false}

                                    />
                                </div>
                                <div class="col-4">
                                    <label for="inputAddress"><FormattedMessage id="manage-user.phoneNumber" /></label>
                                    <input type="text" class="form-control" id="inputAddress"
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInPut(event, 'phoneNumber') }}
                                    />
                                </div>
                                <div class="col-8">
                                    <label for="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" class="form-control" id="inputAddress"
                                        value={address}
                                        onChange={(event) => { this.onChangeInPut(event, 'address') }}
                                    />
                                </div>
                                <div class="col-6">
                                    <label for="inputCity"><FormattedMessage id="manage-user.city" /></label>
                                    <input type="text" class="form-control" id="inputCity"
                                    // value={ }
                                    // onChange={(event) => { this.onChangeInPut(event, 'address') }}
                                    />
                                </div>
                                <div class="col-6">
                                    <label for="inputState"><FormattedMessage id="manage-user.gender" /></label>
                                    <select id="inputState" class="form-control"
                                        onChange={(event) => { this.onChangeInPut(event, 'gender') }}
                                        value={gender}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === languages.VI ? item.value_vi : item.value_en}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="inputState"><FormattedMessage id="manage-user.position" /></label>
                                    <select id="inputState" class="form-control"
                                        onChange={(event) => { this.onChangeInPut(event, 'position') }}
                                        value={position}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === languages.VI ? item.value_vi : item.value_en}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="inputState"><FormattedMessage id="manage-user.roleId" /></label>
                                    <select id="inputState" class="form-control"
                                        onChange={(event) => { this.onChangeInPut(event, 'role') }}
                                        value={role}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === languages.VI ? item.value_vi : item.value_en}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="inputState"><FormattedMessage id="manage-user.avatar" /></label>
                                    <div className='preview-img-container'>
                                        <input id="previewImage" type="file" hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        >
                                        </input>
                                        <label className="label-upload" htmlFor="previewImage">Tải ảnh
                                            <i class="fas fa-upload"></i></label>
                                        <div className='prevew-image'
                                            style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                                <div className='col-12 my-3'>
                                    <button className={this.state.action === crud_actions.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                        onClick={() => this.handleSaveUSer()}
                                    >
                                        {this.state.action === crud_actions.EDIT ?
                                            <FormattedMessage id="manage-user.edit" />
                                            :
                                            <FormattedMessage id="manage-user.save" />
                                        }
                                    </button>
                                </div>


                                <div className='col-12 mb-5'>
                                    <TableManageUser
                                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImageUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }

                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => { dispatch(actions.fetchGenderStart()) },

        getPositionStart: () => { dispatch(actions.fetchPositionStart()) },

        getRoleStart: () => { dispatch(actions.fetchRoleStart()) },

        createNewUser: (data) => { dispatch(actions.createNewUser(data)) },

        fetchUserRedux: () => { dispatch(actions.fetchAllUsersStart()) },

        editUserRedux: (data) => { dispatch(actions.editUser(data)) }


        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageFromAppHome: (language) => dispatch(actions.changeLanguageFromApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
