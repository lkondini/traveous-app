import _ from 'lodash';
import React, {Component} from 'react';
import { TextField } from '@material-ui/core';
import { withFormsy } from 'formsy-react';

class Text extends Component {
    constructor(props){
        super(props);
        this.props.setValue(this.props.value);
    }

    changeValue = (e) => {
        const value = e.target.value;
        this.props.setValue(value);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.value !== nextProps.value){
            this.props.setValue(nextProps.value);
        }
    }

    render(){
        return(
            <div className={'textField__container'}>
                <TextField
                    {...this.props}
                    onChange={this.changeValue}
                    value={this.props.getValue()}
                />
            </div>
        ) 
    }
}


export { Text };
export default withFormsy(Text);
