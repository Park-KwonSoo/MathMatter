import client from './client';

export const getProfile = () => client.get('/api/profile/getProfile');
export const patchProfile = ({birth, phoneNumber, userName}) => client.patch('/api/profile/setProfile', {birth, phoneNumber, userName});