import React, { Component } from 'react';
import { connect } from "react-redux";
// import { getScheduleTeacherByDateService, getExtraTeacherByIDService } from '../../../../services/accService';
// import { languages } from '../../../../utils';
import UserRedux from '../Admin/UserRedux';
class RegisterAcc extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let { language } = this.props
        return (
            <>
                <UserRedux></UserRedux>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAcc);
