import React, { Fragment, Component } from "react";
import { KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withFormsy } from 'formsy-react';
import moment from 'moment'
 
class DateSelecter extends Component {
    constructor(props){
      super(props);
      if (this.props.value) this.setValue(this.props.value);
    }
      
      handleDateChange = (date) => {
        this.setValue(date);
      }
  
      setValue = (value) => {
        this.props.setValue(this.mask(value))
      }
  
      mask = (date) => {
        return moment(date).format("YYYY")
      }
    
      render() {
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Fragment>  
            <div className="picker">
            <KeyboardDatePicker
                autoOk
                variant="inline"
                label={this.props.label}
                format="yyyy"
                value={this.props.getValue() || null}
                InputAdornmentProps={{ position: "start" }}
                onChange={this.handleDateChange}
            />
            </div>
          </Fragment>
          </MuiPickersUtilsProvider>
        );
      }
    }
  
    export default withFormsy(DateSelecter);