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
export { handleLoginUser, getAllUsers, createNewUserFromService, deleteFromServive, editFromServive }