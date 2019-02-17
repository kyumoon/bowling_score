"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var api_1 = __importDefault(require("./api"));
var app = express_1.default();
var PORT = process.env.PORT || 4000;
app.use(express_1.default.static(path.join(__dirname, '..', 'public/')));
// if you need api routes add them here
app.get("/api/getUsername", function (req, res, next) {
    api_1.default(app);
    res.send({ username: os.userInfo().username });
});
app.listen(PORT, function () {
    console.log("Check out the app at http://localhost:" + PORT);
});
