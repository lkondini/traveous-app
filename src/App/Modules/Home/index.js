import React from 'react';
import Highcharts from '../Shared/highCharts';
import _ from 'lodash';
import Text from '../Shared/textfield';
import { Button } from '@material-ui/core';
import Date from '../Shared/date';
import Formsy from 'formsy-react';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';
require('../../Styles/main.scss')

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = { key: 0 }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(values) {
        fetch(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=>${values.search} ${values.start_date && `AND PUB_YEAR:[${values.start_date}+TO+${values.end_date}]`} sort_cited:y&resultType=core&format=json`)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                list : data.resultList.result,
                submitting: false
            })
        })
        // .catch()
    }
    
    onSubmit = (values) => {
        this.setState({
            submitting: true,
            key: 1
        })
        this.fetchData(values);
    }
    

    render(){
        return(
            <div className="root__container">
                <p className="title center padding_10">High Charts</p>
                <div className="flex space-around center padding_10" key={this.state.key}>
                    <Formsy
                        onSubmit={this.onSubmit}
                        >
                        <div className="form_children">
                            <Text type="text" placeholder="Enter your search term here" name="search" required />
                            <div className="flex center">
                                <div className="padding_10">
                                    <Date
                                        name="start_date"
                                        label={"Start date"}
                                        value={this.state.startDate}
                                    />
                                </div>
                                <div className="padding_10">
                                    <Date
                                        name="end_date"
                                        label={"End date"}
                                        value={this.state.endDate}
                                    />
                                </div>
                            </div>
                            
                        </div>
                        <div className='form__submit padding_10'>
                            <Button type="submit" variant="contained" size="large" color="primary" onClick={this.onClick}>Submit</Button>
                        </div>
                    </Formsy>
                </div>
                {
                        this.state.submitting &&
                        <div className='center padding_10'>
                            <Dots size={28} color={'blue'}/>
                        </div>
                        
                    }
                {
                    !_.isEmpty(this.state.list) &&
                    <Highcharts list={this.state.list}/>
                }
                    
            </div>
        )
    }
}

export default Home;