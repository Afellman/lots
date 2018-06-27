import React, {Component} from 'react';
import API from '../../utils/ajax';
import data from '../../utils/data';
import styles from './Batches.css';

class Batches extends Component {
  state = {
    batches: [],
    lots: {},
    showLots: false,
    skips: 10
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

  componentWillMount() {
    API.getTenBatches(0).then((res)=>{
      console.log(res)
      let batches = res.data
      this.setState({batches: batches})
    })
  }

  getMore = () => {
    API.getTenBatches(this.state.skips).then((res)=> {
      let batches = this.state.batches;
      res.data.forEach(el => {
        batches.push(el)
      })
      this.setState({batches: batches})
    })
    let skips = this.state.skips;
    this.setState({skips: skips += 10})
  }

  deleteBatch = (e) =>{
    let element = JSON.parse(e.target.parentNode.getAttribute('data-attr'));
    let id =  element['_id'];
    API.deleteOne(id, 'batch')
  }

  showLots = (e) => {
      if (this.state.showLots == true) {
        this.setState({showLots:false, lots : {}})
      } else {
    let element = JSON.parse(e.target.parentNode.getAttribute('data-attr'));
    let lots = element.lots;
      this.setState({showLots: true, lots: lots})
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row text-center'>
          <div className='col-12'>
            <button id='get-batches' className='btn btn-dark' onClick={this.getMore}>Get More</button>
            <div id='batches-buttons'>
              {this.state.batches.map((el, i)=>{
                return (
                  <div style={{display: 'block', marginBottom: '10px'}} data-attr={JSON.stringify(el)}>
                    <button 
                    className='btn btn-primary' 
                    onClick={this.showLots}>
                    {JSON.stringify(el.expDate).split('"')} {JSON.stringify(el.flavor).split('"')}
                    </button>
                    {el.dateMade == this.formatDate(new Date) ? 
                    <button className='btn btn-dark view-batch' onClick={this.deleteBatch}>Delete</button>
                    : null }
                  </div>
                )
              })} 
            </div>
          </div>
          <div className='col-12'>
            {this.state.showLots ? 
            <div id='lot-modal'>
              <table border='1'>
                  <tbody>
                  <tr>
                    <th>Ingredient</th>
                    <th>Company</th>
                    <th>Lot</th>
                  </tr>
                    {this.state.lots.map((el)=> {
                      return(
                        <tr>
                          <td>{el.ingredient}</td>
                          <td>{el.company}</td>
                          <td>{el.lot}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <button className='btn btn-dark' onClick={this.showLots}>Close</button>
            </div>
            : null}
            </div>
        </div>
      </div>
    )
  }
}

export default Batches;