import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUsers, createNewUserFromService } from '../../services/accService';
import ModalUser from './ModalUser';
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
            }
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
                <div className='title text-center'>Manage with Khang Dang</div>
                <div className='mx-1'>
                    <button className='btn-btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Add a new user</button>
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
                                            <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'><i className="fas fa-trash"></i></button>

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
