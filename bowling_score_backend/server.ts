import express from 'express';
import * as path from 'path';
import * as os from 'os';
import apiRegister from './api';


const app =express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'public/')));

// if you need api routes add them here
app.get("/api/getUsername", function(req, res, next){
apiRegister(app);

res.send({ username: os.userInfo().username+'test' });
});

app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});