import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageTeacher from '../containers/System/Admin/ManageTeacher';
import ManageSchedule from '../containers/System/Teacher/ManageSchedule';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageOfPatient from '../containers/System/Admin/ManageOfPatient';
// import Home from './Home';
import HomePage from '../containers/HomePage/HomePage';
import ManagePersonalDoctor from '../containers/System/Teacher/ManagePersonalDoctor';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-teacher" component={ManageTeacher} />
                            <Route path="/teacher/manage-teacher" component={ManageSchedule} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route path="/system/manage-patient-user" component={ManageOfPatient} />
                            <Route path="/system/manage-teacher-by-teacher" component={ManagePersonalDoctor} />

                            <Route path="/home" component={HomePage} />


                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
