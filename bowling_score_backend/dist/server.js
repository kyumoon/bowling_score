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
var dbConfig_1 = __importDefault(require("./dbConfig"));
var body_parser_1 = __importDefault(require("body-parser"));
dbConfig_1.default();
var app = express_1.default();
var PORT = process.env.PORT || 5050;
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.use(express_1.default.static(path.join(__dirname, '.','public')));
app.use(body_parser_1.default());
// if you need api routes add them here
app.get("/", function (req, res) {
    res.render('index.html');
});
app.get("/api/getUsername", function (req, res, next) {
    res.send({ username: os.userInfo().username + 'test' });
});
api_1.default(app);
app.listen(PORT, function () {
    console.log("Check out the app at http://localhost:" + PORT);
});
//# sourceMappingURL=server.js.map