import mongoose from 'mongoose';

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/bowling_score',{useNewUrlParser:true});

export default db;