"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
function dbConnection() {
    var db = mongoose_1["default"].connection;
    db.on('error', console.error);
    db.once('open', function () {
        // CONNECTED TO MONGODB SERVER
        console.log("Connected to mongod server");
    });
    mongoose_1["default"].connect('mongodb://localhost/bowling_score', { useNewUrlParser: true });
}
exports["default"] = dbConnection;
;
