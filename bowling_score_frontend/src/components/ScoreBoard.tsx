import * as React from 'react';
import {inject, observer} from 'mobx-react'
import ScoreInput from "./ScoreInput";
import * as moment from 'moment';


interface ScoreObj {
    id:number,
    score:number,
    crudType:string,
    regDate:string
}
@inject('store')
@observer
class ScoreBoard extends React.Component<any,any>{
    scoreStore = this.props.store;
    constructor(props:any){
        super(props);
        // this.scoreStore.selectList();
    }

    public render(){
        let scoreSum = 0;
        let scoreAvg = 0;
        const temp = {
            color:'red'
        }

        let returnDate = (item:ScoreObj)=>{
            return <span>{moment(item.regDate).format('YYYY-MM-DD HH:mm:ss')}</span>
        }

        const scoreList = this.scoreStore.scoreList.map((item:any)=>{
            scoreSum+=item.score;
            // const date = <span>{item.regDate}</span>;
            if(item.crudType === 'D'){
                return <li><del key={item.id} style={temp}>{item.score}</del><button  className={'delete-btn'} onClick={()=>{  this.scoreStore.removeScore(item);} }>Cancle</button>{returnDate(item)}</li>
            }
            return <li key={item.id}>{item.score}<button  className={'delete-btn'} onClick={()=>{  this.scoreStore.removeScore(item);} }>X</button>{returnDate(item)}</li>
        });
        if(scoreList.length){
            scoreAvg = Math.round(scoreSum/scoreList.length*10)/10;
        }
        return (
            <div>
                <ul className="floating-left">
                    <li onClick={this.onClick} data-game={5}>5게임</li>
                    <li onClick={this.onClick} data-game={7}>7게임</li>
                    <li onClick={this.onClick} data-game={10}>10게임</li>
                    <li onClick={this.onClick} data-game={20}>20게임</li>
                    <li onClick={this.onClick} data-game={30}>30게임</li>
                </ul>
                <ScoreInput/>
                <div>Average : {scoreAvg}</div>
                <ul>
                    {scoreList}
                </ul>
                <button onClick={this.scoreStore.saveScores}> 저장</button>
            </div>
        );
    }

    onClick=(e: any)=>{
        let target = e.target;
        let gameCount = +target.getAttribute('data-game')||0;
        this.scoreStore.selectList(gameCount);
    }

}

export default ScoreBoard;