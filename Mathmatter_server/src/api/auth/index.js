const Router = require('koa-router');

const auth = new Router();
const authCtrl = require('./auth.ctrl');

auth.get('/exists/userId/:userId', authCtrl.checkId);
auth.get('/exists/email/:email', authCtrl.checkEmail);
auth.post('/login', authCtrl.login);
auth.post('/register', authCtrl.register);
auth.post('/logout', authCtrl.logout);
auth.delete('/withdraw', authCtrl.withdraw);

module.exports = auth;
