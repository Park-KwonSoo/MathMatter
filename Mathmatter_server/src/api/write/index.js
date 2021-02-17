const Router = require('koa-router');

const write = new Router();
const writeCtrl = require('./write.ctrl');

write.post('/write', writeCtrl.writing);
write.patch('/:postId', writeCtrl.replying);
write.get('/all', writeCtrl.seeAllWriting);
write.get('/mywrite', writeCtrl.getMyWriting);
write.get('/:postId', writeCtrl.seeWriting);
write.patch('/:postId/edit', writeCtrl.editWriting);
write.delete('/:postId', writeCtrl.deleteWriting);

module.exports = write;