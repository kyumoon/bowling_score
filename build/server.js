"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path = require("path");
var os = require("os");
var api_1 = require("./api");
var dbConfig_1 = require("./dbConfig");
var body_parser_1 = require("body-parser");
dbConfig_1["default"]();
var app = express_1["default"]();
var PORT = process.env.PORT || 5050;
app.use(express_1["default"].static(path.join(__dirname, '..', 'public/')));
app.use(body_parser_1["default"]());
// if you need api routes add them here
app.get("/api/getUsername", function (req, res, next) {
    res.send({ username: os.userInfo().username + 'test' });
});
api_1["default"](app);
app.listen(PORT, function () {
    console.log("Check out the app at http://localhost:" + PORT);
});
