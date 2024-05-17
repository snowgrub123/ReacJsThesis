import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, crud_actions, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import "./ManageOfPatient.scss";
import 'react-image-lightbox/style.css';
class ManageOfPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return (
            <div className='container-patient'>
                <div className='title-patient'>
                    Quản Lý Thông Tin Cá Nhân Dành Cho Bệnh Nhân
                </div>
            </div >
        )
    }

}
const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => { dispatch(actions.fetchGenderStart()) },

        getPositionStart: () => { dispatch(actions.fetchPositionStart()) },

        getRoleStart: () => { dispatch(actions.fetchRoleStart()) },

        createNewUser: (data) => { dispatch(actions.createNewUser(data)) },

        fetchManageOfPatient: () => { dispatch(actions.fetchAllUsersStart()) },

        editManageOfPatient: (data) => { dispatch(actions.editUser(data)) }


        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageFromAppHome: (language) => dispatch(actions.changeLanguageFromApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOfPatient);
