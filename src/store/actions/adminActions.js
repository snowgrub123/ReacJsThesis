import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserFromService,
    getAllUsers,
    deleteFromServive,
    editFromServive,
} from '../../services/accService';
import { data, type } from 'jquery';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let respone = await getAllCodeService("GENDER");
            if (respone && respone.errCode === 0) {
                dispatch(fetchGenderSuccess(respone.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('check fetchStart from error', error)
        }
    }

}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let respone = await getAllCodeService("POSITION");
            if (respone && respone.errCode === 0) {
                dispatch(fetchPositionSuccess(respone.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('check fetchStart from error', error)
        }
    }

}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let respone = await getAllCodeService("ROLE");
            if (respone && respone.errCode === 0) {
                dispatch(fetchRoleSuccess(respone.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('check fetchStart from error', error)
        }
    }

}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let respone = await createNewUserFromService(data);
            if (respone && respone.errCode === 0) {
                toast.success('Tạo mới người dùng thành công')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Lỗi khi tạo User')
                dispatch(saveUserFailed());
            }
        } catch (error) {
            toast.error('Lỗi khi tạo User')
            dispatch(saveUserFailed());
            console.log('check fetchStart from error', error)
        }
    }
}


export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'

})
export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'

})
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})



export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let respone = await getAllUsers("all");
            if (respone && respone.errCode === 0) {
                dispatch(fetchAllUsersSuccess(respone.user.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('check fetchStart from error', error)
        }
    }

}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

//DELETE
export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

// DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
// DELETE_USER_FAILED: 'DELETE_USER_FAILED',


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let respone = await deleteFromServive(userId);
            if (respone && respone.errCode === 0) {
                toast.success('Đã xóa người dùng thành công')
                dispatch(deleteUsersSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Chưa xóa người dùng')
                dispatch(deleteUsersFailed());
            }
        } catch (error) {
            toast.error('error?')
            dispatch(deleteUsersFailed());
            console.log('error from delete', error)
        }
    }

}



export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let respone = await editFromServive(data);
            if (respone && respone.errCode === 0) {
                toast.success('Update succeed')
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Lỗi Update succeed')
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error('Lỗi Update succeed')
            dispatch(editUserFailed());
            console.log('check fetchStart from error', error)
        }
    }
}
