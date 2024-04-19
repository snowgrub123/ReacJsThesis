import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUsers, createNewUserFromService, deleteFromServive, editFromServive } from '../../services/accService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
// import { createNewUserFromService } from '../../services/accService';

class UserManage extends Component {
    /**process of the life cycle of reactjs
     *  1 Run constructor -> intit the state
     *  2 Did mount -> 2 state in this step
     *  3 render(re-render) -> run again 
     */

    constructor(props) {
        super(props);
        this.state = {
            //save value of the this class
            //if value changed
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModelEditUser: false,
            userEdit: {}
        }
    }

    //2 status in the cycle is : born ; unmount
    async componentDidMount() {
        await this.getAllUsers();
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleFromUserManage = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleFromEditManage = () => {
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser,
        })
    }
    getAllUsers = async () => {
        let response = await getAllUsers("all");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.user
            })
            // console.log("Check 1", this.state.arrUsers)
        }
        // console.log("get user from nodeJs.js: ", response)
    }
    createNewUser = async (data) => {
        try {
            let result = await createNewUserFromService(data);
            if (result && result.errCode !== 0) {
                alert(result.message)
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit("clear all data after adding new user!")
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteUser = async (user) => {
        try {
            let res = await deleteFromServive(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsers();
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }
        console.log("Click delete", user)
    }
    handleEditUser = async (user) => {
        try {
            console.log("check edituser", user)
            this.setState({
                isOpenModelEditUser: true,
                userEdit: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    DoneEdit = async (user) => {
        try {
            let res = await editFromServive(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModelEditUser: false,
                    // userEdit: user
                })
                await this.getAllUsers();
            } else {
                alert(res.message)
            }
            console.log("Click save user", res)
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        // 
        let arrUsers = this.state.arrUsers
        // console.log(arrUsers)
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleFromUserManage}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModelEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModelEditUser}
                        toggleFromParent={this.toggleFromEditManage}
                        currentUser={this.state.userEdit}
                        editUser={this.DoneEdit}
                    />
                }

                <div className='title text-center'>Manage with Khang Dang</div>
                <div className='mx-1'>
                    <button className='btn-btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Create a new user</button>
                </div>

                <div className='users-table mt-3 mx-1'>
                    <h1>A Table information of users</h1>

                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Fullname</th>
                                <th>email</th>
                                <th>MatKhau</th>
                                <th>DiaChi</th>
                                <th>GioiTinh</th>
                                <th>actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('text map', item, index)
                                return (
                                    <tr>
                                        <td>{item.hoTen}</td>
                                        <td>{item.email}</td>
                                        <td>{item.matKhau}</td>
                                        <td>{item.diaChi}</td>
                                        <td>{item.gioiTinh}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>

                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>

                    </table>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
