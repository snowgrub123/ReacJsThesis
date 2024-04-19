import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
    componentDidMount() {
    }


    render() {
        return (
            <div>
                <div className="user-redux-container" >
                    <div className='title'>
                        User Redux mangage with khang dang
                    </div>
                    <div className='content'>
                        <div className='contented'>Add new user</div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
