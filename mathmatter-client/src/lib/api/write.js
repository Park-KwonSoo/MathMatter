import client from './client';

export const writing = ({title, body}) => client.post('/api/write/write', {title, body});
export const seeBoard = () => client.get('/api/write/all');
export const seeMyWritingList = () => client.get('/api/write/mywrite');
export const seeWriting = (postId) => client.get('/api/write/' + postId);
export const replying = ({postId, body}) => client.patch('/api/write/' + postId, {body});
export const editing = ({postId, title, body}) => client.patch('/api/write/' + postId + '/edit', {title, body});
export const deleteWriting = (postId) => client.delete('/api/write/' + postId);