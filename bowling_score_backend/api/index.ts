import {Express} from 'express';
import scoreAPI from './ScoreAPI';



export default function(app:Express){
    scoreAPI(app);
    
}