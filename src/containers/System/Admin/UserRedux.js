import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/accService';
import { languages } from '../../../utils';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGender: []
        }
    }

    async componentDidMount() {
        try {
            let respone = await getAllCodeService('gender')
            if (respone && respone.errCode === 0) {
                this.setState({
                    arrGender: respone.data
                })
            }
            console.log("Check", respone)
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        console.log('check from reduxxxx:', this.state)
        let genders = this.state.arrGender;
        let language = this.props.language;
        return (
            <div>
                <div className="user-redux-container" >
                    <div className='title'>
                        User Redux mangage with khang dang
                    </div>
                    <div className='user-redux-body'>
                        <div className="container">
                            <div className="row">
                                <div className='col-12 my-3'><FormattedMessage id="manage-user.add" />   </div>
                                <div className='col-3'>
                                    <label for="inputFirstName"><FormattedMessage id="manage-user.firstName" /></label>
                                    <input type="text" class="form-control" id="ho" placeholder="First Name" />
                                </div>
                                <div className='col-3'>
                                    <label for="inputLastName"><FormattedMessage id="manage-user.lastName" /></label>
                                    <input type="text" class="form-control" id="ten" placeholder="First Name" />
                                </div>
                                <div className='col-3'>
                                    <label for="email"><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" class="form-control" id="email" placeholder="Your Email" />
                                </div>
                                <div className='col-3'>
                                    <label for="inputLastName"><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" class="form-control" id="password" placeholder="Password" />
                                </div>
                                <div class="col-4">
                                    <label for="inputAddress"><FormattedMessage id="manage-user.phoneNumber" /></label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="09872321" />
                                </div>
                                <div class="col-8">
                                    <label for="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                                </div>
                                <div class="col-6">
                                    <label for="inputCity"><FormattedMessage id="manage-user.city" /></label>
                                    <input type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-6">
                                    <label for="inputState"><FormattedMessage id="manage-user.gender" /></label>
                                    <select id="inputState" class="form-control">
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === languages.VI ? item.value_vi : item.value_en}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="inputState"><FormattedMessage id="manage-user.roleId" /></label>
                                    <select id="inputState" class="form-control">

                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="inputState"><FormattedMessage id="manage-user.avatar" /></label>
                                    <select id="inputState" class="form-control">
                                    </select>
                                </div>
                                <div className='col-12 mt-3'>
                                    <button className='btn-primary'><FormattedMessage id="manage-user.save" /></button>
                                </div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
