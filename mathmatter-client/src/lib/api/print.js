import client from './client';

export const setPrint = ({type}) => client.post('/api/print/' + type);
export const getPrintList = () => client.get('/api/profile/getPrintList');