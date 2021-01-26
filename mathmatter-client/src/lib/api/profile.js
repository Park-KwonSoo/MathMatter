import client from './client';

export const setLoggedInfo = () => client.get('/api/profile/getProfile');