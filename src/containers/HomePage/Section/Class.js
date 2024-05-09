import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Class.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { languages } from '../../../utils';
import { withRouter } from 'react-router';
import { getAllSpecialty } from '../../../services/accService'
class Class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log("check res from class", res)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.specialty ? res.specialty : []
            })
        }
    }

    render() {
        let { dataSpecialty } = this.state;
        console.log("check dataSpecial from class", this.state)

        return (
            <div className='general stage-specialty'>
                <div className='class-container'>
                    <div className='class-header'>
                        <div className="class-header-title">
                            <FormattedMessage id="homepage.outstanding-speciality" /></div>
                        <button className='class-header-detail'>
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>
                    <div className='class-content'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0
                                && dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='class-customize specialty-child'
                                            key={index}>
                                            <div className="class-img stage-specialty-img"
                                                style={{ backgroundImage: `url(${item.hinhAnh})` }}
                                            />
                                            <span className='title-under-img specialty-name'>{item.tenChuyenKhoa}</span>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Class);
