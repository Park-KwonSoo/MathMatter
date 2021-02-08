const Router = require("koa-router");

const print = new Router();
const printCtrl = require('./print.ctrl');

print.post('/', printCtrl.setType);
print.post('/:type', printCtrl.setPrint);
print.get('/:printId', printCtrl.readPrint);

module.exports = print;
