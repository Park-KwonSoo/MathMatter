const Router = require("koa-router");
const api = new Router();

const print = require("./print");
const profile = require("./profile");
const question = require("./question");
const user = require("./user");

api.use("/print", print.routes());
api.use("/profile", profile.routes());
api.use("/question", question.routes());
api.use("/user", user.routes());

module.exports = api;