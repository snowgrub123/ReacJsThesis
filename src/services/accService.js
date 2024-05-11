import axios from '../axios';

const handleLoginUser = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/getalluser?id=${inputId}`)
}

const createNewUserFromService = (data) => {
    console.log("Check from Service: ", data)
    return axios.post('/api/createNewUser', data)
}
const deleteFromServive = (userID) => {
    // return axios.delete("/api/deleleUser", { id: userID })
    return axios.delete('/api/deleleUser', {
        data: {
            id: userID
        }
    })
}
const editFromServive = (inputData) => {
    // return axios.delete("/api/deleleUser", { id: userID })
    return axios.put('/api/editUser', inputData)
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopTeacherHomeService = (limit) => {
    return axios.get(`api/top-doctor-home?limit=${limit}`)
}
const getAllTeacherService = () => {
    return axios.get(`api/get-all-teacher`)
}
const saveDetailTeacherService = (data) => {
    return axios.post('/api/save-infor-teacher', data)
}

const getDetailTeacherInfoService = (inputId) => {
    return axios.get(`/api/get-detail-teacher-by-id?id=${inputId}`)
}

const saveBulkScheduleTeacherService = (data) => {
    return axios.post('/api/bulk-create-schesule', data)
}
const getScheduleTeacherByDateService = (teacherID, date) => {
    return axios.get(`/api/get-schedule-teacher-by-date?giaoVienID=${teacherID}&date=${date}`)
}


const getExtraTeacherByIDService = (teacherID) => {
    return axios.get(`/api/get-extra-infor-teacher-by-id?giaoVienID=${teacherID}`)
}


const getProfileTeacherByIDService = (teacherID) => {
    return axios.get(`/api/get-profile-teacher-by-id?giaoVienID=${teacherID}`)
}

const postPatientBookingAppointmentService = (data) => {
    return axios.post('/api/patient-book-appoiment', data)
}


const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getDetailSpecialty = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)

}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}
const getDetailClinic = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}}`)

}
export {
    handleLoginUser,
    getAllUsers,
    createNewUserFromService,
    deleteFromServive,
    editFromServive,
    getAllCodeService,
    getTopTeacherHomeService,
    getAllTeacherService,
    saveDetailTeacherService,
    getDetailTeacherInfoService,
    saveBulkScheduleTeacherService,
    getScheduleTeacherByDateService,
    getExtraTeacherByIDService,
    getProfileTeacherByIDService,
    postPatientBookingAppointmentService,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
    createNewClinic,
    getAllClinic,
    getDetailClinic
}