const Router = require('koa-router');

const profile = new Router();
const profileCtrl = require('./profile.ctrl');

profile.patch('/setProfile', profileCtrl.setProfile);
profile.get('/getPrintList', profileCtrl.getPrintList);

module.exports = profile;