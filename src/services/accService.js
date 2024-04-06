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
export { handleLoginUser, getAllUsers, createNewUserFromService }