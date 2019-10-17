import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';

class HighchartsComp extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
        }
    }


    getMostCitied = () => {
        const mostCitied = _.maxBy(this.props.list, function(listItem) {
            return { year : listItem.pubYear, citedByCount: listItem.citedByCount} ;
        });
        return mostCitied;
    }

    getSeries = () => {
        let series = [];
        const yearCounts = _(this.props.list).groupBy('pubYear').map((items, name) => ({ name, count: items.length })).value();
        _.map(yearCounts, (item) => {
            series.push([item.name, item.count ])
        })    
        return series;
    }
    
    getCategories = () => {
        let years = []
        _.map(this.props.list, (listItem) => {
            years.push(listItem.pubYear);
        })
        return _.uniq(years);
    }
    

    render(){
        return(
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: "column",
                        animation: false
                    },
                    title: {
                        text: 'Europe PCM publications based on the year'
                    },
                    series: [{ name: 'Publications',data: this.getSeries()}],
                    xAxis: {
                        type: 'category'
                    },
                    tooltip: {
                        valueSuffix: ' Publications' ,
                    },
                    plotOptions: {
                        series: {
                            point: {
                                events: {
                                    mouseOver: function () {
                                        var chart = this.series.chart;
                                        if (!chart.lbl) {
                                            chart.lbl = chart.renderer.label('')
                                                .attr({
                                                    padding: 10,
                                                    r: 10,
                                                    fill: Highcharts.getOptions().colors[1]
                                                })
                                                .css({
                                                    color: '#FFFFFF'
                                                })
                                                .add();
                                        }
                                        chart.lbl
                                            .show()
                                            .attr({
                                                text: 'x: ' + this.x + ', y: ' + this.y
                                            });
                                    }
                                }
                            },
                            events: {
                                mouseOut: function () {
                                    if (this.chart.lbl) {
                                        this.chart.lbl.hide();
                                    }
                                }
                            }
                        }
                    },
                }}
            />
        )
    }
}

export default HighchartsComp;