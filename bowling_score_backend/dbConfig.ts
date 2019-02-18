import mongoose from 'mongoose';

export default function dbConnection(){
    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function(){
        // CONNECTED TO MONGODB SERVER
        console.log("Connected to mongod server");
    });

    mongoose.connect('mongodb://localhost/bowling_score',{useNewUrlParser:true});
};