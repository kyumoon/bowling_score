"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var ScoreSchema = new mongoose_1.Schema({
    name: String,
    score: Number,
    reg_date: { type: Date, default: Date.now }
});
var IScore = mongoose_1.default.model('score', ScoreSchema);
function default_1(app) {
    app.post('./score', function (req, res) {
        var temp = new IScore({ name: 'test', score: 150 });
        temp.save(function (err, score) {
            if (err) {
                console.error(err);
            }
            else {
                console.log(score);
            }
        });
    });
}
exports.default = default_1;
