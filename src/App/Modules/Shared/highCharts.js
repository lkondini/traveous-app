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
        let mostCitied = _(this.props.list)
        .groupBy('pubYear')
        .mapValues(listItem => ({
            citiedItem: _.maxBy(listItem, 'citedByCount'),
            max: _.maxBy(listItem, 'citedByCount').citedByCount,
        })).value()
        const citiedList = _.map(mostCitied, (item, prop) => {
            return { year: prop, maxCount: item.max, title: item.citiedItem.title }
        })
        return citiedList;
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
        const citiedList = this.getMostCitied();
        return(
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: "column",
                        animation: false
                    },
                    title: {
                        text: 'Chart'
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
                                        let chart = this.series.chart;
                                        let bannerText = '';
                                        _.map(citiedList, (item) => {
                                            if(item.year === _.toString(this.options.name)){
                                                bannerText += `${item.title} has been the most citied article for the ${item.year}`
                                            }
                                        })
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
                                                text: bannerText
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