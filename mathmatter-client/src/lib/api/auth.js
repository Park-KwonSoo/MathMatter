import client from './client';

export const checkEmailExists = (email) => client.get('/api/auth/exists/email/' + email);
export const checkUserIdExists = (userId) => client.get('/api/auth/exists/userId/' + userId);

export const localRegister = ({userId, email, password }) => client.post('/api/auth/register', { userId, email, password });
export const localLogin = ({userId, password}) => client.post('/api/auth/login', { userId, password });

export const checkStatus = () => client.get('/api/auth/check');
export const logout = () => client.post('/api/auth/logout');