import * as React from 'react';
import { inject, observer } from 'mobx-react'
import ScoreInput from "./ScoreInput";
import * as moment from 'moment';


interface ScoreObj {
    id: number,
    score: number,
    crudType: string,
    reg_date: string
}

@inject('store')
@observer
class ScoreBoard extends React.Component<any, any>{
    scoreStore = this.props.store;
    constructor(props: any) {
        super(props);
        // this.scoreStore.selectList();
    }

    public render() {
        let scoreSum = 0;
        let scoreAvg = 0;
        const temp = {
            color: 'red'
        }

        let returnDate = (item: ScoreObj) => {
            return <span>{item.reg_date ? moment(item.reg_date).format('YYYY-MM-DD HH:mm') : 'new'}</span>
        }

        const scoreList = this.scoreStore.scoreList.map((item: any) => {
            scoreSum += item.score;
            if (item.crudType === 'D') {
                //_id값은 db에 저장된값, id값은 랜덤값(신규등록전 임시사용)
                return <li key={item._id || item.id}>
                            <del style={temp}>{item.score}</del>
                            <button className="delete-btn" onClick={() => { this.scoreStore.removeScore(item); }}>취소</button>{returnDate(item)}
                        </li>
            }
            return <li className="score" key={item._id || item.id}>
                        {item.score}{" | "} 
                        {returnDate(item)}
                        <button className="delete-btn" onClick={() => { this.scoreStore.removeScore(item); }}>X</button>
                    </li>
        });

        const scoreButtons = [5, 7, 10, 20, 30].map((item) => {
            return <li className="flex" onClick={this.onClick} data-game={item}>{item}게임</li>;
        });

        if (scoreList.length) {
            scoreAvg = Math.round(scoreSum / scoreList.length * 10) / 10;
        }
        return (
            <div>
                <ul className="floating-left flex_container">
                    {scoreButtons}
                </ul>
                <ScoreInput />
                <div className="score">평균 : {scoreAvg}</div>
                <ul>
                    {scoreList}
                </ul>
                <button className="wide_button" onClick={this.scoreStore.saveScores}> 저장</button>
            </div>
        );
    }

    onClick = (e: any) => {
        let target = e.target;
        let gameCount = +target.getAttribute('data-game') || 0;
        this.scoreStore.selectList(gameCount);
    }

    componentDidMount() {
        this.scoreStore.selectList();
    }

}

export default ScoreBoard;