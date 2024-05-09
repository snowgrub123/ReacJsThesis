import React, { Component } from 'react';
import { connect } from "react-redux";
import './TeacherExtrainfor.scss'
import { getScheduleTeacherByDateService, getExtraTeacherByIDService } from '../../../../services/accService';
import { languages } from '../../../../utils';
import NumberFormat from 'react-number-format';
class TeacherExtrainfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.teacherIDFromParent !== prevProps.teacherIDFromParent) {
            let res = await getExtraTeacherByIDService(this.props.teacherIDFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props
        console.log('extra info', this.state.extraInfor)
        return (
            <div className='teacher-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Adress CenTral</div>
                    <div className='name-central'>
                        {extraInfor && extraInfor.nameCentral ? extraInfor.nameCentral : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressCentral ? extraInfor.addressCentral : ''}

                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            Price :
                            {extraInfor && extraInfor.priceTypeData && language === languages.VI
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.value_vi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === languages.EN
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.value_en}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'USD'}
                                />
                            }
                            <span className="detail" onClick={() => this.showHideDetailInfor(true)}>
                                More detail
                            </span>

                        </div>

                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>Price Study.</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Gia kham</span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === languages.VI
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.value_vi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === languages.EN
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.value_en}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'USD'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                                <div className='payment'>
                                    {extraInfor && extraInfor.paymentTypeData
                                        && language === languages.VI
                                        ? extraInfor.paymentTypeData.value_vi : ''}
                                    {extraInfor && extraInfor.paymentTypeData
                                        && language === languages.EN
                                        ? extraInfor.paymentTypeData.value_en : ''}

                                </div>
                                <div className='hide-price'>
                                    <span onClick={() => this.showHideDetailInfor(false)}>
                                        Hide PriceTable
                                    </span>
                                </div>
                            </div>

                        </>
                    }
                </div>
            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExtrainfor);
