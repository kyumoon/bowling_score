import {Express} from 'express';
import db from '../dbConfig';
import mongoose,{Schema} from 'mongoose';

var ScoreSchema = new Schema({
    name: String,
    score: Number,
    reg_date: {type: Date, default: Date.now}
});

const IScore  = mongoose.model('score', ScoreSchema);

export default function(app:Express){
    app.post('./score',(req,res)=>{
        let temp = new IScore({name:'test',score:150});
        temp.save((err,score)=>{
            if(err){
                console.error(err);
            }else{
                console.log(score);
            }
        });
    });


}