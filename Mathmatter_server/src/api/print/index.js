const Router = require("koa-router");

const print = new Router();
const printCtrl = require('./print.ctrl');

print.post('/', printCtrl.setType);
print.post('/:type', printCtrl.setPrint);

module.exports = print;
