import actionTypes from '../actions/actionTypes';
const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],

    topTeachers: [],
    allTeachers: [],
    allScheduleTime: [],

}
const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            state.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = []
            return {
                ...state,
            }





        //positions
        case actionTypes.FETCH_POSITION_START:
            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }

        //role

        case actionTypes.FETCH_ROLE_START:
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }



        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }


        //Top Teacher
        case actionTypes.FETCH_TOP_TEACHER_SUCCESS:
            state.topTeachers = action.dataTeachers;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_TEACHER_FAILED:
            state.topTeachers = [];
            return {
                ...state,
            }

        //all doctor
        case actionTypes.FETCH_ALL_TEACHER_SUCCESS:
            state.allTeachers = action.dataAllTeachers;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_TEACHER_FAILED:
            state.allTeachers = [];
            return {
                ...state,
            }

        //Time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = [];
            return {
                ...state,
            }

        default:
            return state;






    }
}

export default adminReducer;