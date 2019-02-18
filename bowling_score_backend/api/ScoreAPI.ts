import { Express } from 'express';
import db from '../dbConfig';
import mongoose, { Schema } from 'mongoose';

interface IScore {
    _id: string,
    score: number,
    crudType: string,
    regDate: Date
}
var ScoreSchema = new Schema({
    name: String,
    score: Number,
    reg_date: { type: Date, default: Date.now }
});

export const scoreTernal = mongoose.model('score', ScoreSchema);

export default function (app: Express) {
    app.post('/score', (req, res) => {
        let saveList = req.body.newScores || [];
        saveList.map((item: IScore) => {
            switch (item.crudType) {
                case 'C':
                    let temp = new scoreTernal({ score: item.score, reg_date: item.regDate });
                    temp.save().then((score) => {
                        console.log(score);
                        res.status(200).send('success');
                    }).catch((err) => {
                        console.log(err);

                    });
                    break;
                case 'D':
                    scoreTernal.remove({ _id: item._id }).then((result) => {
                        console.log(result + ' removed');
                    }).catch((err) => {
                        console.log('remove error')
                    });
                    break;
            }
        });
    });

    app.get('/score/:game', (req, res) => {
        let result = null;
        scoreTernal.find((err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        }).sort({_id:-1}).limit(+req.params.game);

    })
}