const Router = require('koa-router');

const write = new Router();
const writeCtrl = require('./write.ctrl');

write.post('/write', writeCtrl.writing);
write.post('/:postId', writeCtrl.replying);
write.get('/all', writeCtrl.seeAllWriting);
write.get('/:postId', writeCtrl.seeWriting);
write.delete('/:postId', writeCtrl.deleteWriting);

module.exports = write;