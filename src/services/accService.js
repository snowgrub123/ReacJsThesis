import axios from '../axios';

const handleLoginUser = (email, password) => {
    return axios.post('/api/login', { email, password });
}
export { handleLoginUser }