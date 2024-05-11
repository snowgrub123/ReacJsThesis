import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Clinic.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { languages } from '../../../utils';
import { withRouter } from 'react-router';
import { getAllClinic } from '../../../services/accService';

class Subject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        let res = await getAllClinic();
        console.log("check res from clinic", res)
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
        // alert('Click me')
    }

    render() {
        let { dataClinic } = this.state;

        return (
            <div className='general stage-subject'>
                <div className='class-container'>
                    <div className='class-header'>
                        <div className="class-header-title">Các Phòng Khám</div>
                        <button className='class-header-detail'>Xem Thêm</button>
                    </div>
                    <div className='class-content'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0
                                && dataClinic.map((item, index) => {
                                    return (
                                        <div className='class-customize clinic-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}

                                        >
                                            <div className="class-img stage-subject-img"
                                                style={{ backgroundImage: `url(${item.hinhAnh})` }}
                                            />
                                            <span className='title-under-img'>{item.tenPhongKham}</span>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subject));
