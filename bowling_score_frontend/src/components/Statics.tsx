import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as Chart from 'chart.js';

@inject('store')
@observer
class Statics extends React.Component<any, any>{
    canvas: any;
    chart: any;
    store = this.props.store;

    public render() {
        return (
            <div id="myChart">
                <canvas ref={ref => (this.canvas = ref)} />
            </div>
        );
    }

    
    draw() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        // const {  pair } = this.props;
        const data = this.store.avgList;
        const config = {
            type: "line",
            data: {
                labels: data.map((d:any) => d._id.date),
                datasets: [
                    {
                        label: "점수",
                        data: data.map((d:any) => d.avgScore),
                        fill: false,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        lineTension: 0,
                        pointRadius: 0,
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: `주간 에버리지`
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                }
            }
        };
        
        const ctx = this.canvas.getContext("2d");
        //@ts-ignore
        this.chart = new Chart(ctx,config);
    }

    async getData() {
        await this.store.selectAvg();
        this.draw();
    }

    componentDidMount() {
        this.getData();
    }
}

export default Statics;