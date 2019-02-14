import * as React from 'react';
import {inject, observer} from 'mobx-react';
// import * as chart from 'chartjs';

@inject('store')
@observer
class Statics extends React.Component<any,any>{

    public render(){
        return (
            <canvas id="myChart" width="400" height="400"></canvas>
        );
    }

    // componentDidMount(){
    //     var ctx = document.getElementById("myChart");
       
    // }
}

export default Statics;