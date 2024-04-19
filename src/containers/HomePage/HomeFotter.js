import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HomeFotter.scss'
import { FormattedMessage } from 'react-intl';
class HomeFotter extends Component {

    render() {

        return (
            <div className='general stage-homeFotter'>
                <div>&copy; 2024 Education Master
                    <a target="_blank" href='https://github.com/'> Click here to visiting my webiste</a></div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFotter);
