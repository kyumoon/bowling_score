"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ScoreSchema = new mongoose_1.Schema({
    name: String,
    score: Number,
    reg_date: { type: Date, "default": Date.now }
});
exports.scoreTernal = mongoose_1["default"].model('score', ScoreSchema);
function default_1(app) {
    app.post('/score', function (req, res) {
        var saveList = req.body.newScores || [];
        saveList.reverse().map(function (item) {
            switch (item.crudType) {
                case 'C':
                    var temp = new exports.scoreTernal({ score: item.score, reg_date: item.regDate });
                    temp.save().then(function (score) {
                        console.log(score);
                        res.status(200).send('success');
                    })["catch"](function (err) {
                        console.log(err);
                    });
                    break;
                case 'D':
                    exports.scoreTernal.remove({ _id: item._id }).then(function (result) {
                        console.log(result + ' removed');
                    })["catch"](function (err) {
                        console.log('remove error');
                    });
                    break;
            }
        });
        res.status(200).send('success');
    });
    app.get('/score/:game', function (req, res) {
        exports.scoreTernal.find(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.send(result);
            }
        }).sort({ _id: -1 }).limit(+req.params.game);
    });
    app.get('/average-of-day/:limitDays', function (req, res) {
        exports.scoreTernal.aggregate([
            {
                $group: {
                    _id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$reg_date" } } },
                    avgScore: { $avg: "$score" }
                }
            },
            { $limit: +req.params.limitDays },
            { $sort: { "_id": 1 } }
        ], function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.send(result);
            }
        });
    });
}
exports["default"] = default_1;
