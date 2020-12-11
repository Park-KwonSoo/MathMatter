const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const fs = require("fs");
const api = require("./src/api");
const jwtMiddleware = require("./src/lib/jwtMiddleware");

require("dotenv").config();

const app = new Koa();
const router = new Router();
const accessLogStream = fs.createWriteStream(__dirname + "access.log", {
    flags : "a",
});

app.use(bodyParser());
app.use(jwtMiddleware);
const { SERVER_PORT, MONGO_URL } = process.env;

router.use("/api", api.routes());
app.use(router.routes()).use(router.allowedMethods());

mongoose.connect(MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((e) => {
        console.log(e);
    });

app.listen(SERVER_PORT, () => {
    console.log("Connected to PORT" + SERVER_PORT);
})