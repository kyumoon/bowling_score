import express from 'express';
import * as path from 'path';
import * as os from 'os';
import apiRegister from './api';
import dbConnection from './dbConfig';
import bodyParser from 'body-parser';


dbConnection();


const app =express();
const PORT = process.env.PORT || 5050;

app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use(bodyParser());

// if you need api routes add them here

app.get("/api/getUsername", function(req, res, next){
    res.send({ username: os.userInfo().username+'test' });
});
apiRegister(app);

app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});