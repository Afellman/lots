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
  componentWillMount() {
    API.getTenBatches(0).then((res)=>{
      console.log(res)
      let batches = res.data
      this.setState({batches: batches})
    })
  }

  componentDidMount() {
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

  showLots = (e) => {
    let element = JSON.parse(e.target.getAttribute('data-attr'));
    let lots = element.lots;
    if (this.state.showLots == true) {
      this.setState({showLots:false})
    } else {
      this.setState({showLots: true, lots: lots})
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row text-center'>
          <div className='col-12 col-md-6'>
            <button className='get-batches' onClick={this.getMore}>Get More</button>
            <div id='batches-buttons'>
              {this.state.batches.map((el)=>{
                return (
                  <button 
                  className='btn btn-primary' 
                  data-attr={JSON.stringify(el)}
                  style={{display: 'block', marginBottom: '10px'}}
                  onClick={this.showLots}>
                  {JSON.stringify(el.expDate)} {JSON.stringify(el.flavor)}
                  </button>
                )
              })} 
            </div>
          </div>
          <div className='col-12 col-md-6'>
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
            </div>
            : null}
            </div>
        </div>
      </div>
    )
  }
}

export default Batches;