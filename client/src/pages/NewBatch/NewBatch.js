import React, {Component} from 'react';
import API from '../../utils/ajax';
import data from '../../utils/data';
import styles from './NewBatch.css';
import FlavorList from '../../components/FlavorList'

class NewBatch extends Component {
  state = {
    showFlavors: true,
    batchChosen: {},
    showDate: false,
    date: '',
    batchName: '',
    currentLots: []
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
  
  componentDidMount(){
    let d = new Date
    let month = d.getMonth()+2
    console.log(month, d)
    API.getAllLots().then((res) =>{
      this.setState({currentLots: res.data})
    })
    this.setState({date: this.formatDate(new Date)})
  }
  updateDate = (event) => {
    event.preventDefault()
    this.setState({date: event.target.value})
  }


  batchChosen = (e) => {
    let batchObject = JSON.parse(e.target.getAttribute('data-object'))
    for (let i in batchObject){
      for(let j in batchObject[i]){
        for(let k in this.state.currentLots){
          if (this.state.currentLots[k]['ingredient'] == j){
            batchObject[i][j] = this.state.currentLots[k]
          }
        }
      }
    }
    this.setState({batchChosen: batchObject, showDate: true, showFlavors: false, batchName : e.target.innerHTML})
  }

  submitBatch = () => {
    let newBatch = this.state.batchChosen
    newBatch.expDate = this.state.date
    newBatch.dateMade = this.formatDate(new Date)
    newBatch.flavor = this.state.batchName
    console.log(newBatch)
    API.newBatch(newBatch, 'batch').then((res)=>{console.log(res)})
  }

  processNoDate = () =>{
    let newBatch = this.state.batchChosen
    newBatch.expDate = ''
    newBatch.dateMade = this.formatDate(new Date)
    newBatch.flavor = this.state.batchName
    console.log(newBatch)
    API.newBatch(newBatch, 'noDate').then((res)=>{console.log(res)})
  }

  render() {
    return (
      <div id='new-batch'>
        {this.state.showFlavors ?
          <FlavorList batchChosen={this.batchChosen}/>
          : null }
          {this.state.showDate ?
            <div id='new-batch-inputs'>
              <input id="date-input" type="date" value={this.state.date} onChange={this.updateDate}/>
              <button type="submit" className="btn btn-dark" onClick={this.submitBatch}>Submit</button>
              <button type='submit' className='btn btn-dark no-date' onClick={this.processNoDate}>No Date</button>
            </div>
          : null}
      </div>
    )
  }
}

export default NewBatch;