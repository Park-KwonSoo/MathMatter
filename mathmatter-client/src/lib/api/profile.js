import client from './client';

export const getProfile = () => client.get('/api/profile/getProfile');
export const getPrintList = () => client.get('/api/profile/getPrintList');
export const getWriteList = () => client.get('/api/profile/getWriteList');

export const setProfile = ({birth, phoneNumber, email, userName}) => client.patch('/api/profile/setProfile');