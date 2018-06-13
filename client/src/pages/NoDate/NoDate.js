import React, { Component } from 'react';
import API from '../../utils/ajax';
import './NoDate.css'

class NoDate extends Component {

  state = {
    noDates: [],
    showDatePicker: false,
    date: '',
    batchChosen: {}
  }

  componentDidMount(){
    API.getNoDates().then((res)=>{
      this.setState({noDates: res.data})
    })
  }

  updateDate = (event) => {
    event.preventDefault()
    this.setState({date: event.target.value})
  }

  formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() +1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  
  submitBatch = ()=>{
    let newBatch = this.state.batchChosen;
    newBatch.expDate = this.state.date;
    // API.newBatch(newBatch, 'batch')
    API.deleteOne(newBatch.flavor, newBatch.dateMade, 'noDate')
      .then(()=>{
        this.setState({showDatePicker: false})
        API.getNoDates().then((res)=>{
          this.setState({noDates: res.data})
        })
      })
  }

  dateBatch = (batch) =>{
    console.log(batch)
    this.setState({showDatePicker: true, batchChosen: batch})
  }

  render() {
    return (
      <div class='container'>
        {this.state.showDatePicker ? 
        <div>
          <input id="date-input" type="date" value={this.state.date} onChange={this.updateDate}/>
          <button type="submit" className="btn btn-dark" onClick={this.submitBatch}>Submit</button>
        </div> 
        : <div>
        {this.state.noDates.map((batch, index)=>{
          return (
            <button className='btn btn-primary' onClick={()=>{this.dateBatch(batch)}}>
              {batch.dateMade}
              {batch.flavor}
            </button>
          )
        })}
      </div>
        }
      </div>
    );
  }
}

export default NoDate;
