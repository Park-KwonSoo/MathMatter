import client from './client';

export const writing = ({title, body}) => client.post('/api/write/write', {title, body});
export const seeBoard = () => client.get('/api/write/all');
export const seeMyWritingList = () => client.get('/api/profile/getWriteList');
export const seeWriting = (postId) => client.get('/api/write/' + postId);
export const replying = (postId) => client.post('/api/write/' + postId);
export const deleteWriting = (postId) => client.delete('/api/write/' + postId);