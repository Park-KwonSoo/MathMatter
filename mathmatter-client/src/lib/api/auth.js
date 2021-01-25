import axios from 'axios';

export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
export const checkUserIdExists = (userId) => axios.get('/api/auth/exists/userId/' + userId);

export const localRegister = ({userId, email, password }) => axios.post('/api/auth/register', { userId, email, password });
export const localLogin = ({userId, password}) => axios.post('/api/auth/login', { userId, password });

export const checktStatus = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');