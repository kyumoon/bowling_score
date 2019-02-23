import {action, observable} from "mobx";
import * as React from "react";

interface ScoreObj {
    id:number,
    score:number,
    crudType:String
}

class ScoreStore{
    @observable scoreList:Array<ScoreObj>=[];
    originScoreList:Array<ScoreObj>=[];
    @observable avgList:Array<any>=[];

    @action
    addScoreList = (score:number)=>{
        let newItem = {
            id: new Date().getMilliseconds()+Math.random(),
            score,
            crudType : "C"
        }
        this.originScoreList.splice(0,0,newItem);
        this.scoreList.splice(0,0,newItem);
    }

    @action
    removeScore = (score:ScoreObj)=>{
        score.crudType = score.crudType === 'D' ? '': 'D' ;
    }

    saveScores = ()=>{
        let newScores:Array<ScoreObj> = this.scoreList.filter((score:ScoreObj)=>{
            return score.crudType === 'C' || score.crudType === 'D';
        });

        if(newScores.length === 0){
            alert('저장할 대상이 없습니다.');
        }
        let body = {
            newScores
        }

        let request = {
            method: 'post',
            body : JSON.stringify(body),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        }
        fetch('/score',request).then((response:Response):any=>{
            if(response.ok){
                return response.text();
                // return response.json();
            }else{
                console.log('save api error!');
            }
        }).then((json:any)=>{
            console.dir(json);
            this.selectList();
        });
    }

    @action
    selectList = (defaultGame = 5)=>{
        let request = {
            method: 'get',
        };
        
        fetch(`/score/${defaultGame}`,request).then((response:Response):any=>{
            if(response.ok){
                console.log('response 200');
                return response.json();
            }else{
                console.log('response error occured!!');
            }
        }).then((json:any)=>{
            console.dir(json);
            this.originScoreList = json||[];
            this.scoreList = json||[];
        });
    }

    getAvg = ()=>{
        let scoreSum = 0;
        if(this.scoreList.length === 0){
            return;
        }
        const scoreList = this.scoreList.map((item:any)=>{
            scoreSum+=item.score;
            return <li key={item.id}>{item.score}</li>
        });
        let scoreAvg = Math.round(scoreSum/scoreList.length*10)/10;
        return scoreAvg;
    }

    @action
    selectAvg = async (limitDays = 7)=>{
        let request = {
            method: 'get',
        };
        
        await fetch(`/average-of-day/${limitDays}`,request).then((response:Response):any=>{
            if(response.ok){
                console.log('response 200');
                return response.json();
            }else{
                console.log('response error occured!!');
            }
        }).then((json:any)=>{
            console.dir(json);
            this.avgList = json||[];
        });
    }
}

const scoreStore = new ScoreStore();

export default scoreStore;