const Router = require("koa-router");
const api = new Router();

const print = require("./print");
const profile = require("./profile");
const auth = require("./auth");

api.use("/print", print.routes());
api.use("/profile", profile.routes());
api.use("/auth", auth.routes());

module.exports = api;