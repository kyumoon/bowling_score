import * as React from 'react';
import {inject, observer} from 'mobx-react'
import {observable} from "mobx";
import scoreStore from "../store/ScoreStore";

@inject('store')
@observer
class ScoreInput extends React.Component<any,any>{
    scoreStore = this.props.store;
    @observable value='';
    constructor(props:any){
        super(props);
    }

    public render(){
        return (
            <div>
                <div>
                    <input className="wide_button" placeholder="점수" id={'scoreInput'} onChange={this.onChange} onKeyDown={this.onEnter}  value={this.value}/>
                </div>
                <button className="wide_button" onClick={this.onEnter} >추가</button>
            </div>
            );
    }

    onEnter = (e:any)=>{
        let temp = document.getElementById('scoreInput') as HTMLInputElement;
        let newVal:string = temp.value;
        if(e.key === 'Enter' || e.currentTarget.textContent === 'Add'){
            this.value='';
            scoreStore.addScoreList( +newVal );
            return;
        }
    }

    onChange = (e:any)=>{
        let newVal:string = e.target.value;
        this.value = newVal;
    }

}

export default ScoreInput;