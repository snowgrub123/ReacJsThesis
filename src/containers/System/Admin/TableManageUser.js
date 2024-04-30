import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageUser.scss';


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }


    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }
    handleEditUser = (user) => {
        // console.log('check edit', user)
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        console.log("Check all User:", this.props.listUsers)
        console.log('check state', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        return (
            <table id='TableManageUser'>
                <tbody>
                    <tr>
                        <th>Fristname</th>
                        <th>Lastname</th>
                        <th>email</th>
                        <th>MatKhau</th>
                        <th>DiaChi</th>
                        <th>GioiTinh</th>
                        <th>actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.ho}</td>
                                    <td>{item.ten}</td>
                                    <td>{item.email}</td>
                                    <td>{item.matKhau}</td>
                                    <td>{item.diaChi}</td>
                                    <td>{item.gioiTinh}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handleEditUser(item)}
                                            className='btn-edit'>< i className="fas fa-pencil-alt"></i></button>

                                        <button
                                            onClick={() => this.handleDeleteUser(item)}
                                            className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody >
            </table >
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
